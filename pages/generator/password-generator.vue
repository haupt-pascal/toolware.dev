<script lang="ts" setup>
import { ref } from "vue";

const passwordLength = ref(8);
const password = ref("");

const generatePassword = () => {
  try {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!§$%&/()=?#+*~";
    let result = "";
    for (let i = 0; i < passwordLength.value; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    password.value = result;
  } catch (error) {
    console.error("Error while generating the password:", error);
    password.value = "Error while generating the password";
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
  generatePassword();
};
</script>
<template>
  <div class="app">
    <Navigation />
    <h1>Password Generator</h1>
    <div class="input-container">
      <input
        type="number"
        max="100"
        min="1"
        v-model="passwordLength"
        placeholder="Type here the length of the password between 1 and 100"
      />
      <button @click="generatePassword">Generate</button>
      <div class="result-container" v-if="password !== null && password !== ''">
        <h2>Result:</h2>
        <div class="result">
          {{ password }}
        </div>
        <div class="button-container">
          <a class="button-container-button" @click="copyToClipboard(password)">Copy</a>
            <a class="button-container-button" @click="refreshValue(password)">Refresh</a>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<style lang="scss">
@import "@/assets/stylesheet/style";
</style>
