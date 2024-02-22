<script setup>
import { ref } from "vue";

const inputURL = ref("");
const result = ref(null);

const onlinePing = async () => {
  if (inputURL.value) {
    try {
      const response = await useFetch("/api/ping", {
        query: {
          url: inputURL.value,
        },
      });
      const data = response.data;
      result.value = data.value || "";
    } catch (error) {
      result.value = "Error executing the ping.";
    }
  }
};
</script>
<template>
  <div class="app">
    <Navigation />
    <h1>Online Ping</h1>
    <div class="input-container">
      <input
        type="text"
        placeholder="Type here your domain to check - e.g. haupt.design"
        v-model="inputURL"
        @keyup.enter="onlinePing"
      />
      <button @click="onlinePing">Online Ping</button>
      <div class="result-container" v-if="result !== null && result !== ''">
        <h2>Result:</h2>
        <div class="result">
          <p>
            <b v-for="value in result">{{ value }}<br /></b>
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/stylesheet/style";
</style>
