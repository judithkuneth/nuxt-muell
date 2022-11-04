import axios from "axios";
const baseUrl = "https://myfoodbasket-be.herokuapp.com/";
// http://localhost:3002
export const state = () => ({
  currentProduct: { productId: "", title: "", unit: "" },
  currentPrice: { price: null, productId: "", marketId: "" },
  products: [],
  markets: [],
  marketTypes: [],
  prices: [],
});

export const getters = {
  getProducts(state) {
    console.log("state.products", state.products);
    console.log("PORT", process.env.PORT);
    console.log("CORS_ORIGIN", process.env.CORS_ORIGIN);
    return state.products;
  },
  getCurrentProduct(state) {
    return state.currentProduct;
  },
  getMarkets(state) {
    console.log("state.markets", state.markets);
    return state.markets;
  },
  getMarketTypes(state) {
    console.log("state.marketTypes", state.marketTypes);
    return state.marketTypes;
  },
  getPrices(state) {
    console.log("state.prices", state.prices);
    return state.prices;
  },
  getCurrentPrice(state) {
    return state.currentPrice;
  },
};

// access mutations with $store.dispatch('increment')
export const mutations = {
  updateCurrentProduct(state, payload) {
    if (payload) {
      console.log("mutate updateCurrentProduct", payload);
      state.currentProduct = payload;
    } else {
      console.log("no payload in mutation: updateCurrentProduct");
    }
  },
  updateProducts(state, payload) {
    if (payload) {
      console.log("payload", payload);
      state.products = payload;
    } else {
      console.log("no payload in mutation: updateProducts");
    }
  },

  updateMarkets(state, payload) {
    if (payload) {
      console.log("payload", payload);
      state.markets = payload;
    } else {
      console.log("no payload in mutation: updateMarkets");
    }
  },
  updateMarketTypes(state, payload) {
    if (payload) {
      console.log("payload", payload);
      state.marketTypes = payload;
    } else {
      console.log("no payload in mutation: updateMarketTypes");
    }
  },
  updatePrices(state, payload) {
    if (payload) {
      console.log("payload", payload);
      state.prices = payload;
    } else {
      console.log("no payload in mutation: updatePrices");
    }
  },
  updateCurrentPrice(state, payload) {
    if (payload) {
      console.log("mutate updateCurrentPrice", payload);
      state.currentPrice = payload;
    } else {
      console.log("no payload in mutation: updateCurrentPrice");
    }
  },
};

// actions = asyncronous mutations, but cannot change state directly - use a mutation for it instead. access it with $store.dispatch('login')

