<script setup lang="ts">
import { ref } from "vue";

const websiteURL = ref("");
const sslStatus = ref("");
const validFrom = ref("");
const validUntil = ref("");

const clearAndCheckSSL = () => {
  sslStatus.value = "";
  validFrom.value = "";
  validUntil.value = "";
  checkSSL();
};

const checkSSL = async () => {
  try {
    const response = await fetch(
      `https://api.certspotter.com/v1/issuances?domain=${websiteURL.value}`
    );

    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 1) {
        const currentDate = new Date().getTime();
        const cert = data[1];

        const notBefore = new Date(cert.not_before).getTime();
        const notAfter = new Date(cert.not_after).getTime();

        if (notBefore <= currentDate && notAfter >= currentDate) {
          validFrom.value = new Date(cert.not_before).toLocaleDateString();
          validUntil.value = new Date(cert.not_after).toLocaleDateString();
          sslStatus.value = `Valid certificate found!`;
        } else {
          sslStatus.value = "No valid certificates found.";
        }
      } else {
        sslStatus.value = "No valid certificates found.";
      }
    } else {
      sslStatus.value = "Error while checking SSL certificate.";
    }
  } catch (error) {
    console.error(
      "Got the following error while checking the certificate:",
      error
    );
    sslStatus.value = "Error while checking SSL certificate.";
  }
};
</script>
<template>
  <div class="app">
    <Navigation />
    <Navbar />
    <h1>SSL-Checker</h1>
    <div class="input-container">
      <span class="disclaimer">
        This tool checks the SSL certificate of the given domain. It uses the
        <a href="https://certspotter.com/" target="_blank">Cert Spotter API</a>
        to check the certificate.
      </span>
      <input
        v-model="websiteURL"
        type="text"
        placeholder="Type here your domain to check - e.g. haupt.design"
        @keydown.enter="clearAndCheckSSL"
      />
      <button @click="clearAndCheckSSL">Check</button>

      <div class="result-container" v-if="sslStatus !== '' && sslStatus !== null">
        <h2>Result:</h2>
        <div class="result">
          <div v-if="validFrom && validUntil">
          <p>Valid from: {{ validFrom }}</p>
          <p>Valid until: {{ validUntil }}</p>
        </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/stylesheet/style";
</style>