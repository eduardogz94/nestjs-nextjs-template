!process.env.SKIP_ENV_VALIDATION && (await import("../env/server.mjs"));

const config = {
  reactStrictMode: true,
  distDir: "../../.next",
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
};
export default config;
