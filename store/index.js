export const state = () => ({
  // counter: 0,
  // auth: false,
});

export const getters = {
  getUserAuth(state, getters, rootState, rootGetters) {
    console.log(rootState);
    console.log(rootGetters["auth/getAuth"]);
    return rootState.auth.auth;
  },
  // getCounter(state) {
  //   return state.counter;
  // },
  // getAuth(state) {
  //   return state.auth;
  // },
};

// access mutations with $store.dispatch('increment')
export const mutations = {
  // increment(state, payload) {
  //   if (payload) {
  //     state.counter = state.counter + payload.value;
  //   } else {
  //     state.counter++;
  //   }
  // },
  // setAuth(state, payload) {
  //   state.auth = payload.value;
  // },
};

// actions = asyncronous mutations, but cannot change state directly - use a mutation for it instead. access it with $store.dispatch('login')

export const actions = {
  // login(context) {
  //   setTimeout(() => {
  //     context.commit(
  //       "setAuth",
  //       { value: true },
  //       context.dispatch("printUserInfo", { username: "Judith" }),
  //       500
  //     );
  //   });
  // },
  // logout({ commit, dispatch }) {
  //   setTimeout(() => {
  //     commit(
  //       "setAuth",
  //       { value: false },
  //       dispatch("printUserInfo", { username: "Judith" }),
  //       500
  //     );
  //   });
  // },
  // use action within an action:
  // printUserInfo(context, payload) {
  //   console.log(context.getters.getAuth);
  // },
  //   async fetchCounter({ state }) {
  //     // make request
  //     const res = { data: 10 };
  //     state.counter = res.data;
  //     return res.data;
  //   },
};
