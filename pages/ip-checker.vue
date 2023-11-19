<script setup lang="ts">
import { ref, onMounted } from "vue";

const ipv4 = ref("");
const ipv6 = ref("");

async function fetchIPv4() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    const { ip } = data;

    ipv4.value = `${ip}`;
  } catch (error) {
    console.error("Error while accessing your IPv4 address:", error);
  }
}

async function fetchIPv6() {
  try {
    const response = await fetch("https://api64.ipify.org?format=json");
    const data = await response.json();
    const { ip } = data;

    ipv6.value = `${ip}`;
  } catch (error) {
    console.error("Error while accessing your IPv6 address", error);
  }
}

onMounted(() => {
  fetchIPv4();
  fetchIPv6();
});
</script>

<template>
  <Navigation />
  <div class="hero subpage">
    <h1>IP-Checker</h1>
    <div class="result">
      <span class="disclaimer">
        This tool uses an api-request from
        <a href="https://www.ipify.org">ipify.org</a> to get your public IP. Ipify is an completely open source tool to get your public IP
        address.
      </span>
      <h2>
        Your public IPv4 address: <b>{{ ipv4 }}</b>
      </h2>
      <h2>
        Your public IPv6 address: <b>{{ ipv6 }}</b>
      </h2>
    </div>
  </div>
  <Footer />
</template>

<style lang="scss">
@import "@/assets/stylesheet/style";
</style>
