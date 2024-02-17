<script lang="ts" setup>
const currentYear = new Date().getFullYear();
</script>
<template>
  <div class="footer">
    <div class="footer-top">
      <p>
        &copy; 2022 - {{ currentYear }} Pascal Haupt -
        <a href="https://haupt.design">haupt.design</a>
      </p>
    </div>
    <div class="footer-bottom">
      <a href="/imprint">Imprint</a>
      <a href="/privacy">Privacy</a>
    </div>
  </div>
</template>
<style lang="scss">
@import "@/assets/stylesheet/style";
</style>
