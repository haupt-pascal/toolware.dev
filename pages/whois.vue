<template>
  <Navigation />
  <h1>Whois Online</h1>
    <div class="input-container">
      <input
        type="text"
        placeholder="Type here your domain to check - e.g. zaskoku.com"
        v-model="inputURL"
        @keyup.enter="checkWhois"
      />
      <button @click="checkWhois">Check Whois</button>
      <div class="result-container">
        <h2>Result:</h2>
        <p v-if="loading">Loading...</p>
        <div
          class="result-container-result"
          v-if="result.value && result.value.length > 0"
        >
          <p v-for="(item, index) in result.value" :key="index">{{ item }}</p>
        </div>
      </div>
    </div>
    <Footer />
</template>

<script setup>
import { ref } from "vue";

const inputURL = ref("");
const loading = ref(false);
const result = ref([]);

const checkWhois = async () => {
  if (inputURL.value) {
    loading.value = true;
    try {
      const response = await useFetch("/api/whois", {
        query: {
          url: inputURL.value,
        },
      });
      const data = response.data;
      result.value = data || "No Whois record found.";
    } catch (error) {
      console.error("Error fetching Whois record:", error);
      result.value = "Error fetching Whois record.";
    } finally {
      loading.value = false;
    }
  } else {
    result.value = "Please enter a domain.";
  }
};
</script>
<style scoped></style>
