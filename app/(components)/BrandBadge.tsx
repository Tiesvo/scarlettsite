import Image from "next/image";

type Brand = "telegram" | "onlyfans" | "f2f" | "fanvue";

const brandBg: Record<Brand, string> = {
  telegram: "#229ED9",
  onlyfans: "#00AEF0",
  f2f: "#6C5CE7", // replace if you have the official color
  fanvue: "#00C16A",
};

export default function BrandBadge({ brand }: { brand: Brand }) {
  // Special handling for OnlyFans and Fanvue with colored borders
  const isOnlyFans = brand === "onlyfans";
  const isFanvue = brand === "fanvue";
  
  const getBadgeStyle = () => {
    if (isOnlyFans) {
      return {
        backgroundColor: "#ffffff",
        border: `2px solid ${brandBg[brand]}`,
      };
    }
    if (isFanvue) {
      return {
        backgroundColor: "#ffffff", // White background
        border: `2px solid ${brandBg[brand]}`, // Green border matching the image
      };
    }
    if (brand === "f2f") {
      return {
        backgroundColor: "#ffffff", // White background
        border: `2px solid ${brandBg[brand]}`, // Purple border matching the image (#6C5CE7)
      };
    }
    return {
      backgroundColor: brandBg[brand],
    };
  };

  return (
    <span
      className="inline-grid size-7 place-items-center rounded-full overflow-hidden"
      style={getBadgeStyle()}
      aria-hidden
    >
      {brand === "telegram" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
          <path d="M9.04 15.49 8.9 19.4c.41 0 .59-.18.8-.4l1.93-1.85 4 2.93c.73.4 1.26.19 1.46-.67l2.65-12.41h0c.24-1.13-.41-1.57-1.12-1.3L3.7 9.14c-1.1.43-1.09 1.05-.19 1.33l4.28 1.34 9.95-6.28c.47-.3.9-.14.55.16" />
        </svg>
      )}
      {brand === "onlyfans" && (
        <div className="relative w-full h-full" style={{ transform: "scale(1.15)" }}>
          <Image
            src="/icons/onlyfans.png"
            alt="OnlyFans"
            fill
            className="object-contain"
            sizes="28px"
          />
        </div>
      )}
      {brand === "f2f" && (
        <div className="relative w-full h-full" style={{ transform: "scale(1.15)" }}>
          <Image
            src="/icons/f2f.png"
            alt="F2F"
            fill
            className="object-contain"
            sizes="28px"
            style={{
              imageRendering: "crisp-edges",
              filter: "contrast(1.1) saturate(1.1)",
            }}
          />
        </div>
      )}
      {brand === "fanvue" && (
        <div className="relative w-full h-full" style={{ transform: "scale(1.15)" }}>
          <Image
            src="/icons/fanvue.png"
            alt="Fanvue"
            fill
            className="object-contain"
            sizes="28px"
          />
        </div>
      )}
    </span>
  );
}