export const actions = {
  // Products
  getProductsFromMongoDb({ commit }) {
    axios
      .get(`${baseUrl}/products`)
      .then((res) => {
        console.log(res);
        commit("updateProducts", res.data);
      })
      .catch((err) => {
        console.log("error in getProductsFromMongoDb", err);
      });
  },
  addProductToMongoDb(context, product) {
    axios
      .post(`${baseUrl}/product`, product)
      .then((res) => {
        console.log("added Product ToMongoDb", res);
        context.dispatch("getProductsFromMongoDb");
        const data = { productId: res.data._id };
        context.commit("updateCurrentProduct", data);
      })
      .catch((err) => {
        console.log("error in addProductToMongoDb", err);
      });
  },
  updateProductFromMongoDb(context, payload) {
    axios
      .patch(`${baseUrl}/product/${payload.id}`, payload.data)
      .then((res) => {
        console.log("added Product ToMongoDb", res);
        context.dispatch("getProductsFromMongoDb");
        const data = { productId: res.data._id };
        context.commit("updateCurrentProduct", data);
      })
      .catch((err) => {
        console.log("error in updateProductFromMongoDb", err);
        context.dispatch("getProductsFromMongoDb");
      });
  },
  deleteProductFromMongoDb(context, id) {
    axios
      .delete(`${baseUrl}/product/${id}`)
      .then((res) => {
        console.log("deleted Product ToMongoDb", res);
        context.dispatch("getProductsFromMongoDb");
      })
      .catch((err) => {
        console.log("error in delteProductFromMongoDb", err);
      });
  },

  // Prices
  getPricesFromMongoDb({ commit }) {
    axios
      .get(`${baseUrl}/prices`)
      .then((res) => {
        console.log(res);
        commit("updatePrices", res.data);
      })
      .catch((err) => {
        console.log("error in getPricesFromMongoDb", err);
      });
  },
  addPriceToMongoDb(context, price) {
    axios
      .post(`${baseUrl}/price`, price)
      .then((res) => {
        console.log("added Price ToMongoDb", res);
        context.dispatch("getPricesFromMongoDb");
        context.commit("updateCurrentPrice", res.data);
      })
      .catch((err) => {
        console.log("error in addPriceToMongoDb", err);
      });
  },
  updatePriceFromMongoDb(context, payload) {
    axios
      .patch(`${baseUrl}/price/${payload.id}`, payload.data)
      .then((res) => {
        console.log("added Price ToMongoDb", res);
        context.dispatch("getPricesFromMongoDb");
        context.commit("updateCurrentPrice", res.data);
      })
      .catch((err) => {
        console.log("error in updatePriceFromMongoDb", err);
        context.dispatch("getPricesFromMongoDb");
      });
  },
  deletePriceFromMongoDb(context, id) {
    axios
      .delete(`${baseUrl}/price/${id}`)
      .then((res) => {
        console.log("deleted Price ToMongoDb", res);
        context.dispatch("getPricesFromMongoDb");
      })
      .catch((err) => {
        console.log("error in deltePriceFromMongoDb", err);
      });
  },

  // Markets
  getMarketsFromMongoDb({ commit }) {
    axios
      .get(`${baseUrl}/markets`)
      .then((res) => {
        console.log(res);
        commit("updateMarkets", res.data);
      })
      .catch((err) => {
        console.log("error in getMarketsFromMongoDb", err);
      });
  },
  addMarketToMongoDb(context, market) {
    axios
      .post(`${baseUrl}/market`, market)
      .then((res) => {
        console.log("added Market ToMongoDb", res);
        context.dispatch("getMarketsFromMongoDb");
      })
      .catch((err) => {
        console.log("error in addMarketToMongoDb", err);
      });
  },
  updateMarketFromMongoDb(context, payload) {
    axios
      .patch(`${baseUrl}/market/${payload.id}`, payload.data)
      .then((res) => {
        console.log("added Market ToMongoDb", res);
        context.dispatch("getMarketsFromMongoDb");
      })
      .catch((err) => {
        console.log("error in updateMarketFromMongoDb", err);
        context.dispatch("getMarketsFromMongoDb");
      });
  },
  deleteMarketFromMongoDb(context, id) {
    axios
      .delete(`${baseUrl}/market/${id}`)
      .then((res) => {
        console.log("deleted Market ToMongoDb", res);
        context.dispatch("getMarketsFromMongoDb");
      })
      .catch((err) => {
        console.log("error in delteMarketFromMongoDb", err);
      });
  },

  // MarketTypes
  getMarketTypesFromMongoDb({ commit }) {
    axios
      .get(`${baseUrl}/marketTypes`)
      .then((res) => {
        console.log(res);
        commit("updateMarketTypes", res.data);
      })
      .catch((err) => {
        console.log("error in getMarketTypesFromMongoDb", err);
      });
  },
  addMarketTypeToMongoDb(context, marketType) {
    axios
      .post(`${baseUrl}/marketType`, marketType)
      .then((res) => {
        console.log("added MarketType ToMongoDb", res);
        context.dispatch("getMarketTypesFromMongoDb");
      })
      .catch((err) => {
        console.log("error in addMarketTypeToMongoDb", err);
      });
  },
  updateMarketTypeFromMongoDb(context, payload) {
    axios
      .patch(`${baseUrl}/marketType/${payload.id}`, payload.data)
      .then((res) => {
        console.log("added MarketType ToMongoDb", res);
        context.dispatch("getMarketTypesFromMongoDb");
      })
      .catch((err) => {
        console.log("error in updateMarketTypeFromMongoDb", err);
        context.dispatch("getMarketTypesFromMongoDb");
      });
  },
  deleteMarketTypeFromMongoDb(context, id) {
    axios
      .delete(`${baseUrl}/marketType/${id}`)
      .then((res) => {
        console.log("deleted MarketType ToMongoDb", res);
        context.dispatch("getMarketTypesFromMongoDb");
      })
      .catch((err) => {
        console.log("error in delteMarketTypeFromMongoDb", err);
      });
  },
  // getDataFromMongoDb() {
  //   axios({
  //     method: "post",
  //     url: "https://data.mongodb-api.com/app/data-ssvax/endpoint/data/v1",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Request-Headers": "*",
  //       "api-key": process.env.API_KEY,
  //       Accept: "application/json",
  //     },
  //     data: {
  //       dataSource: "mongoless",
  //       database: "productData",
  //       collection: "products",
  //     },
  //   }).then((res) => {
  //     this.data = res.data;
  //   });
  // },
};
