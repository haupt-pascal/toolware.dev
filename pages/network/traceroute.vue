<script setup>
import { ref } from "vue";

const inputURL = ref("");
const result = ref("");
const loading = ref(false);

const traceroute = async () => {
  if (inputURL.value) {
    loading.value = true;
    try {
      const response = await useFetch("/api/traceroute", {
        query: {
          url: inputURL.value,
        },
      });
      const data = response.data;
      result.value = data.value || "";
    } catch (error) {
      result.value = "Error executing the traceroute.";
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
    <h1>Traceroute</h1>
    <div class="input-container">
      <input
        type="text"
        placeholder="Type here your domain to check - e.g. haupt.design"
        v-model="inputURL"
        @keyup.enter="traceroute"
      />
      <button @click="traceroute">Traceroute</button>
      <div
        class="result-container"
        v-if="!loading && result !== null && result !== ''"
      >
        <h2>Result:</h2>
        <div class="result">
          <span>
            <b v-for="value in result">{{ value }}<br /></b>
          </span>
        </div>
      </div>
      <div class="loading-animation" v-if="loading">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/stylesheet/style";
</style>