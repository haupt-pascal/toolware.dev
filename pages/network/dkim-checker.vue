<script setup>
import { ref, watch } from "vue";

const inputURL = ref("");
const result = ref(null);

const checkDKIM = async () => {
  if (inputURL.value) {
    try {
      const response = await useFetch("/api/dkim", {
        query: {
          url: inputURL.value,
        },
      });
      const data = response.data;
      result.value = data || "";
    } catch (error) {
      console.error("Error fetching DKIM record:", error);
      result.value = "Error fetching DKIM record.";
    }
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
<template>
  <div class="app">
    <Navigation />
    <h1>DKIM Checker</h1>
    <div class="input-container">
      <input
        type="text"
        placeholder="Type here your domain to check - e.g. haupt.design"
        v-model="inputURL"
        @keyup.enter="checkDKIM"
      />
      <button @click="checkDKIM">Check DKIM</button>
      <div class="result-container" v-if="result !== '' && result !== null">
        <h2>Result:</h2>
        <div class="result">
          <span v-if="result !== null && result !== ''">
            The DKIM record is: <b>{{ result }}</b>
          </span>
          <span v-else-if="result !== null && result !== ''">
            No DKIM found for this domain
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
