<script setup>
import { ref } from "vue";

const inputURL = ref("");
const loading = ref(false);
const result = ref(null);

const checkDMARC = async () => {
  if (inputURL.value) {
    loading.value = true;
    try {
      const response = await useFetch("/api/dmarc", {
        query: {
          url: inputURL.value,
        },
      });
      const data = response.data;
      result.value = data || "";
    } catch (error) {
      console.error("Error fetching DMARC record:", error);
      result.value = "Error fetching DMARC record.";
    } finally {
      loading.value = false;
    }
  }
};
</script>
<template>
  <div class="app">
    <Navigation />
    <Navbar />
    <h1>DMARC Checker</h1>
    <div class="input-container">
      <input
        type="text"
        placeholder="Type here your domain to check - e.g. haupt.design"
        v-model="inputURL"
        @keyup.enter="checkDMARC"
      />
      <button @click="checkDKIM">Check DMARC</button>
      <div class="result-container" v-if="result !== '' && result !== null">
        <h2>Result:</h2>
        <div class="result">
          <span v-if="result !== null && result !== ''">
          The DMARC record is: <b>{{ result }}</b>
        </span>
        <span v-else-if="result !== null && result !== ''">
          No DMARC found for this domain
        </span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/stylesheet/style";
</style>