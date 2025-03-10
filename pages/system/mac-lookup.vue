<script lang="ts" setup>
import { ref, computed } from "vue";

const macAddress = ref("");
const lookupResult = ref<any>(null);
const isLoading = ref(false);
const errorMessage = ref("");


const formattedMacAddress = computed(() => {
  if (!macAddress.value) return "";

  const clean = macAddress.value.replace(/[^0-9A-Fa-f]/g, "").toUpperCase();

  return clean.match(/.{1,2}/g)?.join(":") || "";
});

const lookupMac = async() => {
  if (!macAddress.value) {
    errorMessage.value = "Please enter a MAC address.";
    return;
  }
  isLoading.value = true;
  try {
    const response = await fetch(`/api/mac?url=${macAddress.value}`);
    if (response.ok) {
      lookupResult.value = await response.json();
      errorMessage.value = "";
    } else {
      lookupResult.value = null;
      errorMessage.value = "Error while looking up MAC address.";
    }
  } catch (error) {
    lookupResult.value = null;
    errorMessage.value = "Error while looking up MAC address.";
  } finally {
    isLoading.value = false;
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
    <h1>MAC Address Lookup</h1>

    <div class="input-container">
      <label>MAC Address</label>
      <input
          type="text"
          v-model="macAddress"
          placeholder="Enter MAC address (e.g., 00:1A:2B:3C:4D:5E)"
          @keyup.enter="lookupMac"
      />

      <div class="button-container">
        <a class="button-container-button" @click="lookupMac">Lookup</a>
      </div>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <div v-if="isLoading" class="loading-animation">
        <div></div>
        <div></div>
      </div>

      <div v-if="lookupResult" class="result-container">
        <h2>MAC Address Details:</h2>
        <div class="result">
          <span><strong>MAC Address:</strong> {{ formattedMacAddress }}</span>
          <span><strong>Vendor/Company:</strong> {{ lookupResult[0].company || "Unknown" }}</span>
          <span v-if="lookupResult[0].addressL1"><strong>Address:</strong> {{ lookupResult[0].addressL1 }} {{ lookupResult[0].addressL2}}</span>
          <span v-if="lookupResult[0].country"><strong>Country:</strong> {{ lookupResult[0].country }}</span>
        </div>
      </div>

      <Footer />
    </div>
  </div>
</template>