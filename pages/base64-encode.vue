<script setup lang="ts">
// base64 example: 100110 111010 001011 101001
import { ref } from 'vue';

const inputText = ref('');
const encodedResult = ref('');

const encodeBase64 = () => {
  const encoded = btoa(inputText.value);
  encodedResult.value = encoded;
};
</script>
<template>
    <Navigation />
    <h1>Base64-Encoder</h1>
    <div class="input-container">
        <input v-model="inputText" type="text" placeholder="Type here your base64 code">
        <button @click="encodeBase64">Encode</button>
        
        <div class="result-container">
            <h2>Result:</h2>
            <p>{{ encodedResult }}</p>
        </div>
    </div>
</template>
<style lang="scss">
@import "@/assets/stylesheet/style";
</style>
