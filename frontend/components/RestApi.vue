<template>
  <div>
    <div>
      <h3>GET Request</h3>
      <div class="lds-ellipsis" v-if="loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div v-else>
        <div>
          <strong>
            {{ $store.getters["counter/getCounter"] }} /
            {{ $store.state.counter.counter }} / {{ getCounter }} Products
          </strong>
          <li v-for="(product, index) in products" :key="index">
            {{ product.title }} in {{ product.unit }}
          </li>
        </div>
        <br />
        <div>
          <strong>Markets</strong>
          <li v-for="(market, index) in markets" :key="index">
            {{ market.name }} of Type:{{ market.type }}
          </li>
        </div>
        <div>
          <strong>Prices</strong>
          <li v-for="(price, index) in prices" :key="index">
            {{ price.price }} € for productType:{{ price.productId }} in
            marketType:{{ price.marketId }}
          </li>
        </div>
      </div>
    </div>
    <div>
      <h3>POST request</h3>
      <p>Add an item</p>

      <div>
        <p>Item</p>
        <button @click="increment({ value: 2 })"></button>
        <button
          v-for="(product, index) in products"
          :key="index"
          @click="selectProduct(product.id)"
          :class="currentProduct === product.id ? 'selected' : ''"
        >
          {{ product.title }}
        </button>
        <button
          v-if="!showCustomProductInput"
          @click="showCustomProductInput = true"
        >
          +
        </button>
        <div v-else>
          <input v-model="newProduct.title" type="text" placeholder="Apple" />
          <input v-model="newProduct.unit" type="text" placeholder="kg" />
          <button class="btn-small" @click="addProduct">Add</button>
        </div>
      </div>
      <div>
        <p>Shopped at</p>
        <button
          v-for="(market, index) in markets"
          :key="index"
          :value="market.id"
          @click="selectMarket(market.id)"
          :class="currentMarket === market.id ? 'selected' : ''"
        >
          {{ market.name }}
        </button>
        <button
          v-if="!showCustomMarketInput"
          @click="showCustomMarketInput = true"
        >
          +
        </button>
        <div v-else>
          <input v-model="newMarket.name" type="text" placeholder="Shop X" />
          <select v-model="newMarket.type">
            <option
              v-for="(type, index) in markettypes"
              :key="index"
              :value="type.id"
            >
              {{ type.title }}
            </option>
          </select>
          <button class="btn-small" @click="addMarket">Add</button>
        </div>
      </div>
      Price <input v-model="formData.price" type="number" />
      <span style="font-size: 32px">
        € / {{ currentProduct ? getProductUnitById(currentProduct) : "" }}
      </span>
      <pre>{{ formData }}</pre>
      <button @click="addPrice">Submit</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: true,
      posts: [],
      products: [],
      markets: [],
      markettypes: [],
      prices: [],
      showCustomProductInput: false,
      showCustomMarketInput: false,
      formData: {},
      newProduct: {},
      newMarket: {},
      currentProduct: null,
      currentMarket: null,
    };
  },
  computed: {
    ...mapGetters({
      getCounter: "counter/getCounter",
    }),

    checkFormData() {
      console.log("formData: ", this.formData);
      return (
        this.formData.productId &&
        this.formData.marketId &&
        this.formData.price !== undefined
      );
    },
  },
  mounted() {
    this.loadProducts();
    this.loadMarkets();
    this.loadPrices();
    this.loadMarkettypes();
  },
  methods: {
    ...mapMutations({
      increment: "counter/increment",
    }),
    //
    // increment() {
    //   this.$store.commit("increment", { value: 2 });
    // },
    loadProducts() {
      axios
        .get("http://localhost:3004/products")
        .then((response) => {
          console.log(response.data);
          this.products = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log("error loadProducts()", error);
          alert("Opps an error ocurred: GET request. Please Investigate");
        });
    },
    loadMarkets() {
      axios
        .get("http://localhost:3004/markets")
        .then((response) => {
          this.markets = response.data;
        })
        .catch((error) => {
          console.log(error);
          alert("Error in loadMarkets()");
        });
    },
    loadMarkettypes() {
      axios
        .get("http://localhost:3004/markettypes")
        .then((response) => {
          this.markettypes = response.data;
        })
        .catch((error) => {
          console.log(error);
          alert("Error in loadMarkettypes()");
        });
    },
    loadPrices() {
      axios
        .get("http://localhost:3004/prices")
        .then((response) => {
          this.prices = response.data;
        })
        .catch((error) => {
          console.log(error);
          alert("Error in loadPrices()");
        });
    },

    selectProduct(id) {
      console.log("currentproduct selected:", id);
      this.formData.productId = id;
      this.currentProduct = id;
      this.increment({ value: 5 });
      console.log(this.formData);
    },
    selectMarket(id) {
      this.formData.marketId = id;
      this.currentMarket = id;
    },

    addPrice() {
      // buggy here fix it!!
      console.log("chekFormData", this.checkFormData);
      if (
        this.formData.productId !== undefined &&
        this.formData.marketId !== undefined &&
        this.formData.price !== undefined
      ) {
        axios({
          method: "post",
          url: "http://localhost:3004/prices",
          data: this.formData,
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log("error in addPrice()", error);
            alert("error in addPrice()");
          });
      } else console.log("Form invalid");
    },
    addProduct() {
      axios({
        method: "post",
        url: "http://localhost:3004/products",
        data: this.newProduct,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("error in addProduct()", error);
          alert("error in addProduct()");
        })
        .finally(() => {
          console.log("loadProducts!");
          this.loadProducts();
        });
    },
    addMarket() {
      axios({
        method: "post",
        url: "http://localhost:3004/markets",
        data: this.newMarket,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("error in addMarket()", error);
          alert("error in addMarket()");
        })
        .finally(() => {
          console.log("loadMarkets!");
          this.loadMarkets();
        });
    },

    getProductUnitById(id) {
      const product = this.products.find((el) => el.id === id);
      return product.unit;
    },

    // getMarketTypeById(id) {
    //   axios
    //     .get("http://localhost:3004/markettypes/"+id)
    //     .then((response) => {
    //       console.log(response);
    //       return response.data.title;
    //     })
    //     .catch((error) => {
    //       console.log("error in getMarketTypeById()", error);
    //       alert("error in getMarketTypeById()");
    //     });
    // },
  },
};
</script>
<style>
</style>