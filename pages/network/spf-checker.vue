<template>
  <div class="app">
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
        <p v-if="result">
          The SPF record is:<b>{{ result }}</b>
        </p>
      </div>
    </div>
    <div class="input-container info-container">
      <h2>What is an SPF-Record?</h2>
      <p class="along">
        SPF stands for Sender Policy Framework. It is a DNS TXT record that
        specifies which IP addresses and/or hostnames are allowed to send emails
        from a specific domain. SPF records are used to prevent spammers from
        sending messages with forged From addresses at that domain.
      </p>
      <h3>What is an good SPF-Record in general?</h3>
      <span class="along"> v=spf1 a mx ~all </span>
      <h3>What is an good SPF-Record for Google Workspace?</h3>
      <span class="along"> v=spf1 include:_spf.google.com ~all </span>
      <h3>What is an good SPF-Record for Microsoft 365?</h3>
      <span class="along">
        v=spf1 include:spf.protection.outlook.com -all
      </span>
    </div>

    <div class="input-container info-container">
      <li class="along">
        <p>A</p>
        <p class="along">
          Stands for including every A-Tag inside your dns, also subdomains
        </p>
      </li>
      <div class="divider">&nbsp;</div>
      <li class="along">
        <p>MX</p>
        <p class="along">Stands for including every MX-Tag inside your dns</p>
      </li>
      <div class="divider">&nbsp;</div>
      <li class="along">
        <p>~all</p>
        <p class="along">
          Stands for softfail, which means that mails outside an included
          mailserver will be delivered into spam
        </p>
      </li>
      <div class="divider">&nbsp;</div>
      <li class="along">
        <p>-all</p>
        <p class="along">
          Stands for hardfail, which means that mails outside an included
          mailserver will not be delivered
        </p>
      </li>
    </div>
    <Footer />
  </div>
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

<style scoped></style>
