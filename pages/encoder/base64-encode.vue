<script setup lang="ts">
// base64 example: 100110 111010 001011 101001
import { ref } from "vue";

const inputText = ref("");
const encodedResult = ref("");

const encodeBase64 = () => {
  const encoded = btoa(inputText.value);
  encodedResult.value = encoded;
};

const copyToClipboard = (text: string) => {
  try {
    navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Error while copying to clipboard:", error);
  }
};

const refreshValue = (value: string) => {
  encodeBase64();
};
</script>
<template>
  <div class="app">
    <Navigation />
    <h1>Base64-Encoder</h1>
    <div class="input-container">
      <input
        v-model="inputText"
        type="text"
        placeholder="Type here your base64 code"
        @keyup.enter="encodeBase64"
      />
      <button @click="encodeBase64">Encode</button>

      <div class="result-container" v-if="encodedResult !== null && encodedResult !== ''">
        <h2>Result:</h2>
        <div class="result">
          <span>{{ encodedResult }}</span>
        </div>
        <div class="button-container">
          <a class="button-container-button" @click="copyToClipboard(encodedResult)"
            >Copy</a
          >
          <a class="button-container-button" @click="refreshValue(encodedResult)"
            >Refresh</a
          >
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/stylesheet/style";
</style>