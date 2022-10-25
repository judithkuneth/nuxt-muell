import axios from "axios";
export const state = () => ({
  markets: [],
  marketTypes: [],
  currentMarket: { marketId: "" },
});

export const getters = {
  getMarkets(state) {
    return state.markets;
  },
  getMarketTypes(state) {
    return state.marketTypes;
  },

  getCurrentMarket(state) {
    return state.currentMarket;
  },
  getCurrentPrice(state) {
    return state.currentPrice;
  },
};

// access mutations with $store.dispatch('increment')
export const mutations = {
  updateMarkets(state, payload) {
    if (payload) {
      console.log("mutate updateMarkets", payload);
      state.markets = payload;
    } else {
      console.log("no payload in mutation: updateMarkets");
    }
  },
  updateCurrentMarket(state, payload) {
    if (payload) {
      console.log("mutate updateCurrentMarket", payload);
      state.currentMarket = payload;
    } else {
      console.log("no payload in mutation: updateCurrentMarket");
    }
  },
  updateMarketTypes(state, payload) {
    if (payload) {
      console.log("mutate updateMarketTypes", payload);
      state.marketTypes = payload;
    } else {
      console.log("no payload in mutation: updateMarketTypes");
    }
  },
};

// actions = asyncronous mutations, but cannot change state directly - use a mutation for it instead. access it with $store.dispatch('login')

export const actions = {
  // Markets
  getMarketsFromMongoDb({ commit }) {
    axios
      .get("http://localhost:3002/markets")
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
      .post("http://localhost:3002/market", market)
      .then((res) => {
        console.log("added Market ToMongoDb", res);
        context.dispatch("getMarketsFromMongoDb");
        const data = { marketId: res.data._id };
        context.commit("updateCurrentMarket", data);
      })
      .catch((err) => {
        console.log("error in addMarketToMongoDb", err);
      });
  },
  updateMarketFromMongoDb(context, payload) {
    axios
      .patch(`http://localhost:3002/market/${payload.id}`, payload.data)
      .then((res) => {
        console.log("added Market ToMongoDb", res);
        context.dispatch("getMarketsFromMongoDb");
        const data = { marketId: res.data._id };
        context.commit("updateCurrentMarket", data);
      })
      .catch((err) => {
        console.log("error in updateMarketFromMongoDb", err);
        context.dispatch("getMarketsFromMongoDb");
      });
  },
  deleteMarketFromMongoDb(context, id) {
    axios
      .delete(`http://localhost:3002/market/${id}`)
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
      .get("http://localhost:3002/marketTypes")
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
      .post("http://localhost:3002/marketType", marketType)
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
      .patch(`http://localhost:3002/marketType/${payload.id}`, payload.data)
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
      .delete(`http://localhost:3002/marketType/${id}`)
      .then((res) => {
        console.log("deleted MarketType ToMongoDb", res);
        context.dispatch("getMarketTypesFromMongoDb");
      })
      .catch((err) => {
        console.log("error in delteMarketTypeFromMongoDb", err);
      });
  },
};
