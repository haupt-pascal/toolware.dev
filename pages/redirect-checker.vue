<template>
  <Navigation />
  <h1>Redirect Checker</h1>
  <div class="input-container">
    <input
      v-model="websiteURL"
      type="text"
      placeholder="Type here your url to check - e.g. http://haupt.design"
      @keydown.enter="clearAndCheckRedirect"
    />
    <button @click="clearAndCheckRedirect">Check</button>

    <div class="result-container" v-if="redirectInfo !== null">
      <h2>Result:</h2>
      <div v-if="!loading">
        <p>{{ redirectInfo.redirectStatus }}</p>
        <p
          v-if="
            redirectInfo.redirectCount !== null &&
            redirectInfo.redirectCount > 1
          "
        >
          {{ redirectInfo.redirectCount }} redirect(s) to:
          {{ redirectInfo.redirectUrl }}
        </p>
        <p v-else-if="redirectInfo.redirectCount === 1">
          1 redirect to: {{ redirectInfo.redirectUrl }}
        </p>
        <p v-else>No redirects found</p>
      </div>
      <div v-if="loading">
        <p>Loading...</p>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref } from "vue";

const websiteURL = ref("");
const redirectInfo = ref(null);
const loading = ref(false);

const clearAndCheckRedirect = async () => {
  redirectInfo.value = null;
  await checkRedirect();
};

const checkRedirect = async () => {
  loading.value = true;
  try {
    const response = await fetch(
      `/api/?url=${encodeURIComponent(
        websiteURL.value
      )}&timeout=5&maxhops=10&meta-refresh=1&format=json`
    );

    if (response.ok) {
      const data = await response.json();
      const redirectData = data?.data?.[0];
      if (redirectData) {
        const redirectResponse = redirectData.response;
        const redirectStatus = `Redirect status: ${redirectResponse.info.http_code}`;
        const redirectCount = redirectResponse.info.redirect_count;
        const redirectUrl = redirectResponse.info.redirect_url || "N/A";

        if (
          redirectResponse.info.http_code === 301 ||
          redirectResponse.info.http_code === 302
        ) {
          redirectInfo.value = {
            redirectStatus,
            redirectCount: 1,
            redirectUrl,
          };
        } else {
          redirectInfo.value = { redirectStatus, redirectCount, redirectUrl };
        }
      } else {
        redirectInfo.value = { redirectStatus: "No redirect data available." };
      }
    } else {
      redirectInfo.value = {
        redirectStatus: "Error while checking redirects.",
      };
    }
  } catch (error) {
    console.error("Got the following error while checking redirects:", error);
    redirectInfo.value = { redirectStatus: "Error while checking redirects." };
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Stildefinitionen */
</style>
