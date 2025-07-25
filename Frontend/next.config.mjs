// next.config.mjs

import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})(baseConfig);
