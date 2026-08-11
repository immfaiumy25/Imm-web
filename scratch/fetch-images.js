const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const urls = [
  { url: 'https://share.google/ldoJxY0qIybghHsc9', name: 'berita-1' },
  { url: 'https://rri.co.id/yogyakarta/budaya/2590526/dahlan-culture-festival-2026-perkuat-dakwah-kultural-lewat-sastra-profetik?nocache=true', name: 'berita-2' },
  { url: 'https://wartaptm.id/imm-fai-umy-luncurkan-majalah-bahlil-angkat-isu-perempuan-lewat-studium-generale/', name: 'berita-3' }
];

const fetchHtml = (urlStr) => {
  return new Promise((resolve, reject) => {
    const client = urlStr.startsWith('https') ? https : http;
    client.get(urlStr, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const urlObj = new URL(urlStr);
          redirectUrl = urlObj.origin + redirectUrl;
        }
        console.log(`Redirecting to ${redirectUrl}`);
        resolve(fetchHtml(redirectUrl));
        return;
      }
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
};

const downloadImage = (urlStr, filepath) => {
  return new Promise((resolve, reject) => {
    const client = urlStr.startsWith('https') ? https : http;
    client.get(urlStr, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const urlObj = new URL(urlStr);
          redirectUrl = urlObj.origin + redirectUrl;
        }
        resolve(downloadImage(redirectUrl, filepath));
        return;
      }
      
      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filepath);
      });
    }).on('error', reject);
  });
};

async function main() {
  const destDir = path.join('c:', 'Users', 'Davin', 'Documents', 'Project', 'Client', 'imm', 'public', 'berita');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  for (const item of urls) {
    try {
      console.log(`Fetching HTML for ${item.name}...`);
      const html = await fetchHtml(item.url);
      
      // Look for og:image
      const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i) || 
                           html.match(/<meta\s+content=["'](.*?)["']\s+property=["']og:image["']/i);
      
      let imgUrl = null;
      if (ogImageMatch && ogImageMatch[1]) {
        imgUrl = ogImageMatch[1];
      } else {
        // Fallback: look for first img tag
        const imgMatch = html.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
        if (imgMatch && imgMatch[1]) {
          imgUrl = imgMatch[1];
        }
      }

      if (imgUrl) {
        console.log(`Found image URL for ${item.name}: ${imgUrl}`);
        // Handle relative URLs just in case
        if (imgUrl.startsWith('/')) {
            const urlObj = new URL(item.url);
            imgUrl = urlObj.origin + imgUrl;
        }
        
        let ext = '.jpg';
        if (imgUrl.toLowerCase().includes('.png')) ext = '.png';
        if (imgUrl.toLowerCase().includes('.webp')) ext = '.webp';
        
        const filepath = path.join(destDir, item.name + ext);
        await downloadImage(imgUrl, filepath);
        console.log(`Saved image to ${filepath}`);
      } else {
        console.log(`No image found for ${item.name}`);
      }
    } catch (e) {
      console.error(`Error processing ${item.name}:`, e.message);
    }
  }
}

main();
