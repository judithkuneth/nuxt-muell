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
      <div v-if="showAnswer">
        <p>Probier's mal beim {{ currentProduct.recycle }}</p>
      </div>
      <buttons
        :buttons="buttons"
        :submitResponse="submitResponse"
        @show-the-answer="showAnswerTrue"
      ></buttons>
      <!-- <buttons
        :buttons="buttons"
        @show-the-answer="showAnswerTrue"
        @emit-response="submitResponse($event)"
      ></buttons> -->
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
      showAnswer: false,
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
      this.showAnswer = false;
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
    showAnswerTrue() {
      this.showAnswer = true;
      setTimeout(() => {
        this.showAnswer = false;
      }, 3000);
    },
  },
};
</script>

<style lang="scss">
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
@media (max-width: 350px) {
  .imageItem {
    height: 150px;
  }
}
</style>
