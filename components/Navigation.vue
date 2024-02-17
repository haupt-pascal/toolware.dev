<script lang="ts" setup>
import { ref } from 'vue';

type networkNavbarItem = {
  icon: string;
  title: string;
  link: string;
}

type encoderNavbarItem = {
  icon: string;
  title: string;
  link: string;
}

const networkNavbarItems = ref <networkNavbarItem[]> ([
  {
    icon: 'ph:address-book',
    title: 'IP-Checker',
    link: '/ip-checker'
  },
  {
    icon: 'ph:address-book',
    title: 'GeoIP-Checker',
    link: '/geoip-checker'
  },
  {
    icon: 'ph:address-book',
    title: 'SPF-Checker',
    link: '/spf-checker'
  },
  {
    icon: 'ph:address-book',
    title: 'DKIM-Checker',
    link: '/dkim-checker'
  },
  {
    icon: 'ph:address-book',
    title: 'DMARC-Checker',
    link: '/dmarc-checker'
  },
  {
    icon: 'ph:address-book',
    title: 'Redirect-Checker',
    link: '/redirect-checker'
  },
  {
    icon: 'ph:address-book',
    title: 'SSL-Checker',
    link: '/ssl-checker'
  },
  {
    icon: 'ph:address-book',
    title: 'Whois-Online',
    link: '/whois'
  }
]);

const encoderNavbarItems = ref <encoderNavbarItem[]> ([
  {
    icon: 'ph:address-book',
    title: 'Base64-Encoder',
    link: '/base64-encode'
  },
  {
    icon: 'ph:address-book',
    title: 'Base64-Decoder',
    link: '/base64-decode'
  }
]);


</script>
<template>
  <nav class="sidebar">
    <div class="sidebar-logo">
      <img src="" alt="" />
    </div>
    <div class="sidebar-menu">
      <div class="sidebar-menu-category">
        <span class="sidebar-menu-category-title"> network </span>
        <ul class="sidebar-menu-list">
          <li class="sidebar-menu-item" v-for="item in networkNavbarItems" :key="item.title">
            <Icon :name="item.icon" color="white" />
            <a :href="item.link">{{ item.title }}</a>
          </li>
        </ul>
      </div>
      <div class="sidebar-menu-category">
        <span class="sidebar-menu-category-title"> encoder </span>
        <ul class="sidebar-menu-list">
          <li class="sidebar-menu-item" v-for="item in encoderNavbarItems" :key="item.title">
            <Icon :name="item.icon" color="white" />
            <a :href="item.link">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style lang="scss">
@import "@/assets/stylesheet/style";
</style>
