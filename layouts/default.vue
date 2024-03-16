<script lang="ts" setup>
import { ref } from 'vue';
import { networkNavbarItems, encoderNavbarItems, generatorNavbarItems } from '@/server/navigation'

</script>
<template>
  <Navigation />
  <Navbar />
  <div class="hero">
    <h1><span class="primary-color">Toolware</span>: your systems wingman.</h1>

    <span class="category"> Network Tools </span>
    <div class="container-row">
      <div class="container" v-for="item in networkNavbarItems" :key="item.title">
        <h2>
          {{ item.title }}
        </h2>
        <a :href="item.link">Click here</a>
      </div>
    </div>
  </div>

  <div class="hero">
    <span class="category"> Encoder Tools </span>
    <div class="container-row">
      <div class="container" v-for="item in encoderNavbarItems" :key="item.title">
        <h2>
          {{ item.title }}
        </h2>
        <a :href="item.link">Click here</a>
      </div>
    </div>
  </div>

  <div class="hero">
    <span class="category">
      Generator Tools
    </span>
    <div class="container-row">
      <div class="container" v-for="item in generatorNavbarItems" :key="item.title">
        <h2>
          {{ item.title }}
        </h2>
        <a :href="item.link">Click here</a>
      </div>
    </div>
  </div>

  <!--
  <div class="features">
    <h2>Lorem ipsum dolor</h2>

    <div class="container-row">
      <div class="container">
        <h3>Lorem ipsum</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div class="container">
        <h3>Lorem ipsum</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div class="container">
        <h3>Lorem ipsum</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
  </div>
  -->

  <Footer />
</template>
<style lang="scss">
@import "@/assets/stylesheet/style";
</style>
