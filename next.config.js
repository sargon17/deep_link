/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  tailwindcss: {
    config: "./tailwind.config.js",
    // cssPath: "./styles/tailwind.css",
    exposeConfig: false,
  },
};

module.exports = nextConfig;
