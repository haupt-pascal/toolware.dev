<script setup>
import { ref } from "vue";
import axios from "axios";

const inputIP = ref("");
const result = ref(null);
const listedResults = ref([]);
const notListedResults = ref([]);

const checkIP = async () => {
  try {
    const response = await axios.get("/api/dnsbl-check", {
      params: {
        ipAddress: inputIP.value,
      },
    });
    result.value = response.data;

    listedResults.value = result.value.results.filter(res => res.status === 1);
    notListedResults.value = result.value.results.filter(res => res.status === 0);

  } catch (error) {
    console.error("Error fetching IP information:", error);
    result.value = null;
  }
};

</script>

<template>
  <div class="app">
    <Navigation />
    <Navbar />
    <h1>Check IP for DNSBL</h1>
    <div class="input-container">
      <input
        v-model="inputIP"
        type="text"
        placeholder="IP Address here... e.g. 8.8.8.8"
      />
      <button @click="checkIP">Check</button>
      <div class="result-container" v-if="result !== '' && result !== null">
        <div class="result" v-if="result">
          <h2>DNSBL Report</h2>
          <span><strong>IP Address:</strong> {{ result.ip }}</span>
          <span><strong>Reverse DNS:</strong> {{ result.rdns }}</span>
          <span><strong>Input:</strong> {{ result.input }}</span>

          <h3>Blacklist Results:</h3>

          <div v-if="listedResults.length > 0">
            <h4>Listed</h4>
            <ul class="ul__nonleft">
              <li v-for="(res, index) in listedResults" :key="index">
                <strong style="color: #ff4545;">{{ res.name }}</strong><br />
                <span style="color: #ff4545;">Status: Listed</span><br />
                <span style="color: #ff4545;">Lookup: {{ res.lookup }}</span><br />
                <span style="color: #ff4545;">Website: <a :href="res.website" target="_blank" style="color: #ff4545; text-decoration: underline;">{{ res.website }}</a></span><br />
                <span style="color: #ff4545;">Delist: <a :href="res.delist" target="_blank" style="color: #ff4545; text-decoration: underline;">{{ res.delist }}</a></span><br />
                <span style="color: #ff4545;">Response Time: {{ res.time }} ms</span><br /><br />
              </li>
            </ul>
          </div>

          <div v-if="notListedResults.length > 0">
            <h4 style="color: white;">Not Listed</h4>
            <ul class="ul__nonleft">
              <li v-for="(res, index) in notListedResults" :key="index" style="color: white;">
                <strong>{{ res.name }}</strong><br />
                <span>Status: Not Listed</span><br />
                <span>Lookup: {{ res.lookup }}</span><br />
                <span>Website: <a :href="res.website" target="_blank">{{ res.website }}</a></span><br />
                <span>Delist: <a :href="res.delist" target="_blank">{{ res.delist }}</a></span><br />
                <span>Response Time: {{ res.time }} ms</span><br /><br />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/stylesheet/style";

// custom

.ul__nonleft {
    padding-left: 0;
}


.result {
    align-items: flex-start !important;
}
</style>
