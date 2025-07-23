// @ts-check

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
};

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA(baseConfig);
