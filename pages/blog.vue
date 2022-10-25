<template>
  <div>
    <Header />
    <div>
      <h1>Blog</h1>

      <div class="blogPostWrapper">
        <h2>Random Image</h2>
        <p>
          Get a random free image from
          <a href="https://picsum.photos/">picsum.photos</a>
        </p>
        <br />
        <img :src="compImageLink" alt="some random Image" />
        <br />
        <button @click="getRandomImage">New Image</button>
        <!-- <button onClick="window.location.reload()">
      new Image {{ New Image }}
    </button> -->
      </div>
      <div class="blogPostWrapper">
        <h2>JSON Server</h2>
        <p>lets you test your REST Api super easy and fast</p>
        <br />
        <!-- <RestApi /> -->
        <MongoDb />
      </div>
      <div class="blogPostWrapper">
        <h2>Cool CSS loaders</h2>
        <CssLoaders />
      </div>
    </div>
    <div class="unauthorized">
      <p style="font-size: 24px">
        Whoops this content is only available to registered users
      </p>
      <br />
      <button @click="$router.push('/auth')">Signup (free)</button>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
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
    checkAuth() {
      return this.$store.getters["auth/getAuth"];
    },
    compImageLink() {
      return `https://picsum.photos/id/${this.randomNumber}/200/300`;
    },
  },

  created() {
    // this.checkAuth();
  },

  mounted() {},

  methods: {
    // checkAuth() {
    //   console.log("getters", this.$store.getters["auth/getAuth"]);
    //   if (this.$store.getters["auth/getAuth"]) {
    //     console.log("authorized:blog");
    //   } else this.$router.push("/");
    // },
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
h1,
p {
  text-align: center;
}
.unauthorized {
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.blogPostWrapper {
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