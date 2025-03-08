<script lang="ts" setup>
import {ref} from "vue";

const xmlInput = ref('');
const errorMessage = ref('');

const validateXML = () => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlInput.value, "text/xml");
    if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
      errorMessage.value = xmlDoc.getElementsByTagName("parsererror")[0].innerHTML;
    } else {
      errorMessage.value = '✅ Valid XML';
    }
  } catch (error) {
    errorMessage.value = `${(error as Error).message}`;
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
    <Navigation/>
    <Navbar/>
    <h1>JSON Validator</h1>
    <div class="input-container">
        <textarea
            v-model="xmlInput"
            placeholder="Enter XML here"
            type="text"
            @keyup.enter="validateXML"
        />

      <div v-if="errorMessage !== null && errorMessage !== ''" class="result-container">
        <div class="result">
          <div v-if="errorMessage != '✅ Valid XML'">
            <h3 style="width: 100%; margin-top: 0;">❌ Error in XML found:</h3>
          </div>
          <span>{{ errorMessage }}</span>
        </div>
        <div class="button-container">
          <a class="button-container-button" @click="copyToClipboard(errorMessage)"
          >Copy</a
          >
        </div>
      </div>
      <button @click="validateXML">Validate</button>
      <Footer/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/stylesheet/style";
</style>