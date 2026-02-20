export const content = {
  name: "Luna",
  title: "Model & Creator",
  tagline: "Welcome.. find my spicy links here. Will you send me a message babe?",
  ctas: [
    { label: "F2F", href: "https://f2f.com/s/K-Y_bC", brand: "f2f" },
    { label: "Telegram", href: "https://t.me/+dmmsSyBO5Oc0YWVk", brand: "telegram" },
  ],
  gallery: Array.from({ length: 19 }).map((_, i) =>
    `/gallery/${String(i + 1).padStart(3, "0")}.jpg`
  ),
};
