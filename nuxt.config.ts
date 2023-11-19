// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    devProxy: {
      "/api/": {
        target: "https://api.redirect-checker.net/",
        //Headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', },
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
});
