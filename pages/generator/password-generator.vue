<script lang="ts" setup>
import { ref } from "vue";

const passwordLength = ref(24);
const password = ref("");
const includeUppercase = ref(true);
const includeLowercase = ref(true);
const includeNumbers = ref(true);
const includeSymbols = ref(true);

const generatePassword = () => {
  try {
    let characters = "";
    if (includeUppercase.value) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase.value) characters += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers.value) characters += "0123456789";
    if (includeSymbols.value) characters += "!§$%&/()=?#+*~";

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
    <Navbar />
    <h1>Password Generator</h1>
    <div class="input-container">
      <div class="options-container">
        <label>
          <input type="checkbox" v-model="includeUppercase" />
          Include Uppercase
        </label>
        <label>
          <input type="checkbox" v-model="includeLowercase" />
          Include Lowercase
        </label>
        <label>
          <input type="checkbox" v-model="includeNumbers" />
          Include Numbers
        </label>
        <label>
          <input type="checkbox" v-model="includeSymbols" />
          Include Symbols
        </label>
      </div>
      <input
        type="number"
        max="1024"
        min="1"
        v-model="passwordLength"
        placeholder="Type here the length of the password between 1 and 100"
        @keyup.enter="generatePassword"
      />
      <button @click="generatePassword">Generate</button>
      <div class="result-container" v-if="password !== null && password !== ''">
        <h2>Result:</h2>
        <div class="result">
          <span>
            {{ password }}
          </span>
        </div>
        <div class="button-container">
          <a class="button-container-button" @click="copyToClipboard(password)"
            >Copy</a
          >
          <a class="button-container-button" @click="refreshValue(password)"
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