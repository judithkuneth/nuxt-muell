<template>
  <div class="containerWrapper">
    <div>
      <h1>Where does this item go..?</h1>
      <img :src="getImageUrl()" alt="Tirolmilch" height="320">
    </div>
    <div>
      <button @click="updateResponse('papier')">
        Papier
      </button>
      <button @click="updateResponse('glas')">
        Glas
      </button>
      <button @click="updateResponse('plastic')">
        Plastik
      </button>
      <button @click="updateResponse('rest')">
        Restmüll
      </button>
    </div>
    <h2 v-if="selectedResponse != '' && !check()">
      oh no
    </h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [
        { id: 1, name: 'Milchverpackung', recycle: 'plastic' },
        { id: 2, name: 'Teebeutel', recycle: 'rest' },
        { id: 3, name: 'Weinflasche', recycle: 'glas' },
        { id: 4, name: 'Zeitung', recycle: 'papier' }
      ],
      selectedResponse: '',
      currentProductId: 1
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
      if (this.products.find(item => item.id === this.currentProductId).recycle === this.selectedResponse) { this.nextQuestion() } else { return false }
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
