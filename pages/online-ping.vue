<template>
    <div class="app">
      <Navigation />
      <h1>Online Ping</h1>
      <div class="input-container">
        <input
          type="text"
          placeholder="Type here your domain to check - e.g. haupt.design"
          v-model="inputURL"
          @keyup.enter="handleEnterKey"
        />
        <button @click="onlinePing">Online Ping</button>
        <div class="result-container">
          <h2>Result:</h2>
          <p v-if="loading">Loading...</p>
          <p v-if="result !== null && result !== ''">
            <b v-for="value in result">{{ value }}<br></b>
          </p>
          <p v-else-if="result !== null && result !== ''">
            Cannot ping the domain
          </p>
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  
  const inputURL = ref("");
  const loading = ref(false);
  const result = ref(null);
  
  const onlinePing = async () => {
    if (inputURL.value) {
      loading.value = true;
      try {
        const response = await useFetch("/api/ping", {
          query: {
            url: inputURL.value,
          },
        });
        const data = response.data;
        result.value = data.value || "";
      } catch (error) {
        console.error("Error executing the ping:", error);
        result.value = "Error executing the ping.";
      } finally {
        loading.value = false;
      }
    } else {
      result.value = "Please enter a domain.";
    }
  };
  
  const handleEnterKey = () => {
    if (inputURL.value.trim() !== "") {
      onlinePing();
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
  