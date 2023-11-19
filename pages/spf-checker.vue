<template>
    <Navigation />
      <h1>SPF Checker</h1>
      <div class="input-container">
        <input
          type="text"
          placeholder="Type here your domain to check - e.g. haupt.design"
          v-model="inputURL"
          @keyup.enter="handleEnterKey"
        />
        <button @click="checkSPF">Check SPF</button>
        <div class="result-container">
          <h2>Result:</h2>
          <p v-if="loading">Loading...</p>
          <p v-if="result">The SPF record is:<b>{{ result }}</b></p>
        </div>
      </div>
      <Footer />
</template>
  
  <script setup>
  import { ref, watch } from "vue";
  
  const inputURL = ref("");
  const loading = ref(false);
  const result = ref("");
  
  const checkSPF = async () => {
    if (inputURL.value) {
      loading.value = true;
      try {
        const response = await useFetch("/api/spf", {
          query: {
            url: inputURL.value,
          },
        });
        const data = response.data;
        result.value = data || "No SPF record found.";
      } catch (error) {
        console.error("Error fetching SPF record:", error);
        result.value = "Error fetching SPF record.";
      } finally {
        loading.value = false;
      }
    } else {
      result.value = "Please enter a domain.";
    }
  };
  
  const handleEnterKey = () => {
    if (inputURL.value.trim() !== "") {
      checkSPF();
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
  
  <style scoped>
  /* Your styles here */
  </style>
  