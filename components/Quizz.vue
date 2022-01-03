<template>
<div>
  <div v-if="!checkSecret(secretInput)">
    <p class="white"> enter secret to start the game </p>
   <input  v-model="secretInput" type="text">
   </div>
  <div v-if="checkSecret(secretInput)" class="containerWrapper">
    <div>
      <h2>Recycle me!</h2>
      <h1 class="main"> {{ this.currentProduct.name }}</h1>
    </div>
    <div>
      <img :src="getImageUrl()" alt="" class="imageItem">
    </div>
    <p v-if="!gameOver">Score: <span class="h1 correct">{{ score }}</span></p>
     <h2 class="wrong" v-if="gameOver">
      Game Over. Try again!
    </h2>
    <div class="buttonWrapper">
      <button class="bio" @click="updateResponse('Bioabfall')">
        Bioabfall
      </button>
      <button class="plastic" @click="updateResponse('Kunststoff')">
        Kunststoff
      </button>
      <button class="metall" @click="updateResponse('Metall')">
        Metall
      </button>
      <button class="glass" @click="updateResponse('Altglas')">
        Altglas
      </button>
      <button class="paper" @click="updateResponse('Papier')">
        Papier
      </button>
       <button class="rest" @click="updateResponse('Restmüll')">
        Restmüll
      </button>
      <button class="problem" @click="updateResponse('Problemstoffsammlung')">
        Problemstoffsammlung
      </button>
       <button class="sperr" @click="updateResponse('Sperrmüll/Anderes')">
        Anderes/Sperrmüll
      </button>
    </div>
  </div>
  </div>
</template>

<script>
import * as products from '../static/products2.json'

export default {
  data () {
    return {
      products,
      selectedResponse: '',
      currentProductId: 1,
      currentProduct: {},
      score: 0,
      secret: false,
      secretInput: '',
      gameOver: false
    }
  },
  methods: {
    checkSecret (value) {
      if (value === 'lasagne') { return this.secret === true } else { return this.secret === false }
    },
    getCurrentProduct () {
      const currentProduct = this.products.default.find(item => item.id === this.currentProductId)
      this.currentProduct = currentProduct
      return currentProduct
    },
    getImageUrl () {
      return require(`../static/images/${this.currentProduct.image}.jpg`)
    },
    updateResponse (value) {
      this.selectedResponse = value
      this.check()
    },
    check () {
      if (this.products.default.find(item => item.id === this.currentProductId).recycle === this.selectedResponse) { this.score++; this.nextQuestion(); this.gameOver = false } else { this.score = 0; this.gameOver = true }
    },
    nextQuestion () {
      this.selectedResponse = ''; if (this.currentProductId < 147) { this.currentProductId++; this.getCurrentProduct() } else { this.currentProductId = 1; this.getCurrentProduct() }
    }
  },
  created () {
    this.getCurrentProduct()
  }
}

</script>

<style>

.containerWrapper{
  display:flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  border-radius:20px;
  border: 1px solid gray;
   background-color:#fcfcfa;
   max-width: 700px;
}

.imageItem{
height:300px
}

.buttonWrapper{
  display:flex;
  justify-content:center;
  flex-wrap: wrap;
  margin: 20px 200px;
  width: 100%;
}

@media (max-width: 900px) {
  .buttonWrapper{
  margin: 20px 6px;
  }
  button{
    width: 30%;
  }
  .imageItem{
height:250px
}
}

</style>
