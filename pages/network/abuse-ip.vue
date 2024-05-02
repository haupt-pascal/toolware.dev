<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';

const inputIP = ref("");
const result = ref(null);

const checkIP = async () => {
  try {
    const response = await axios.get('/api/abuse-ip', { 
      params: {
        ipAddress: inputIP.value,
        maxAgeInDays: 30,
        verbose: true
      }
    });
    result.value = response.data.data; // Hier ändern wir die Zuweisung, um auf die Daten zuzugreifen
  } catch (error) {
    console.error("Error fetching IP information:", error);
    result.value = null;
  }
};

console.log(result.value);
</script>
<template>
    <div>
        <h1>Check IP</h1>
        <input v-model="inputIP" type="text" placeholder="Enter IP" />
        <button @click="checkIP">Check</button>
        <div v-if="result">
          <h2>AbuseIPDB Report</h2>
          <div>
            <strong>IP Address:</strong> {{ result.ipAddress }}
          </div>
          <div>
            <strong>ISP:</strong> {{ result.isp }}
          </div>
          <div>
            <strong>Country:</strong> {{ result.countryName }} ({{ result.countryCode }})
          </div>
          <div>
            <strong>Confidence Score:</strong> {{ result.abuseConfidenceScore }}
          </div>
          <div>
            <strong>Total Reports:</strong> {{ result.totalReports }}
          </div>
          <div>
            <strong>Last Reported At:</strong> {{ result.lastReportedAt }}
          </div>
          <h3>Reports:</h3>
          <ul>
            <li v-for="(report, index) in result.reports" :key="index">
              <div>
                <strong>Reported At:</strong> {{ report.reportedAt }}
              </div>
              <div>
                <strong>Comment:</strong> {{ report.comment }}
              </div>
              <div>
                <strong>Reporter:</strong> {{ report.reporterCountryName }} ({{ report.reporterCountryCode }})
              </div>
            </li>
          </ul>
        </div>
        <div v-else>
          No data available
        </div>
    </div>
</template>
