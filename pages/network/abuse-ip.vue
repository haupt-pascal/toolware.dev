<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const inputIP = ref("");
const result = ref(null);

const checkIP = async () => {
  try {
    const response = await axios.get("/api/abuse-ip", {
      params: {
        ipAddress: inputIP.value,
        maxAgeInDays: 30,
        verbose: true,
      },
    });
    result.value = response.data.data;
  } catch (error) {
    console.error("Error fetching IP information:", error);
    result.value = null;
  }
};

const scoreColor = (score) => {
  if (score < 30) {
    return "#7DB828";
  } else if (score >= 30 && score <= 60) {
    return "yellow";
  } else {
    return "red";
  }
};
</script>
<template>
  <div class="app">
    <Navigation />
    <Navbar />
    <h1>Check IP</h1>
    <div class="input-container">
      <input
        v-model="inputIP"
        type="text"
        placeholder="IP Address here... e.g. 8.8.8.8"
      />
      <button @click="checkIP">Check</button>
      <div class="result-container" v-if="result !== '' && result !== null">
        <div class="result" v-if="result">
          <h2>AbuseIPDB Report</h2>
          <span><strong>IP Address:</strong> {{ result.ipAddress }}</span>
          <span><strong>ISP:</strong> {{ result.isp }}</span>
          <span>
            <strong>Country:</strong> {{ result.countryName }} ({{
              result.countryCode
            }})
          </span>
          <span>
            <strong>Spam Score: </strong>
            <span :style="{ color: scoreColor(result.abuseConfidenceScore) }">
              {{ result.abuseConfidenceScore }}%
            </span>
          </span>

          <span><strong>Total Reports:</strong> {{ result.totalReports }}</span>
          <span>
            <strong>Last Reported At:</strong> {{ result.lastReportedAt }}
          </span>
          <h3>Reports:</h3>
          <span v-for="(report, index) in result.reports" :key="index">
            <span><strong>Reported At:</strong> {{ report.reportedAt }}</span
            ><br />
            <span><strong>Comment:</strong> {{ report.comment }}</span>
            <span
              ><br />
              <strong>Reporter:</strong> {{ report.reporterCountryName }} ({{
                report.reporterCountryCode
              }})
            </span>
            <br />
            <br />
          </span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/stylesheet/style";
</style>
