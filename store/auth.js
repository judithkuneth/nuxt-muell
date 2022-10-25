import axios from "axios";
const apiKey = "AIzaSyCohbB2WKrJAtyroLQIfr4Q_GWCA1iLpd4";
const defaultUser = {
  email: "",
  idToken: "",
  refreshToken: "",
};
export const state = () => ({
  user: {
    email: "",
    idToken: "",
    refreshToken: "",
  },
});

export const getters = {
  getAuth(state) {
    // return state.auth;
    return state.user.refreshToken;
  },
};

// access mutations with $store.dispatch('increment')
export const mutations = {
  setAuth(state, payload) {
    state.auth = payload.value;
  },
  setUser(state, payload) {
    state.user = payload;
  },
};

// actions = asyncronous mutations, but cannot change state directly - use a mutation for it instead. access it with $store.dispatch('login')

export const actions = {
  setToken(context, payload) {
    localStorage.setItem("email", payload.email);
    localStorage.setItem("idToken", payload.idToken);
    localStorage.setItem("refreshToken", payload.refreshToken);
  },
  removeToken() {
    localStorage.removeItem("email");
    localStorage.removeItem("idToken");
    localStorage.removeItem("refreshToken");
  },
  signup(context, payload) {
    console.log(payload);
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,

        {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        console.log(response);
        const user = {
          email: response.data.email,
          idToken: response.data.idToken,
          refreshToken: response.data.refreshToken,
        };
        context.commit("setAuth", { value: true });
        context.commit("setUser", user);
        context.dispatch("setToken", user);
      })
      .catch((error) => console.log(error));
  },
  signin(context, payload) {
    console.log(payload);
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,

        {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        console.log(response);
        const user = {
          email: response.data.email,
          idToken: response.data.idToken,
          refreshToken: response.data.refreshToken,
        };
        context.commit("setAuth", { value: true });
        context.commit("setUser", user);
        context.dispatch("setToken", user);
        this.$router.push({ path: "/" });
      })
      .catch((error) => console.log(error));
  },

  async autoLogin(context) {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("refreshToken", refreshToken);
    try {
      if (refreshToken) {
        const token = await axios.post(
          `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
          { grant_type: "refresh_token", refresh_token: refreshToken }
        );
        console.log(token.data);
        const user = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
          { idToken: token.data.id_token }
        );
        console.log("user", user);

        const newTokens = {
          email: user.data.users[0].email,
          idToken: token.data.id_token,
          refreshToken: token.data.refresh_token,
        };
        context.dispatch("setToken", newTokens);
        context.commit("setUser", newTokens);
        context.commit("setAuth", { value: true });
        this.$router.push({ path: "/" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  logout({ commit, dispatch }) {
    commit("setAuth", { value: false });
    commit("setUser", defaultUser);
    dispatch("removeToken");
  },

  // use action within an action:
  printUserInfo(context, payload) {
    console.log(context.getters.getAuth);
  },
  //   async fetchCounter({ state }) {
  //     // make request
  //     const res = { data: 10 };
  //     state.counter = res.data;
  //     return res.data;
  //   },
};
