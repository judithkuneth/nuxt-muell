<template>
  <div>
    <div class="containerWrapper">
      <div>
        <h2 style="margin-bottom: 8px">Recycle me</h2>
        <h1 style="margin-top: 4px">{{ currentProduct.name }}</h1>
      </div>
      <div>
        <img
          v-if="currentProduct.image"
          :src="getCurrentImageUrl"
          alt=""
          class="imageItem"
        />
        <p v-else class="noImage">{{ imageNotAvailable() }}</p>
      </div>
      <p v-if="!gameOver">
        Score: <span class="h1 correct">{{ score }}</span>
      </p>
      <h2 v-if="gameOver" class="wrong">Game Over. Try again!</h2>
      <div class="buttonWrapper">
        <button
          v-for="(button, index) in buttons"
          :key="index"
          :class="button.style"
          @click="submitResponse(button.response)"
        >
          {{ button.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as products from "../static/products2.json";

export default {
  data() {
    return {
      products,
      currentProductId: 1,
      score: 0,
      gameOver: false,
      buttons: [
        {
          label: "Restmüll",
          style: "rest",
          response: "Restmüll",
        },
        {
          label: "Metall",
          style: "metall",
          response: "Metall",
        },

        {
          label: "Glas",
          style: "glass",
          response: "Altglas",
        },
        {
          label: "Bio",
          style: "bio",
          response: "Bioabfall",
        },
        {
          label: "Kunststoff",
          style: "plastic",
          response: "Kunststoff",
        },

        {
          label: "Papier",
          style: "paper",
          response: "Papier",
        },

        {
          label: "Problemstoff",
          style: "problem",
          response: "Problemstoffsammlung",
        },
        {
          label: "Anderes",
          style: "other",
          response: "Sperrmüll/Anderes",
        },
      ],
      categories: {
        bio: "Bio",
        plastic: "Kunststoff",
        metall: "Metall",
        glas: "Glas",
        paper: "Papier",
        rest: "Restmüll",
        problem: "Problemstoff",
        other: "Anderes",
      },
      imageNotAvailable: () => {
        return "Sorry, davon gibt es noch kein Bild";
      },
    };
  },
  computed: {
    currentProduct() {
      return this.products.default.find(
        (item) => item.id === this.currentProductId
      );
    },
    getCurrentImageUrl() {
      return require(`../static/images/${this.currentProduct.image}.svg`);
    },
  },
  created() {
    // ASYNC AXIOS here
  },
  mounted() {
    // after DOM
  },
  methods: {
    submitResponse(value) {
      if (
        this.products.default.find((item) => item.id === this.currentProductId)
          .recycle === value
      ) {
        this.score++;
        this.nextQuestion();
        this.gameOver = false;
      } else {
        this.score = 0;
        this.gameOver = true;
      }
    },
    nextQuestion() {
      if (this.currentProductId < 147) {
        this.currentProductId++;
      } else {
        this.currentProductId = 1;
      }
    },
  },
};
</script>

<style>
.containerWrapper {
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  border-radius: 20px;
  border: 1px solid gray;
  background-color: #fcfcfa;
  max-width: 700px;
}

.imageItem {
  height: 300px;
}
.noImage {
  margin: 0px 0px;
  font-size: 14px;
  color: #d7d8d8;
}

.buttonWrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 200px;
  width: 100%;
}

@media (max-width: 900px) {
  .buttonWrapper {
    margin: 20px 6px;
  }
  button {
    width: 30%;
  }
  .imageItem {
    height: 200px;
  }
}
</style>
