<template>
  <div class="buttonWrapper">
    <button
      v-for="(button, index) in buttons"
      :key="index"
      :class="button.style"
      @click="submitResponse(button.response)"
    >
      {{ button.label }}
    </button>
    <!-- <button
      v-for="(button, index) in buttons"
      :key="index"
      :class="button.style"
      @click="emitResponse(button.response)"
    >
      {{ button.label }}
    </button> -->
    <button class="btn-small" @click="showAnswer">?</button>
  </div>
</template>
<script>
export default {
  props: { buttons: Array, submitResponse: Function },
  methods: {
    emitResponse(response) {
      this.$emit("emit-response", response);
    },
    showAnswer() {
      this.$emit("show-the-answer");
    },
  },
};
</script>

<style lang="scss">
.buttonWrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 200px;
  width: 100%;
  button {
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>