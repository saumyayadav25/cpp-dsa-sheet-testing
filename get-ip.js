// Run this script to get your current IP address for MongoDB Atlas whitelisting
// Usage: node get-ip.js

const https = require('https');

console.log('🔍 Getting your current IP address for MongoDB Atlas whitelisting...\n');

// Get IP from multiple services for reliability
const ipServices = [
  'https://api.ipify.org',
  'https://ipinfo.io/ip',
  'https://icanhazip.com'
];

async function getIP(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data.trim()));
    }).on('error', reject);
  });
}

async function getAllIPs() {
  console.log('📡 Checking IP addresses from multiple services:\n');
  
  for (const service of ipServices) {
    try {
      const ip = await getIP(service);
      console.log(`✅ ${service}: ${ip}`);
    } catch (error) {
      console.log(`❌ ${service}: Failed to get IP`);
    }
  }
  
  console.log('\n📋 Steps to whitelist your IP in MongoDB Atlas:');
  console.log('1. Go to https://cloud.mongodb.com/');
  console.log('2. Select your project');
  console.log('3. Go to "Network Access" in the left sidebar');
  console.log('4. Click "Add IP Address"');
  console.log('5. Add the IP address shown above');
  console.log('6. Or add 0.0.0.0/0 to allow access from anywhere (less secure)');
  console.log('\n⚠️  Note: It may take a few minutes for the changes to take effect.');
}

getAllIPs().catch(console.error);