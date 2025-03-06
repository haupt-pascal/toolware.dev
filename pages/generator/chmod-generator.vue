<script lang="ts" setup>
import { ref } from "vue";

const permissions = ref({
  owner: { read: true, write: true, execute: true },
  group: { read: true, write: true, execute: true },
  others: { read: true, write: true, execute: true },
});

const filename = ref("");

const calculateOctal = (perm: {
  read: boolean;
  write: boolean;
  execute: boolean;
}
) => {
  return (
      (perm.read ? 4 : 0) +
      (perm.write ? 2 : 0) +
      (perm.execute ? 1 : 0)
  );
};

const chmodValue = computed(() => {
  return (
      calculateOctal(permissions.value.owner).toString() +
      calculateOctal(permissions.value.group).toString() +
      calculateOctal(permissions.value.others).toString()
  );
});

const copyToClipboard = (text: string) => {
  try {
      navigator.clipboard.writeText(text);
  } catch (error) {
      console.error("Error while copying to clipboard:", error);
  }
};
</script>

<template>
    <div class="app">
      <Navigation />
      <Navbar />
      <h1>Chmod Generator</h1>
      <div class="input-container">
        <div class="options-group">
          <div class="options-chmod">
            <label>
              <input type="checkbox" v-model="permissions.owner.read" />
              Owner Read
            </label>
            <label>
              <input type="checkbox" v-model="permissions.owner.write" />
              Owner Write
            </label>
            <label>
              <input type="checkbox" v-model="permissions.owner.execute" />
              Owner Execute
            </label>
          </div>
          <div class="options-chmod">
            <label>
              <input type="checkbox" v-model="permissions.group.read" />
              Group Read
            </label>
            <label>
              <input type="checkbox" v-model="permissions.group.write" />
              Group Write
            </label>
            <label>
              <input type="checkbox" v-model="permissions.group.execute" />
              Group Execute
            </label>
          </div>
          <div class="options-chmod">
            <label>
              <input type="checkbox" v-model="permissions.others.read" />
              Others Read
            </label>
            <label>
              <input type="checkbox" v-model="permissions.others.write" />
              Others Write
            </label>
            <label>
              <input type="checkbox" v-model="permissions.others.execute" />
              Others Execute
            </label>
          </div>
        </div>

        <div class="input-container">
          <input
            type="text"
            id="filename"
            v-model="filename"
            placeholder="Enter filename"
          />
        </div>

        <div class="result-container" v-if="chmodValue !== null && chmodValue !== ''">
          <h2>Result:</h2>
          <div class="result">
            <span>
              chmod {{ chmodValue }} {{ filename }}
            </span>
          </div>
          <div class="button-container">
            <a class="button-container-button" @click="copyToClipboard(chmodValue)"
              >Copy</a
            >
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </template>