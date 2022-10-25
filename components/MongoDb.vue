<template>
  <div>
    <h2>Product</h2>
    <div
      :class="editProducts ? 'productContainerEdit' : 'productContainerView'"
    >
      <button class="btn-small" @click="editProducts = !editProducts">
        {{ editProducts ? "done" : "edit" }}
      </button>
      <div
        v-for="(item, index) in getProducts"
        :key="index"
        class="productItem"
      >
        <div v-if="editingProductId !== item._id">
          <button
            :class="getCurrentProduct.productId === item._id ? 'selected' : ''"
            @click="selectProduct(item._id)"
          >
            {{ item.title }} ({{ item.unit }})
          </button>
        </div>
        <div v-if="editProducts">
          <input
            v-if="editingProductId === item._id"
            v-model="productData.title"
            type="text"
            :placeholder="item.title ? item.title : 'z.B: Haferflocken'"
          />
          <input
            v-if="editingProductId === item._id"
            v-model="productData.unit"
            type="text"
            :placeholder="item.unit ? item.unit : 'z.B: kg'"
          />

          <button
            v-if="editingProductId !== item._id"
            class="btn-small"
            @click="editProduct(item._id, item.title, item.unit)"
          >
            edit
          </button>
          <button v-else class="btn-small" @click="updateProduct(item._id)">
            Save
          </button>
          <button class="btn-small" @click="deleteProductFromMongoDb(item._id)">
            X
          </button>
        </div>
      </div>

      <div>
        <input
          v-if="addProductItem === true"
          v-model="productData.title"
          type="text"
          placeholder="z.B: Haferflocken"
        />
        <input
          v-if="addProductItem === true"
          v-model="productData.unit"
          type="text"
          placeholder="z.B: kg"
        />
        <button @click="addProductItem ? addProduct() : enableAddProductForm()">
          Add product
        </button>
        <button
          v-if="addProductItem"
          class="btn-small"
          @click="addProductItem = !addProductItem"
        >
          Done
        </button>
      </div>
    </div>
    <h2>Market</h2>
    <div>
      <div :class="editMarkets ? 'marketContainerEdit' : 'marketContainerView'">
        <button class="btn-small" @click="editMarkets = !editMarkets">
          {{ editMarkets ? "done" : "edit" }}
        </button>
        <div
          v-for="(market, index) in getMarkets"
          :key="index"
          class="marketItem"
        >
          <div v-if="editingMarketId !== market._id">
            <button
              v-if="editingPriceByMarketId !== market._id"
              :class="
                getCurrentMarket.marketId === market._id ? 'selected' : ''
              "
              @click="selectMarket(market._id)"
            >
              {{ market.title }} -
              {{
                getPriceByProductAndMarket(market._id)
                  ? getPriceByProductAndMarket(market._id)
                  : "__"
              }}
              €
            </button>
            <div v-else class="tagInput">
              <label for="priceInputField">{{ market.title }}</label>
              <input
                id="priceInputField"
                class="input-small"
                v-model="priceInput"
                type="number"
                placeholder="1"
              />
              €
            </div>
          </div>
          <div v-if="editMarkets">
            <input
              v-if="editingMarketId === market._id"
              v-model="marketData.title"
              type="text"
              :placeholder="market.title ? market.title : 'z.B: Susi'"
            />
            <label v-if="editingMarketId === market._id" for="marketTypes">
              Typ:
            </label>
            <select
              v-if="editingMarketId === market._id"
              id="marketTypes"
              v-model="marketData.marketType"
              name="Typ"
              placeholder="z.B: Unverpacktladen"
            >
              <option
                v-for="(marketType, index) in marketTypes"
                :key="index"
                :value="marketType.type"
              >
                {{ marketType.title }}
              </option>
            </select>

            <button
              v-if="editingMarketId !== market._id"
              class="btn-small"
              @click="editMarket(market._id, market.title, market.marketType)"
            >
              edit
            </button>
            <button v-else class="btn-small" @click="updateMarket(market._id)">
              Save
            </button>
            <button
              class="btn-small"
              @click="deleteMarketFromMongoDb(market._id)"
            >
              X
            </button>
          </div>
        </div>

        <div>
          <input
            v-if="addMarketItem === true"
            v-model="marketData.title"
            type="text"
            placeholder="z.B: Hofer"
          />
          <label v-if="addMarketItem === true" for="marketTypes">Typ:</label>
          <select
            v-if="addMarketItem === true"
            id="marketTypes"
            v-model="marketData.marketType"
            name="Typ"
            placeholder="z.B: Unverpacktladen"
          >
            <option
              v-for="(marketType, index) in marketTypes"
              :key="index"
              :value="marketType.type"
            >
              {{ marketType.title }}
            </option>
          </select>
          <button @click="addMarketItem ? addMarket() : enableAddMarketForm()">
            Add market
          </button>
          <button
            v-if="addMarketItem"
            class="btn-small"
            @click="addMarketItem = !addMarketItem"
          >
            Done
          </button>
        </div>
      </div>
    </div>
    <div v-if="editingPriceByMarketId">
      <button @click="addPrice">Save price</button>
      <!-- <h2>Add Price</h2>
      <div>
        <input v-model="priceInput" type="number" placeholder="z.B: 3,50" />
        €
      </div> -->
    </div>
  </div>
