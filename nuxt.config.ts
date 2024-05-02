// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
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

  serverMiddleware: [
    { path: "/api/curl", handler: "~/server/api/curl.ts" },
    { path: "/api/abuse-ip", handler: "~/server/api/abuse-ip.ts" },
  ],
  modules: ["nuxt-icon"],
  runtimeConfig: {
    public: {
      abuse: process.env.ABUSE_IP_DB,
    }
  }
};
