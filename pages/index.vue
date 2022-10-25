<template >
  <div class="background">
    <Header />
    <!-- <button @click="showMessageFromBackend">Show message from backend</button> -->
    <Quizz />
    <Footer />
  </div>
</template>

<script>
export default {
  methods: {
    async showMessageFromBackend() {
      try {
        const response = await this.$axios.get("/api/products");
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
@import "../styles/index.scss";
</style>
