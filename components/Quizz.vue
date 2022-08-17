<template>
  <div>
    <div class="containerWrapper">
      <div>
        <h2>Recycle me!</h2>
        <h1 class="main">{{ currentProduct.name }}</h1>
      </div>
      <div>
        <img
          v-if="currentProduct.image"
          :src="getCurrentImageUrl"
          alt=""
          class="imageItem"
        />
        <p v-else class="noImage">Sorry, davon gibt es noch kein Bild</p>
      </div>
      <p v-if="!gameOver">
        Score: <span class="h1 correct">{{ score }}</span>
      </p>
      <h2 v-if="gameOver" class="wrong">Game Over. Try again!</h2>
      <div class="buttonWrapper">
        <button class="bio" @click="submitResponse('Bioabfall')">
          Bioabfall
        </button>
        <button class="plastic" @click="submitResponse('Kunststoff')">
          Kunststoff
        </button>
        <button class="metall" @click="submitResponse('Metall')">Metall</button>
        <button class="glass" @click="submitResponse('Altglas')">
          Altglas
        </button>
        <button class="paper" @click="submitResponse('Papier')">Papier</button>
        <button class="rest" @click="submitResponse('Restmüll')">
          Restmüll
        </button>
        <button class="problem" @click="submitResponse('Problemstoffsammlung')">
          Problemstoff
        </button>
        <button class="sperr" @click="submitResponse('Sperrmüll/Anderes')">
          Anderes
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
    };
  },
  computed: {
    currentProduct() {
      return this.products.default.find(
        (item) => item.id === this.currentProductId
      );
    },
    getCurrentImageUrl() {
      return require(`../static/images/${this.currentProduct.image}.jpg`);
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
    height: 250px;
  }
}
</style>
