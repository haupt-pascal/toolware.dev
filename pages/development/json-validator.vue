<script lang="ts" setup>
import { ref } from "vue";

const jsonInput = ref('');
const errorMessage = ref('');

const validateJson = () => {
  try {
    JSON.parse(jsonInput.value);
    errorMessage.value = '✅ Valid JSON';
  } catch (error) {
    errorMessage.value = `${(error as Error).message}`;
  }
};

const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Error while copying to clipboard:", error);
  }
};
</script>

<template>
  <div class="app">
    <Navigation />
    <Navbar />
    <h1>JSON Validator</h1>
    <div class="input-container">
        <textarea
            type="text"
            placeholder="Enter JSON here"
            v-model="jsonInput"
            @keyup.enter="validateJson"
        />

      <div class="result-container" v-if="errorMessage !== null && errorMessage !== ''">
        <div class="result">
          <div v-if="errorMessage != '✅ Valid JSON'">
            <h3 style="width: 100%; margin-top: 0;">❌ Error in JSON found:</h3>
          </div>
          <span>{{ errorMessage }}</span>
        </div>
        <div class="button-container">
          <a class="button-container-button" @click="copyToClipboard(errorMessage)"
          >Copy</a
          >
        </div>
      </div>
      <button @click="validateJson">Validate</button>
    <Footer />
  </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/stylesheet/style";
</style>