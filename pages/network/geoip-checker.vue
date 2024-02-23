<script setup>
import axios from "axios";
import { ref } from "vue";

const inputIP = ref("");
const geoIP = ref({});

const checkGeoIP = async () => {
  try {
    const response = await axios.get(`https://ipapi.co/${inputIP.value}/json/`);
    geoIP.value = response.data;
  } catch (error) {
    console.error("Error fetching GeoIP information:", error);
    geoIP.value = {};
  }
};

console.log(geoIP.value);
</script>
<template>
  <div class="app">
    <Navigation />
    <Navbar />
    <h1>GeoIP Checker</h1>
    <div class="input-container">
      <span class="disclaimer">
        This tool uses an api-request from
        <a href="https://ipapi.co">ipapi.co</a> to get your public IP. Ipapi is
        an completely open source tool to get your public IP address.
      </span>
      <input
        type="text"
        placeholder="Enter IP Address"
        v-model="inputIP"
        @keyup.enter="checkGeoIP"
      />
      <button class="rounded-primary" @click="checkGeoIP">Check IP</button>
      <div
        class="result-container"
        v-if="
          geoIP.network !== '' &&
          geoIP.network !== null &&
          geoIP.network !== undefined
        "
      >
        <h2>Result:</h2>
        <div class="result">
          <span v-if="geoIP.network">Network: {{ geoIP.network }}</span>
          <span v-if="geoIP.city">City: {{ geoIP.city }}</span>
          <span v-if="geoIP.region">Region: {{ geoIP.region }}</span>
          <span v-if="geoIP.country_name">
            Country Name: {{ geoIP.country_name }}
          </span>
          <span v-if="geoIP.org">Org: {{ geoIP.org }}</span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/stylesheet/style";
</style>
