<template>
  <div class="app">
    <Navigation />
    <h1>Redirect Checker</h1>
    <div class="input-container">
      <input
        type="text"
        placeholder="Type here your URL to check - e.g. http://haupt.design"
        v-model="inputURL"
      />
      <button @click="checkRedirects">Check</button>
      <div class="result-container">
        <h2>Result:</h2>
        <p class="text-align-center" v-if="hosts.length">
          The website is redirected
        </p>
        <p v-if="loading">Loading...</p>
        <div v-else>
          <p v-for="host in hosts" :key="host">{{ host }}</p>
          <p v-if="!hosts.length">No redirects found.</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import { ref } from "vue";

const inputURL = ref("");
const hosts = ref([]);
const loading = ref(false);

const checkRedirects = async () => {
  if (inputURL.value) {
    loading.value = true;
    try {
      const response = await useFetch("/api/curl", {
        query: {
          url: inputURL.value,
        },
      });
      const data = response;
      let result = data.data.value || "";
      result = result.replace(/">/g, "").trim();
      hosts.value = result.split("\\r\\n");
    } catch (error) {
      console.error("Error fetching redirects:", error);
      hosts.value = [];
    } finally {
      loading.value = false;
    }
  } else {
    hosts.value = [];
  }
};
</script>
<style scoped></style>
