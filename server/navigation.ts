import { ref } from "vue";

type networkNavbarItem = {
  icon: string;
  title: string;
  link: string;
};

type encoderNavbarItem = {
  icon: string;
  title: string;
  link: string;
};

type generatorNavbarItem = {
  icon: string;
  title: string;
  link: string;
};

type developmentNavbarItem = {
    icon: string;
    title: string;
    link: string;
}

type navbarItems = {
  category: string;
  icon: string;
  title: string;
  link: string;
}

const generatorNavbarItems = ref<generatorNavbarItem[]>([
  {
    icon: "ph:exam",
    title: "Lorem-Ipsum",
    link: "/generator/lorem-ipsum",
  },
  {
    icon: "ph:key",
    title: "Password-Gen",
    link: "/generator/password-generator",
  },
  {
    icon: "ph:export",
    title: "Random-Port-Gen",
    link: "/generator/random-port-generator",
  },
  {
    icon:"ph:key",
    title: "Chmod-Gen",
    link:"/generator/chmod-generator"
  }
]);

const developmentNavbarItems = ref<developmentNavbarItem[]>([
  {
    icon: "ph:file",
    title: "JSON Validator",
    link: "/development/json-validator",
  },
  {
    icon: "ph:file",
    title: "XML Validator",
    link: "/development/xml-validator",
  }
]);

const networkNavbarItems = ref<networkNavbarItem[]>([
  {
    icon: "ph:address-book",
    title: "IP-Checker",
    link: "/network/ip-checker",
  },
  {
    icon: "ph:map-pin",
    title: "GeoIP-Checker",
    link: "/network/geoip-checker",
  },
  {
    icon: "ph:smiley-x-eyes",
    title: "AbuseIP-Checker",
    link: "/network/abuse-ip",
  },
  {
    icon: "ph:smiley-x-eyes",
    title: "DNSBL-Checker",
    link: "/network/dnsbl-check",
  },
  {
    icon: "ph:key",
    title: "SPF-Checker",
    link: "/network/spf-checker",
  },
  {
    icon: "ph:key",
    title: "DKIM-Checker",
    link: "/network/dkim-checker",
  },
  {
    icon: "ph:key",
    title: "DMARC-Checker",
    link: "/network/dmarc-checker",
  },
  {
    icon: "ph:user-switch",
    title: "Redirect-Checker",
    link: "/network/redirect-checker",
  },
  {
    icon: "ph:key",
    title: "SSL-Checker",
    link: "/network/ssl-checker",
  },
  {
    icon: "ph:question",
    title: "Online Ping",
    link: "/network/online-ping",
  },
  /*
  {
    icon: "ph:question",
    title: "Traceroute",
    link: "/network/traceroute",
  }
  */
]);

const encoderNavbarItems = ref<encoderNavbarItem[]>([
  {
    icon: "ph:key",
    title: "Base64-Encoder",
    link: "/encoder/base64-encode",
  },
  {
    icon: "ph:key",
    title: "Base64-Decoder",
    link: "/encoder/base64-decode",
  },
]);

export { networkNavbarItems, encoderNavbarItems, generatorNavbarItems, developmentNavbarItems };