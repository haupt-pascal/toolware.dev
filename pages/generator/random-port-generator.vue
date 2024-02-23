<script lang="ts" setup>
import { ref } from "vue";

const randomPort = ref(0);

const generateRandomPort = () => {
  randomPort.value = Math.floor(Math.random() * 65535) + 1;
};

const copyToClipboard = (text: string) => {
  try {
    navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Error while copying to clipboard:", error);
  }
};

const refreshValue = (value: string) => {
  generateRandomPort();
};

generateRandomPort();
</script>
<template>
    <div class="app">
        <Navigation />
        <h1>Port Generator</h1>
        <div class="input-container">
            <div class="result-container" v-if="randomPort !== null && randomPort !== 0">
                <h2>Result:</h2>
                <div class="result">
                    <span>
                        {{ randomPort }}
                    </span>
                </div>
                <div class="button-container">
                    <a class="button-container-button" @click="copyToClipboard(randomPort.toString())">Copy to Clipboard</a>
                    <a class="button-container-button" @click="refreshValue(randomPort.toString())">Refresh</a>
                </div>
            </div>
        </div>
    </div>
</template>