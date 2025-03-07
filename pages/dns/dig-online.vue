<script lang="ts" setup>
import { ref } from "vue";

const domain = ref("");
const results = ref<string | null>(null);
const loading = ref(false);

const digDomain = async () => {
  if (domain.value === "") {
    results.value = "Please enter a domain";
    return;
  }

  loading.value = true;
  try {
    const response = await fetch(`/api/dig?domain=${domain.value}`);
    const data = await response.json();
    results.value = data.result;
  } catch (error) {
    console.error("Error while fetching data:", error);
    results.value = "Error while fetching data";
  } finally {
    loading.value = false;
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
    <h1>DIG Online</h1>
    <div class="input-container">
      <input
        v-model="domain"
        type="text"
        placeholder="Type here your domain"
        @keyup.enter="digDomain"
      />
      <button @click="digDomain">Check DIG</button>

      <div class="result-container" v-if="results !== null && results !== ''">
        <h2>Result:</h2>
        <div class="result">
          <span>{{ results }}</span>
        </div>
        <div class="button-container">
          <a class="button-container-button" @click="copyToClipboard(results)"
            >Copy</a
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