<template>
  <Navigation />
  <h1>DMARC Checker</h1>
  <div class="input-container">
    <input
      type="text"
      placeholder="Type here your domain to check - e.g. haupt.design"
      v-model="inputURL"
      @keyup.enter="handleEnterKey"
    />
    <button @click="checkDKIM">Check DMARC</button>
    <div class="result-container">
      <h2>Result:</h2>
      <p v-if="loading">Loading...</p>
      <p v-if="result !== null && result !== ''">
        The DMARC record is: <b>{{ result }}</b>
      </p>
      <p v-else-if="result !== null && result !== ''">
        No DMARC found for this domain
      </p>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, watch } from "vue";

const inputURL = ref("");
const loading = ref(false);
const result = ref(null);

const checkDKIM = async () => {
  if (inputURL.value) {
    loading.value = true;
    try {
      const response = await useFetch("/api/dmarc", {
        query: {
          url: inputURL.value,
        },
      });
      const data = response.data;
      result.value = data || ""; // Set result to empty string if no DKIM found
    } catch (error) {
      console.error("Error fetching DMARC record:", error);
      result.value = "Error fetching DMARC record.";
    } finally {
      loading.value = false;
    }
  } else {
    result.value = "Please enter a domain.";
  }
};

const handleEnterKey = () => {
  if (inputURL.value.trim() !== "") {
    checkDKIM();
  }
};

watch(
  () => inputURL.value,
  () => {
    if (event.key === "Enter") {
      handleEnterKey();
    }
  }
);
</script>

<style scoped></style>
