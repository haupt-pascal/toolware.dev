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
</script>
<template>
  <Navigation />
  <div class="body">
    <h1>Base64-Decoder</h1>
    <div class="input-container">
      <input
        v-model="inputText"
        type="text"
        placeholder="Type here your base64 code"
      />
      <button @click="decodeBase64">Decode</button>

      <div class="result-container">
        <h2>Result:</h2>
        <p>{{ decodedResult }}</p>
      </div>
    </div>
    <Footer />
  </div>
</template>
<style lang="scss">
@import "@/assets/stylesheet/style";
</style>
