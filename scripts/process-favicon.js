const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const sourcePath = path.join(__dirname, "..", "under 18 image.jpeg");
const destPath = path.join(__dirname, "..", "public", "favicon.ico");

async function processFavicon() {
  try {
    if (!fs.existsSync(sourcePath)) {
      console.log("❌ Source favicon not found:", sourcePath);
      return;
    }

    // Get image metadata
    const metadata = await sharp(sourcePath).metadata();
    const { width, height } = metadata;
    
    // Calculate crop to make it square (center crop)
    const size = Math.min(width, height);
    const left = Math.floor((width - size) / 2);
    const top = Math.floor((height - size) / 2);

    // Crop to square and resize to 64x64 (favicon size)
    await sharp(sourcePath)
      .extract({ left, top, width: size, height: size })
      .resize(64, 64, {
        fit: "cover",
        position: "center",
      })
      .toFormat("png")
      .toFile(destPath.replace(".ico", ".png"));

    // Also create .ico version (though .png works fine for modern browsers)
    console.log("✅ Favicon processed and saved to public/favicon.png");
    console.log(`   Cropped from ${width}x${height} to ${size}x${size}, resized to 64x64`);
  } catch (error) {
    console.error("❌ Error processing favicon:", error.message);
    // Fallback: just copy the file
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log("⚠️  Fallback: Copied original file (not cropped/resized)");
    }
  }
}

processFavicon();
