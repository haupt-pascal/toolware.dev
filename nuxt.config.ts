// https://nuxt.com/docs/api/configuration/nuxt-config
export default ({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Toolware.dev",
      htmlAttrs: {
        lang: "de",
      },
      meta: [{ charset: "utf-8" }],
    },
  },

  plugins: [{ src: "./plugins/super-matomo-plugin.client.js", ssr: false }],
  serverMiddleware: [{ path: "/api/curl", handler: "~/server/api/curl.ts" }],
});
