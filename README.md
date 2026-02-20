# Landing Page Template

Een kant-en-klare landing page template voor modellen/creators. Deze template is gebaseerd op Next.js en kan eenvoudig aangepast worden.

## 📋 Inhoudsopgave

- [Snel Starten](#snel-starten)
- [Aanpassingen](#aanpassingen)
  - [Naam Aanpassen](#naam-aanpassen)
  - [Links Aanpassen](#links-aanpassen)
  - [Foto's Aanpassen](#fotos-aanpassen)
  - [Aantal Gallery Afbeeldingen](#aantal-gallery-afbeeldingen)
- [Installatie](#installatie)
- [Development](#development)
- [Deployment](#deployment)

---

## 🚀 Snel Starten

1. Installeer dependencies: `pnpm install`
2. Start development server: `pnpm dev`
3. Open browser: `http://localhost:3000`

---

## ✏️ Aanpassingen

Alle belangrijke aanpassingen kunnen gemaakt worden in **één bestand**: `app/_data/content.ts`

### 📝 Naam Aanpassen

Open het bestand: `app/_data/content.ts`

```typescript
export const content = {
  name: "Roosje",  // ← Verander hier de naam
  title: "Model & Creator",  // ← Optioneel: verander de titel
  tagline: "Welcome.. find my spicy links here. Will you send me a message babe?",  // ← Optioneel: verander de tagline
  // ...
};
```

**Wat wordt aangepast:**
- `name`: De naam die bovenaan de pagina verschijnt (grote tekst)
- `title`: De titel die in de browser tab verschijnt (optioneel)
- `tagline`: De tekst onder de naam (optioneel)

---

### 🔗 Links Aanpassen

Open het bestand: `app/_data/content.ts`

```typescript
export const content = {
  // ...
  ctas: [
    { label: "F2F", href: "https://f2f.com/s/rwsBLJ", brand: "f2f" },  // ← Eerste CTA knop
    { label: "Telegram", href: "https://t.me/+edYXfRcYF5BmMjE0", brand: "telegram" },  // ← Tweede CTA knop
  ],
  // ...
};
```

**Hoe aan te passen:**
- `label`: De tekst op de knop (bijv. "F2F", "Telegram", "OnlyFans", etc.)
- `href`: De URL waar de knop naartoe linkt
- `brand`: Het type platform (voor het icoon). Mogelijke waarden: `"f2f"`, `"telegram"`, `"onlyfans"`, `"fanvue"`

**Voorbeeld - 3 knoppen toevoegen:**
```typescript
ctas: [
  { label: "F2F", href: "https://f2f.com/s/JOUW_LINK", brand: "f2f" },
  { label: "OnlyFans", href: "https://onlyfans.com/jouw-account", brand: "onlyfans" },
  { label: "Telegram", href: "https://t.me/+jouw_telegram_link", brand: "telegram" },
],
```

**Let op:** De volgorde in de array bepaalt de volgorde op de pagina (eerste = bovenste knop).

---

### 📸 Foto's Aanpassen

#### Profielfoto

1. Vervang het bestand: `public/profile.jpg`
   - Aanbevolen formaat: 400x400px (vierkant)
   - Formaten: JPG, PNG, of WebP
   - De foto wordt automatisch rond gemaakt

#### Achtergrondfoto

1. Vervang het bestand: `public/hero-bg.jpg`
   - Aanbevolen formaat: 1920x1080px of groter
   - Formaten: JPG, PNG, of WebP
   - Deze foto wordt gebruikt als achtergrond voor de hele pagina

#### Gallery Afbeeldingen (Bewegende Strip)

1. Vervang de bestanden in: `public/gallery/`
   - Bestandsnamen: `001.jpg`, `002.jpg`, `003.jpg`, etc.
   - Aanbevolen formaat: 400x400px (vierkant) of vergelijkbare aspect ratio
   - Formaten: JPG, PNG, of WebP
   - Deze afbeeldingen verschijnen in de bewegende strip onderaan de pagina

**Voorbeeld:**
```
public/gallery/
  ├── 001.jpg
  ├── 002.jpg
  ├── 003.jpg
  └── ... (meer afbeeldingen)
```

---

### 🔢 Aantal Gallery Afbeeldingen

Open het bestand: `app/_data/content.ts`

```typescript
export const content = {
  // ...
  gallery: Array.from({ length: 19 }).map((_, i) =>  // ← Verander 19 naar het aantal foto's
    `/gallery/${String(i + 1).padStart(3, "0")}.jpg`
  ),
};
```

**Hoe aan te passen:**
- Verander `length: 19` naar het aantal gallery afbeeldingen dat je hebt
- Zorg ervoor dat je de bijbehorende bestanden hebt in `public/gallery/` (001.jpg, 002.jpg, etc.)

**Voorbeeld - 10 afbeeldingen:**
```typescript
gallery: Array.from({ length: 10 }).map((_, i) =>
  `/gallery/${String(i + 1).padStart(3, "0")}.jpg`
),
```

---

## 📦 Installatie

### Vereisten
- Node.js 18+ 
- pnpm (of npm/yarn)

### Stappen

1. **Installeer dependencies:**
   ```bash
   pnpm install
   ```

2. **Start development server:**
   ```bash
   pnpm dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

---

## 🛠️ Development

### Beschikbare Commando's

```bash
# Development server starten
pnpm dev

# Production build maken
pnpm build

# Production server starten
pnpm start

# Code checken (linting)
pnpm lint
```

---

## 🚢 Deployment

### Vercel (Aanbevolen)

1. Push je code naar GitHub
2. Ga naar [Vercel](https://vercel.com)
3. Import je repository
4. Vercel detecteert automatisch Next.js en configureert alles
5. Klaar! Je site is live

### Andere Platforms

Deze template werkt ook op:
- Netlify
- AWS Amplify
- Railway
- Elke andere platform dat Next.js ondersteunt

---

## 📁 Project Structuur

```
landing-page-template/
├── app/
│   ├── _data/
│   │   └── content.ts          ← ALLE AANPASSINGEN HIER!
│   ├── (components)/
│   │   ├── CTAButton.tsx
│   │   ├── BrandBadge.tsx
│   │   └── MarqueeStrip.tsx
│   ├── page.tsx                 ← Hoofdpagina
│   └── layout.tsx
├── public/
│   ├── profile.jpg              ← Profielfoto
│   ├── hero-bg.jpg              ← Achtergrondfoto
│   └── gallery/                 ← Gallery afbeeldingen
│       ├── 001.jpg
│       ├── 002.jpg
│       └── ...
└── README.md                    ← Dit bestand
```

---

## ❓ Veelgestelde Vragen

### Hoe voeg ik een extra CTA knop toe?

Voeg een nieuwe entry toe aan de `ctas` array in `app/_data/content.ts`:

```typescript
ctas: [
  { label: "F2F", href: "...", brand: "f2f" },
  { label: "Telegram", href: "...", brand: "telegram" },
  { label: "OnlyFans", href: "...", brand: "onlyfans" },  // ← Nieuwe knop
],
```

### Welke brand types zijn beschikbaar?

- `"f2f"` - F2F logo
- `"telegram"` - Telegram logo
- `"onlyfans"` - OnlyFans logo
- `"fanvue"` - Fanvue logo

### Kan ik de tagline aanpassen?

Ja! Pas `tagline` aan in `app/_data/content.ts`. Het woord "spicy" wordt automatisch rood gemaakt.

### Hoe verander ik de achtergrond overlay kleur?

Open `app/page.tsx` en zoek naar:
```tsx
style={{ backgroundColor: "rgba(236, 255, 220, 0.5)" }}
```

Pas de RGBA waarden aan naar je voorkeur.

---

## 📝 Notities

- Alle belangrijke aanpassingen gebeuren in `app/_data/content.ts`
- Foto's moeten in de `public/` folder staan
- Gallery afbeeldingen moeten genummerd zijn: 001.jpg, 002.jpg, etc.
- De pagina is volledig responsive (werkt op mobiel, tablet en desktop)

---

**Veel succes met je landing page! 🎉**
