<template>
  <div class="headerStyles">
    <nuxt-link to="/">Home</nuxt-link>
    <nav class="navStyles">
      <nuxt-link to="/blog">Blog</nuxt-link>
      <nuxt-link v-if="!getAuth" to="/auth">Signup/Login</nuxt-link>
      <button v-else @click="logout()">Logout</button>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  // data() {
  //   return {};
  // },
  computed: {
    ...mapGetters({
      getAuth: "auth/getAuth",
      getUserAuth: "getUserAuth",
    }),
    // getAuth() {
    //   return this.$store.getters.["auth/getAuth"]
    // },
  },
  methods: {
    ...mapActions("auth", ["login", "logout"]),

    // ...mapActions({
    //   login: "auth/login",
    //   logout: "auth/logout",
    // }),
    // login() {
    //   this.$store.dispatch("login");
    // },
    // logout() {
    //   this.$store.dispatch("logout");
    // },
  },
};
</script>

<style>
.headerStyles {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 20px;
}
.navStyles {
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
@media (max-width: 900px) {
  .headerStyles {
    height: 5px;
  }
}
</style>
