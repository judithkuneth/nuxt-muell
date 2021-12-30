<template>
<div>
  <div v-if="checkSecret(secretInput)">
    <p class="white"> enter secret to start the game </p>
   <input  v-model="secretInput" type="text">
   </div>
  <div v-if="!checkSecret(secretInput)" class="containerWrapper">
    <div>
      <h2>Recycle me!</h2>
      <h1 class="main"> {{ getProductById().name }}</h1>
    </div>
    <div>
      <img :src="getImageUrl()" alt="" class="imageItem">
    </div>
    <h2 class="correct" v-if="!gameOver">Score: {{ score }}</h2>
     <h2 class="wrong" v-if="gameOver">
      Nop. Try again :)
    </h2>
    </h2>
    <div class="buttonWrapper">
      <button class="bio" @click="updateResponse('bio')">
        Bio
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
       <button class="rest" @click="updateResponse('rest')">
        Restmüll
      </button>
    </div>
  </div>
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
      if (this.products.find(item => item.id === this.currentProductId).recycle === this.selectedResponse) { this.score++; this.nextQuestion(); this.gameOver = false } else { this.score = 0; this.gameOver = true }
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
