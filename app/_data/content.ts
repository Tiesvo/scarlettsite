export const content = {
  name: "Luna",
  title: "Model & Creator",
  tagline: "Welcome.. find my spicy links here. Will you send me a message babe?",
  ctas: [
    { label: "Telegram", href: "https://t.me/lunasmit1", brand: "telegram" },
  ],
  gallery: Array.from({ length: 19 }).map((_, i) =>
    `/gallery/${String(i + 1).padStart(3, "0")}.jpg`
  ),
};
