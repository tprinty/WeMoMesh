# WeMoMesh Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page community website for the West Mobile Meshtastic network using Astro + Tailwind, deployed via GitHub Actions to Apache on webdev.

**Architecture:** One scrollable Astro page with 7 content sections. Astro builds to static HTML/CSS/JS in `dist/`. The GitHub Actions workflow (self-hosted runner `webdev-wemomesh`) builds on push to `main` and copies `dist/` to `/var/www/westmobile-mesh/` directly on webdev.

**Tech Stack:** Astro 5, Tailwind CSS 4, self-hosted GitHub Actions runner, Apache 2 on webdev (192.168.2.20)

**Meshtastic Brand Colors:**
- Primary green: `#1a8a50`
- Light green accent: `#67ea94`
- Dark background: `#0f1117`
- Surface: `#1a1d27`
- Text: `#e2e8f0`

---

### Task 1: Scaffold Astro Project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`
- Create: `src/pages/index.astro`
- Create: `src/layouts/Base.astro`

**Step 1: Initialize Astro project**

```bash
cd /home/tprinty/src/WeMoMesh
npm create astro@latest . -- --template minimal --no-git --install --typescript strict
```

Expected: Astro scaffolded with `src/pages/index.astro`, `package.json`, etc.

**Step 2: Add Tailwind integration**

```bash
npx astro add tailwind --yes
```

Expected: `tailwind.config.mjs` created, `astro.config.mjs` updated.

**Step 3: Configure Astro for static output**

Edit `astro.config.mjs`:
```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
});
```

**Step 4: Configure Tailwind with Meshtastic colors**

