<template>
  <div>
    <Header />
    <div class="blogWrapper">
      <h1>Blog</h1>
      <p>some notes and fun facts</p>
      <h2>Random Image</h2>
      <p>
        because you should never use images without the owners rights.
        <a href="https://picsum.photos/">picsum.photos</a> gives you a random
        free image!
      </p>
      <img :src="compImageLink" alt="some random Image" />
      <br />
      <button @click="getRandomImage">New Image</button>
      <!-- <button onClick="window.location.reload()">
      new Image {{ New Image }}
    </button> -->
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        1026, 1027, 1028, 1029, 103, 1031, 1032, 1033, 1035, 1036, 1037, 1038,
        104, 1040, 1041, 1042,
      ],
      randomNumber: 1026,
      // Function
      // imageLink: () => {
      //   return `https://picsum.photos/id/${this.randomNumber}/200/300`;
      // },
    };
  },
  computed: {
    compImageLink() {
      return `https://picsum.photos/id/${this.randomNumber}/200/300`;
    },
  },
  methods: {
    getRandomImage() {
      const number =
        this.images[Math.floor(Math.random() * this.images.length)];
      return (this.randomNumber = number);
    },
  },
};
</script>
<style>
@import "../styles/index.scss";
.blogWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 50px auto;
  border-radius: 20px;
  border: 1px solid gray;
  background-color: #fcfcfa;
  max-width: 700px;
}
</style>