<template>
  <!--
    <div class="navigation">
        <a href="/">home</a>
        <a href="/base64-encode">base64-encode</a>
        <a href="/base64-decode">base64-decode</a>
        <a href="/ip-checker">ip-checker</a>
        <a href="/ssl-checker">ssl-checker</a>
        <a href="/redirect-checker">redirect-checker</a>
        <a href="/spf-checker">spf-checker</a>
        <a href="/dkim-checker">dkim-checker</a>
        <a href="/whois">whois-online</a>
    </div>
    -->
  <nav class="main-navigation">
    <ul class="menu">
      <li><a href="/">Home</a></li>
      <li class="menu-item-has-children">
        <a href="#">NET-Tools</a>
        <ul class="sub-menu">
          <li><a href="/ip-checker">IP-Checker</a></li>
          <li><a href="/spf-checker">SPF-Checker</a></li>
          <li><a href="/dkim-checker">DKIM-Checker</a></li>
          <li><a href="/dmarc-checker">DMARC-Checker</a></li>
          <li><a href="/ssl-checker">SSL-Checker</a></li>
          <li><a href="/whois">Whois-Online</a></li>
        </ul>
      </li>
      <li class="menu-item-has-children">
        <a href="#">encoder-tools</a>
        <ul class="sub-menu">
          <li><a href="/base64-encode">base64-encoder</a></li>
          <li><a href="/base64-decode">base64-decoder</a></li>
        </ul>
      </li>
      <li><a href="#">Placeholder</a></li>
    </ul>
  </nav>
</template>
<style lang="scss">
@import "@/assets/stylesheet/style";
</style>
