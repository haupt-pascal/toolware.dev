<script setup lang="ts">
import { ref } from "vue";

const inputText = ref("");
const decodedResult = ref("");

const decodeBase64 = () => {
  try {
    const decoded = atob(inputText.value);
    decodedResult.value = decoded;
  } catch (error) {
    console.error("Fehler beim Decodieren des Base64-Codes:", error);
    decodedResult.value = "Fehler beim Decodieren";
  }
};

const copyToClipboard = (text: string) => {
  try {
    navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Error while copying to clipboard:", error);
  }
};

const refreshValue = (value: string) => {
  decodeBase64();
};
</script>
<template>
  <div class="app">
    <Navigation />
    <Navbar />
    <h1>Base64-Decoder</h1>
    <div class="input-container">
      <input
        v-model="inputText"
        type="text"
        placeholder="Type here your base64 code"
        @keyup.enter="decodeBase64"
      />
      <button @click="decodeBase64">Decode</button>

      <div class="result-container" v-if="decodedResult !== null && decodedResult !== ''">
        <h2>Result:</h2>
        <div class="result">
          <span>{{ decodedResult }}</span>
        </div>
        <div class="button-container">
          <a class="button-container-button" @click="copyToClipboard(decodedResult)"
            >Copy</a
          >
          <a class="button-container-button" @click="refreshValue(decodedResult)"
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
