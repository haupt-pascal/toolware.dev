<template>
  <div class="app">
    <Navigation />
    <h1>GeoIP Checker</h1>
    <div class="input-container">
      <span class="disclaimer">
        This tool uses an api-request from
        <a href="https://ipapi.co">ipapi.co</a> to get your public IP. Ipapi is
        an completely open source tool to get your public IP address.
      </span>
      <input type="text" placeholder="Enter IP Address" v-model="inputIP" />
      <button class="rounded-primary" @click="checkGeoIP">Check IP</button>
      <div class="result-container">
        <h2>Result:</h2>
        <p v-if="loading">Loading...</p>
        <div v-else>
          <p v-if="geoIP.network">Network: {{ geoIP.network }}</p>
          <p v-if="geoIP.city">City: {{ geoIP.city }}</p>
          <p v-if="geoIP.region">Region: {{ geoIP.region }}</p>
          <p v-if="geoIP.country_name">
            Country Name: {{ geoIP.country_name }}
          </p>
          <p v-if="geoIP.org">Org: {{ geoIP.org }}</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const inputIP = ref("");
const loading = ref(false);
const geoIP = ref({});

const checkGeoIP = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`https://ipapi.co/${inputIP.value}/json/`);
    geoIP.value = response.data;
  } catch (error) {
    console.error("Error fetching GeoIP information:", error);
    geoIP.value = {};
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
