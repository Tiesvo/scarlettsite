const fs = require("fs");
const path = require("path");

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, "..", "public");
const galleryDir = path.join(publicDir, "gallery");

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true });
}

// Generate hero background placeholder (1920x1080)
const heroBgSvg = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#grad1)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.3">Hero Background</text>
</svg>`;

// Generate profile placeholder (400x400)
const profileSvg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f093fb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f5576c;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="200" cy="200" r="200" fill="url(#grad2)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="32" fill="white" text-anchor="middle" dominant-baseline="middle">Profile</text>
</svg>`;

// Generate gallery placeholders (400x400)
const generateGallerySvg = (num) => {
  const colors = [
    ["#667eea", "#764ba2"],
    ["#f093fb", "#f5576c"],
    ["#4facfe", "#00f2fe"],
    ["#43e97b", "#38f9d7"],
    ["#fa709a", "#fee140"],
  ];
  const [color1, color2] = colors[num % colors.length];
  return `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad${num}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#grad${num})"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.8">${String(num).padStart(3, "0")}</text>
  </svg>`;
};

// Generate OG image placeholder (1200x630)
const ogSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradOg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#gradOg)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.8">OG Image</text>
</svg>`;

// Write files
fs.writeFileSync(path.join(publicDir, "hero-bg.jpg"), heroBgSvg);
fs.writeFileSync(path.join(publicDir, "profile.jpg"), profileSvg);
fs.writeFileSync(path.join(publicDir, "og.jpg"), ogSvg);

// Generate 20 gallery images
for (let i = 1; i <= 20; i++) {
  const filename = `${String(i).padStart(3, "0")}.jpg`;
  fs.writeFileSync(path.join(galleryDir, filename), generateGallerySvg(i));
}

console.log("✅ Placeholder images generated!");
console.log("📁 Files created:");
console.log("   - public/hero-bg.jpg");
console.log("   - public/profile.jpg");
console.log("   - public/og.jpg");
console.log("   - public/gallery/001.jpg through 020.jpg");
console.log("\n⚠️  Note: These are SVG files with .jpg extension.");
console.log("   Replace them with actual JPG/PNG images for production.");