</template>



<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      // produktData
      productData: {},
      editProducts: false,
      editingProductId: null,
      editingPriceByMarketId: null,
      addProductItem: false,

      // marketData
      marketData: {},
      // marketTypes: [],
      editMarkets: false,
      editingMarketId: null,
      addMarketItem: false,

      priceInput: null,
      // priceData: { productId: "", marketId: "", price: null },
      // editPrices: false,
      // editingPriceId: null,
      // addPriceItem: false,
    };
  },
  computed: {
    ...mapGetters("products", [
      "getProducts",
      "getCurrentProduct",
      "getCurrentPrice",
      "getPrices",
    ]),
    ...mapGetters("markets", [
      "getMarkets",
      "getMarketTypes",
      "getCurrentMarket",
    ]),
    marketTypes() {
      return this.getMarketTypes;
      // return this.getMarketTypes.map((item) => item.title);
    },
    priceData() {
      return {
        productId: this.getCurrentProduct.productId,
        marketId: this.getCurrentMarket.marketId,
        price: this.priceInput,
      };
    },
  },
  mounted() {
    this.getProductsFromMongoDb();
    this.getMarketsFromMongoDb();
    this.getMarketTypesFromMongoDb();
    this.getPricesFromMongoDb();
  },
  methods: {
    ...mapActions("products", [
      "getProductsFromMongoDb",
      "getPricesFromMongoDb",
      "addProductToMongoDb",
      "deleteProductFromMongoDb",
      "updateProductFromMongoDb",
      "addPriceToMongoDb",
    ]),
    ...mapActions("markets", [
      "getMarketsFromMongoDb",
      "getMarketTypesFromMongoDb",
      "addMarketToMongoDb",
      "deleteMarketFromMongoDb",
      "updateMarketFromMongoDb",
    ]),
    ...mapMutations("products", ["updateCurrentProduct", "updateCurrentPrice"]),
    ...mapMutations("markets", ["updateCurrentMarket"]),

    getPriceByProductAndMarket(marketId) {
      console.log("gett Prices!!!", this.getPrices);
      if (marketId && this.getCurrentProduct?.productId) {
        const price = this.getPrices.find(
          (el) =>
            el.productId === this.getCurrentProduct.productId &&
            el.marketId === marketId
        );
        if (price) return price.price;
        else return false;
      } else return false;
    },

    selectProduct(productId) {
      this.updateCurrentProduct({ productId });
    },

    editProduct(productId, title, unit) {
      this.editingProductId = productId;
      this.productData.title = title;
      this.productData.unit = unit;
    },
    updateProduct(id) {
      this.updateProductFromMongoDb({ id, data: this.productData });
      this.productData = {};
      this.editingProductId = null;
    },

    enableAddProductForm() {
      this.addProductItem = !this.addProductItem;
    },

    addProduct() {
      this.addProductToMongoDb(this.productData);
      this.productData = {};
      // this.priceData.productId = this.getCurrentProduct._id;
    },
    selectMarket(marketId) {
      this.updateCurrentMarket({ marketId });
      this.getPriceByProductAndMarket(marketId)
        ? (this.editingPriceByMarketId = null)
        : (this.editingPriceByMarketId = marketId);
    },
    editMarket(marketId, title, type) {
      this.editingMarketId = marketId;
      this.marketData.title = title;
      this.marketData.marketType = type;
    },
    updateMarket(id) {
      this.updateMarketFromMongoDb({ id, data: this.marketData });
      this.marketData = {};
      this.editingMarketId = null;
    },
    enableAddMarketForm() {
      this.addMarketItem = !this.addMarketItem;
    },
    addMarket(marketId) {
      console.log("adding market");
      this.addMarketToMongoDb(this.marketData);
      this.marketData = {};
      // this.priceData.marketId = marketId;
    },
    selectPrice(priceId) {
      this.updateCurrentPrice({ priceId });
    },
    addPrice() {
      this.addPriceToMongoDb(this.priceData);
      this.priceInput = null;
    },
  },
};
</script>

<style>
.productContainerEdit,
.marketContainerEdit {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.productContainerView,
.marketContainerView {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.productItem,
.marketItem {
  display: flex;
  flex-direction: row;
}
</style>