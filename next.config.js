/** @type {import('next').NextConfig} */

import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";
const isProduction = process.env.NODE_ENV === "production";

const path = require("path");

const nextConfig = withPWA({
  dest: "public",
  disable: !isProduction,
  runtimeCaching,
})({
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
});

module.exports = nextConfig;
