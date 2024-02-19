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

const networkNavbarItems = ref<networkNavbarItem[]>([
  {
    icon: "ph:address-book",
    title: "IP-Checker",
    link: "/ip-checker",
  },
  {
    icon: "ph:map-pin",
    title: "GeoIP-Checker",
    link: "/geoip-checker",
  },
  {
    icon: "ph:key",
    title: "SPF-Checker",
    link: "/spf-checker",
  },
  {
    icon: "ph:key",
    title: "DKIM-Checker",
    link: "/dkim-checker",
  },
  {
    icon: "ph:key",
    title: "DMARC-Checker",
    link: "/dmarc-checker",
  },
  {
    icon: "ph:user-switch",
    title: "Redirect-Checker",
    link: "/redirect-checker",
  },
  {
    icon: "ph:key",
    title: "SSL-Checker",
    link: "/ssl-checker",
  },
  {
    icon: "ph:question",
    title: "Online Ping",
    link: "/online-ping",
  }
]);

const encoderNavbarItems = ref<encoderNavbarItem[]>([
  {
    icon: "ph:key",
    title: "Base64-Encoder",
    link: "/base64-encode",
  },
  {
    icon: "ph:key",
    title: "Base64-Decoder",
    link: "/base64-decode",
  },
]);

export { networkNavbarItems, encoderNavbarItems };