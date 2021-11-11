<template>
  <div class="containerWrapper">
    <div>
      <h1>Where does this item go..?</h1>
      <img :src="getImageUrl()" alt="Tirolmilch" height="320">
    </div>
    <div class="buttonWrapper">
      <button class="rest" @click="updateResponse('rest')">
        Restmüll
      </button>
      <button class="plastic" @click="updateResponse('plastic')">
        Plastik
      </button>
      <button class="metall" @click="updateResponse('metall')">
        Metall
      </button>
      <button class="glass" @click="updateResponse('glas')">
        Glas
      </button>
      <button class="paper" @click="updateResponse('papier')">
        Papier
      </button>
    </div>
    <h2>Score: {{ score }}</h2>
    <h2 v-if="selectedResponse != '' && !check()">
      oh no
    </h2>
  </div>
</template>

<script>
import { products } from '../static/constants.js'
export default {
  data () {
    return {
      products,
      selectedResponse: '',
      currentProductId: 1,
      score: 0
    }
  },
  methods: {
    getProductById () {
      return this.products.find(item => item.id === this.currentProductId)
    },
    getImageUrl () {
      return require(`../static/images/${this.currentProductId}.jpg`)
    },

    updateResponse (value) {
      this.selectedResponse = value
      this.check()
    },
    check () {
      if (this.products.find(item => item.id === this.currentProductId).recycle === this.selectedResponse) { this.score++; this.nextQuestion() } else { this.score = 0 }
    },
    nextQuestion () {
      this.selectedResponse = ''; if (this.currentProductId < 4) { this.currentProductId++ } else { this.currentProductId = 1 }
    }
  }
}
</script>

<style>
@import '../styles/index.css';

.containerWrapper{
  display:flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  width: 50%;
}

</style>
