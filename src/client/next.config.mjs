/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("../env/server.mjs"));

const config = {
  reactStrictMode: true,
  distDir: "../../.next",
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
  eslint: {
    dirs: ["./src/client"],
  },
};
export default config;
