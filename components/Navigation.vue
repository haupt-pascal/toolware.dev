<script lang="ts" setup>
import {
  networkNavbarItems,
  encoderNavbarItems,
  generatorNavbarItems,
  developmentNavbarItems,
  dnsNavbarItem, systemNavbarItem
} from '@/server/navigation'

</script>
<template>
  <nav class="sidebar">
    <div class="sidebar-logo">
      <a href="/">
      <img src="@/assets/images/toolware2-03.png" alt="logo" />
      </a>
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
      <div class="sidebar-menu-category">
        <span class="sidebar-menu-category-title"> generator </span>
        <ul class="sidebar-menu-list">
          <li class="sidebar-menu-item" v-for="item in generatorNavbarItems" :key="item.title">
            <Icon :name="item.icon" color="white" />
            <a :href="item.link">{{ item.title }}</a>
          </li>
        </ul>
      </div>
      <div class="sidebar-menu-category">
        <span class="sidebar-menu-category-title"> development </span>
        <ul class="sidebar-menu-list">
          <li class="sidebar-menu-item" v-for="item in developmentNavbarItems" :key="item.title">
            <Icon :name="item.icon" color="white" />
            <a :href="item.link">{{ item.title }}</a>
          </li>
        </ul>
      </div>
      <div class="sidebar-menu-category">
        <span class="sidebar-menu-category-title"> dns </span>
        <ul class="sidebar-menu-list">
          <li class="sidebar-menu-item" v-for="item in dnsNavbarItem" :key="item.title">
            <Icon :name="item.icon" color="white" />
            <a :href="item.link">{{ item.title }}</a>
          </li>
        </ul>
      </div>
      <div class="sidebar-menu-category">
        <span class="sidebar-menu-category-title"> system </span>
        <ul class="sidebar-menu-list">
          <li class="sidebar-menu-item" v-for="item in systemNavbarItem" :key="item.title">
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
