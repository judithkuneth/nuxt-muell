<template>
  <div>
    <Header />
    <div class="formContainer">
      <form
        class="formStyles"
        @submit.prevent="showLogin ? signin(user) : signup(user)"
      >
        <h1>{{ showLogin ? "Login" : "Signup" }}</h1>
        <input v-model="user.email" type="email" name="" placeholder="email" />
        <input v-model="user.password" type="password" placeholder="password" />
        <button type="submit">{{ showLogin ? "Login" : "Singup" }}</button>
        <a href="#" @click="switchForm()">
          {{ showLogin ? "Create new account" : "I already have an account" }}
        </a>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      user: {},
      showLogin: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["getAuth"]),
  },
  methods: {
    ...mapActions("auth", ["signup", "signin"]),
    switchForm() {
      console.log("switch Form:", this.showLogin);
      return (this.showLogin = !this.showLogin);
    },
  },
};
</script>

<style>
@import "../styles/index.scss";
.formContainer {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.formStyles {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 350px;
  border-radius: 20px;
}
</style>