Edit `tailwind.config.mjs`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        mesh: {
          green: '#1a8a50',
          'green-light': '#67ea94',
          bg: '#0f1117',
          surface: '#1a1d27',
          text: '#e2e8f0',
          muted: '#94a3b8',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

**Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: Server running at `http://localhost:4321`, no errors.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro + Tailwind project with Meshtastic color theme"
```

---

### Task 2: Base Layout

**Files:**
- Create: `src/layouts/Base.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create Base layout**

Create `src/layouts/Base.astro`:
```astro
---
export interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'West Mobile Mesh — Off-Grid Communication for Mobile County',
  description = 'Community Meshtastic network for West Mobile and Semmes, Alabama. No cell service needed.',
} = Astro.props;
---
<!doctype html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body class="bg-mesh-bg text-mesh-text font-['Inter',sans-serif] antialiased">
    <slot />
  </body>
</html>
```

**Step 2: Wire index.astro to Base layout**

Replace `src/pages/index.astro` contents:
```astro
---
import Base from '../layouts/Base.astro';
---
<Base>
  <main>
    <p class="text-mesh-green p-8">Layout working</p>
  </main>
</Base>
```

**Step 3: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:4321` — expect dark background, green text "Layout working".

**Step 4: Commit**

```bash
git add src/layouts/Base.astro src/pages/index.astro
git commit -m "feat: add Base layout with dark theme and Inter/JetBrains Mono fonts"
```

---

### Task 3: Navigation & Hero Section

**Files:**
- Create: `src/components/Nav.astro`
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create Nav component**

Create `src/components/Nav.astro`:
```astro
---
const links = [
  { href: '#about', label: 'About' },
  { href: '#wemobot', label: 'WeMoBot' },
  { href: '#emergency', label: 'Emergency' },
  { href: '#get-started', label: 'Get Started' },
  { href: '#community', label: 'Community' },
];
---
<nav class="fixed top-0 w-full z-50 bg-mesh-bg/90 backdrop-blur border-b border-mesh-green/20">
  <div class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
    <a href="#" class="flex items-center gap-2 font-mono text-mesh-green font-semibold text-sm">
      <span class="text-lg">⬡</span> WeMoMesh
    </a>
    <ul class="hidden md:flex gap-6">
      {links.map(l => (
        <li>
          <a href={l.href} class="text-sm text-mesh-muted hover:text-mesh-green transition-colors">
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</nav>
```

**Step 2: Create Hero component**

Create `src/components/Hero.astro`:
```astro
---
---
<section class="min-h-screen flex items-center pt-14">
  <div class="max-w-5xl mx-auto px-4 py-24">
    <div class="inline-flex items-center gap-2 bg-mesh-green/10 border border-mesh-green/30 rounded-full px-4 py-1.5 mb-8">
      <span class="w-2 h-2 bg-mesh-green rounded-full animate-pulse"></span>
      <span class="text-mesh-green font-mono text-xs">MESH ACTIVE · SEMMES + WEST MOBILE</span>
    </div>

    <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-6">
      West Mobile Mesh<br />
      <span class="text-mesh-green">off-grid communication</span><br />
      for Mobile County
    </h1>

    <p class="text-xl text-mesh-muted max-w-2xl mb-10">
      No cell service. No license. No monthly fees.<br />
      Just text your neighbors.
    </p>

    <div class="flex flex-wrap gap-4">
      <a
        href="#get-started"
        class="bg-mesh-green text-white font-semibold px-6 py-3 rounded-lg hover:bg-mesh-green/90 transition-colors"
      >
        Get Started →
      </a>
      <a
        href="#about"
        class="border border-mesh-green/40 text-mesh-green px-6 py-3 rounded-lg hover:border-mesh-green transition-colors"
      >
        Learn More
      </a>
    </div>
  </div>
</section>
```

**Step 3: Add Nav and Hero to index.astro**

```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
---
<Base>
  <Nav />
  <main>
    <Hero />
  </main>
</Base>
```

**Step 4: Verify in browser — check mobile too**

Open `http://localhost:4321`, resize to mobile width. Expect: sticky nav, hero headline, CTA buttons.

**Step 5: Commit**

```bash
git add src/components/Nav.astro src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add sticky nav and hero section"
```

---

### Task 4: About & WeMoBot Sections

**Files:**
- Create: `src/components/About.astro`
- Create: `src/components/WeMoBot.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create About component**

Create `src/components/About.astro`:
```astro
---
---
<section id="about" class="py-24 border-t border-white/5">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-bold mb-4">What is this?</h2>
    <p class="text-mesh-muted text-lg mb-12 max-w-2xl">
      Meshtastic is an open-source, off-grid mesh network built on affordable LoRa radios.
      Devices communicate directly with each other — no cell towers, no internet, no infrastructure.
    </p>

    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-mesh-surface rounded-xl p-6 border border-white/5">
        <div class="text-mesh-green text-2xl mb-3">📡</div>
        <h3 class="font-semibold mb-2">915 MHz LoRa</h3>
        <p class="text-mesh-muted text-sm">Long-range radio in the US ISM band. No license required.</p>
      </div>
      <div class="bg-mesh-surface rounded-xl p-6 border border-white/5">
        <div class="text-mesh-green text-2xl mb-3">🔋</div>
        <h3 class="font-semibold mb-2">Solar-Powered Repeaters</h3>
        <p class="text-mesh-muted text-sm">Our relay nodes run on solar + battery — independent of the grid.</p>
      </div>
      <div class="bg-mesh-surface rounded-xl p-6 border border-white/5">
        <div class="text-mesh-green text-2xl mb-3">🗺️</div>
        <h3 class="font-semibold mb-2">Semmes → West Mobile</h3>
        <p class="text-mesh-muted text-sm">Coverage expanding across the western end of Mobile County.</p>
      </div>
    </div>

    <blockquote class="mt-12 border-l-4 border-mesh-green pl-6 text-xl text-mesh-muted italic">
      "It's like a neighborhood group chat that works when the towers don't."
    </blockquote>
  </div>
</section>
```

**Step 2: Create WeMoBot component**

Create `src/components/WeMoBot.astro`:
```astro
---
const commands = [
  { cmd: '#weather', desc: 'Daily forecast — high/low, rain chance, sunrise' },
  { cmd: '#alerts', desc: 'NWS storm warnings within 5 minutes' },
  { cmd: '#tropics', desc: 'Hurricane advisories and tropical storm tracking' },
  { cmd: '#nodes', desc: "Who's online on the mesh right now" },
  { cmd: '#moon', desc: 'Moon phase and rise/set times (no internet needed)' },
  { cmd: '#sun', desc: 'Sunrise/sunset computed locally' },
  { cmd: '#help', desc: 'Full command list' },
];
---
<section id="wemobot" class="py-24 border-t border-white/5">
  <div class="max-w-5xl mx-auto px-4">
    <div class="flex items-start gap-4 mb-4">
      <div>
        <h2 class="text-3xl font-bold">WeMoBot</h2>
        <p class="text-mesh-muted font-mono text-sm mt-1">node !da408150 · online 24/7</p>
      </div>
    </div>
    <p class="text-mesh-muted text-lg mb-10 max-w-2xl">
      Our always-on mesh utility bot. Send it a command on channel 0 and it responds directly.
      It also auto-broadcasts a daily 7am forecast and instant NWS severe weather alerts.
    </p>

    <div class="grid md:grid-cols-2 gap-3">
      {commands.map(({ cmd, desc }) => (
        <div class="bg-mesh-surface rounded-lg px-5 py-4 border border-white/5 flex gap-4 items-start">
          <code class="text-mesh-green font-mono text-sm shrink-0 pt-0.5">{cmd}</code>
          <span class="text-mesh-muted text-sm">{desc}</span>
        </div>
      ))}
    </div>

    <p class="mt-6 text-sm text-mesh-muted">
      Auto-broadcasts: daily forecast at <span class="text-mesh-text">7:00 AM CT</span> · instant severe weather alerts anytime.
    </p>
  </div>
</section>
```

**Step 3: Add to index.astro**

```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import WeMoBot from '../components/WeMoBot.astro';
---
<Base>
  <Nav />
  <main>
    <Hero />
    <About />
    <WeMoBot />
  </main>
</Base>
```

**Step 4: Verify in browser**

Scroll through About and WeMoBot sections. Check command list renders cleanly on mobile.

**Step 5: Commit**

```bash
git add src/components/About.astro src/components/WeMoBot.astro src/pages/index.astro
git commit -m "feat: add About and WeMoBot sections"
```

---

### Task 5: Emergency & Getting Started Sections

**Files:**
- Create: `src/components/Emergency.astro`
- Create: `src/components/GettingStarted.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create Emergency component**

Create `src/components/Emergency.astro`:
```astro
---
---
<section id="emergency" class="py-24 border-t border-white/5">
  <div class="max-w-5xl mx-auto px-4">
    <div class="bg-mesh-green/5 border border-mesh-green/20 rounded-2xl p-8 md:p-12">
      <h2 class="text-3xl font-bold mb-4">Emergency Communications</h2>
      <p class="text-mesh-muted text-lg mb-8 max-w-2xl">
        On the Gulf Coast, emergencies are a question of when, not if.
        Hurricanes, tornadoes, ice storms — they all have one thing in common:
        <span class="text-mesh-text font-medium">the cell towers go down first.</span>
      </p>

      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="flex gap-3">
          <span class="text-mesh-green text-xl shrink-0">🌀</span>
          <div>
            <h3 class="font-semibold mb-1">Hurricanes</h3>
            <p class="text-mesh-muted text-sm">WeMoBot pushes NWS tropical advisories automatically — no request needed.</p>
          </div>
        </div>
        <div class="flex gap-3">
          <span class="text-mesh-green text-xl shrink-0">⚡</span>
          <div>
            <h3 class="font-semibold mb-1">Severe Weather</h3>
            <p class="text-mesh-muted text-sm">Tornado warnings and severe thunderstorm alerts broadcast the moment NWS issues them.</p>
          </div>
        </div>
        <div class="flex gap-3">
          <span class="text-mesh-green text-xl shrink-0">☀️</span>
          <div>
            <h3 class="font-semibold mb-1">Solar + Battery Backup</h3>
            <p class="text-mesh-muted text-sm">Repeater nodes run on solar power with battery backup — independent of the grid.</p>
          </div>
        </div>
        <div class="flex gap-3">
          <span class="text-mesh-green text-xl shrink-0">📻</span>
          <div>
            <h3 class="font-semibold mb-1">No Infrastructure Required</h3>
            <p class="text-mesh-muted text-sm">Devices talk directly to each other. No towers, no internet, no single point of failure.</p>
          </div>
        </div>
      </div>

      <blockquote class="text-lg font-medium text-mesh-green border-l-4 border-mesh-green pl-4">
        "When the cell towers go down — and they do — the mesh stays up."
      </blockquote>
    </div>
  </div>
</section>
```

**Step 2: Create GettingStarted component**

Create `src/components/GettingStarted.astro`:
```astro
---
const radios = [
  { name: 'Heltec WiFi LoRa 32 v3', price: '~$20', note: 'Budget pick, small form factor' },
  { name: 'LILYGO T-Beam', price: '~$35', note: 'Built-in GPS, popular all-rounder' },
  { name: 'RAK WisBlock Meshtastic Starter', price: '~$40', note: 'Modular, good for fixed nodes' },
];
---
<section id="get-started" class="py-24 border-t border-white/5">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-bold mb-4">Get Started</h2>
    <p class="text-mesh-muted text-lg mb-12 max-w-2xl">
      You need one piece of hardware and about 20 minutes. That's it.
    </p>

    <div class="grid md:grid-cols-3 gap-8 mb-16">
      <div class="flex flex-col gap-2">
        <div class="w-8 h-8 rounded-full bg-mesh-green text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
        <h3 class="font-semibold text-lg">Buy a radio</h3>
        <div class="space-y-3 mt-2">
          {radios.map(r => (
            <div class="bg-mesh-surface rounded-lg p-4 border border-white/5">
              <p class="font-medium text-sm">{r.name}</p>
              <p class="text-mesh-green font-mono text-sm">{r.price}</p>
              <p class="text-mesh-muted text-xs mt-1">{r.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="w-8 h-8 rounded-full bg-mesh-green text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
        <h3 class="font-semibold text-lg">Flash Meshtastic</h3>
        <p class="text-mesh-muted text-sm mt-2">
          Use the web flasher at <a href="https://flasher.meshtastic.org" target="_blank" rel="noopener" class="text-mesh-green hover:underline">flasher.meshtastic.org</a> — plug in your radio via USB, click Flash. No command line needed.
        </p>
        <p class="text-mesh-muted text-sm mt-2">
          Set your region to <span class="text-mesh-text font-mono">US</span> and leave the preset as <span class="text-mesh-text font-mono">LongFast</span>.
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <div class="w-8 h-8 rounded-full bg-mesh-green text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
        <h3 class="font-semibold text-lg">Power it on</h3>
        <p class="text-mesh-muted text-sm mt-2">
          If you can hear our repeater, you're on the mesh. Say hello on channel 0.
        </p>
        <p class="text-mesh-muted text-sm mt-2">
          <strong class="text-mesh-text">Antenna tip:</strong> Elevation matters more than anything. An attic or rooftop mount dramatically increases your range.
        </p>
      </div>
    </div>
  </div>
</section>
```

**Step 3: Add to index.astro**

```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import WeMoBot from '../components/WeMoBot.astro';
import Emergency from '../components/Emergency.astro';
import GettingStarted from '../components/GettingStarted.astro';
---
<Base>
  <Nav />
  <main>
    <Hero />
    <About />
    <WeMoBot />
    <Emergency />
    <GettingStarted />
  </main>
</Base>
```

**Step 4: Verify in browser**

Scroll through both sections. Verify emergency callout box styling and 3-step getting started layout.

**Step 5: Commit**

```bash
git add src/components/Emergency.astro src/components/GettingStarted.astro src/pages/index.astro
git commit -m "feat: add Emergency and Getting Started sections"
```

---

### Task 6: Hardware & Community Sections + Footer

**Files:**
- Create: `src/components/Hardware.astro`
- Create: `src/components/Community.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create Hardware component**

Create `src/components/Hardware.astro`:
```astro
---
const specs = [
  { label: 'Platform', value: 'Meshtastic' },
  { label: 'Frequency', value: '915 MHz (US ISM band)' },
  { label: 'Preset', value: 'LongFast' },
  { label: 'Power', value: 'Solar + battery backup on repeater nodes' },
  { label: 'Coverage', value: 'Semmes · West Mobile · expanding' },
];
---
<section id="hardware" class="py-24 border-t border-white/5">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-bold mb-4">Our Hardware</h2>
    <p class="text-mesh-muted text-lg mb-10 max-w-2xl">
      All repeater nodes run stock Meshtastic firmware. No proprietary software, no lock-in.
    </p>

    <div class="bg-mesh-surface rounded-xl border border-white/5 overflow-hidden">
      <table class="w-full text-sm">
        <tbody>
          {specs.map(({ label, value }, i) => (
            <tr class={i % 2 === 0 ? 'bg-white/2' : ''}>
              <td class="px-6 py-4 font-mono text-mesh-muted w-48">{label}</td>
              <td class="px-6 py-4 text-mesh-text">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <p class="mt-6 text-sm text-mesh-muted">
      Want to view live node locations?{' '}
      <a href="https://meshmap.net" target="_blank" rel="noopener" class="text-mesh-green hover:underline">
        meshmap.net →
      </a>
    </p>
  </div>
</section>
```

**Step 2: Create Community component**

Create `src/components/Community.astro`:
```astro
---
---
<section id="community" class="py-24 border-t border-white/5">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-3xl font-bold mb-4">Community</h2>
    <p class="text-mesh-muted text-lg mb-10 max-w-2xl">
      The mesh is only as strong as the people running nodes. Here's how to connect.
    </p>

    <div class="grid md:grid-cols-2 gap-6 mb-10">
      <div class="bg-mesh-surface rounded-xl p-6 border border-white/5">
        <h3 class="font-semibold mb-2">Say hello on channel 0</h3>
        <p class="text-mesh-muted text-sm">
          Power on your node and send a message on the primary channel. If someone's in range, they'll hear you.
        </p>
      </div>
      <div class="bg-mesh-surface rounded-xl p-6 border border-white/5">
        <h3 class="font-semibold mb-2">Alabama Meshtastic Users Group</h3>
        <p class="text-mesh-muted text-sm">
          Join the Facebook group to connect with the broader Alabama mesh community.
        </p>
        <a href="https://www.facebook.com/groups/alabamameshtastic" target="_blank" rel="noopener"
           class="inline-block mt-3 text-mesh-green text-sm hover:underline">
          Join the group →
        </a>
      </div>
      <div class="bg-mesh-surface rounded-xl p-6 border border-white/5">
        <h3 class="font-semibold mb-2">Contact</h3>
        <p class="text-mesh-muted text-sm">
          Reach us by mesh DM to node <span class="font-mono text-mesh-green">!da408150</span> (WeMoBot)
          or by email.
        </p>
      </div>
      <div class="bg-mesh-surface rounded-xl p-6 border border-white/5 border-mesh-green/20 bg-mesh-green/5">
        <h3 class="font-semibold mb-2 text-mesh-green">Got a tower or rooftop?</h3>
        <p class="text-mesh-muted text-sm">
          We'll sponsor a node for your site. Elevation expands coverage for everyone.
          Get in touch.
        </p>
      </div>
    </div>
  </div>
</section>
```

**Step 3: Create Footer component**

Create `src/components/Footer.astro`:
```astro
---
---
<footer class="border-t border-white/5 py-10">
  <div class="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-mesh-muted">
    <div class="font-mono text-mesh-green">⬡ WeMoMesh</div>
    <p>West Mobile Meshtastic · Mobile County, Alabama</p>
    <p>Built on <a href="https://meshtastic.org" target="_blank" rel="noopener" class="hover:text-mesh-green transition-colors">Meshtastic</a></p>
  </div>
</footer>
```

**Step 4: Add all to index.astro**

```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import WeMoBot from '../components/WeMoBot.astro';
import Emergency from '../components/Emergency.astro';
import GettingStarted from '../components/GettingStarted.astro';
import Hardware from '../components/Hardware.astro';
import Community from '../components/Community.astro';
import Footer from '../components/Footer.astro';
---
<Base>
  <Nav />
  <main>
    <Hero />
    <About />
    <WeMoBot />
    <Emergency />
    <GettingStarted />
    <Hardware />
    <Community />
  </main>
  <Footer />
</Base>
```

**Step 5: Verify full page in browser**

Scroll the entire page. Check mobile layout at 375px width.

**Step 6: Commit**

```bash
git add src/components/Hardware.astro src/components/Community.astro src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add Hardware, Community sections and Footer — full page complete"
```

---

### Task 7: GitHub Actions Workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: Create workflow**

```bash
mkdir -p .github/workflows
```

Create `.github/workflows/deploy.yml`:
```yaml
name: Build & Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: [self-hosted, linux]
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to web root
        run: |
          rsync -av --delete dist/ /var/www/westmobile-mesh/
          echo "Deployed at $(date)"
```

**Step 2: Verify the web root is writable by the runner user**

```bash
ssh tprinty@192.168.2.20 'ls -la /var/www/westmobile-mesh && touch /var/www/westmobile-mesh/.writetest && rm /var/www/westmobile-mesh/.writetest && echo "writable"'
```

Expected: `writable`

**Step 3: Commit and push — triggers first deploy**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions deploy workflow for self-hosted runner"
git push origin main
```

**Step 4: Watch the Action run**

```bash
gh run watch
```

Expected: Build succeeds, rsync output shows files copied to `/var/www/westmobile-mesh/`.

**Step 5: Verify live at `http://echo.edisonave.net/mesh/`**

Open in browser. Full page should render.

---

### Task 8: Local Preview Before Each Deploy (ongoing workflow)

**How to preview locally before pushing:**

```bash
npm run dev        # dev server with hot reload at http://localhost:4321
npm run build      # build to dist/
npm run preview    # serve dist/ locally at http://localhost:4321
```

Always run `npm run preview` on the final build before pushing to `main`.
