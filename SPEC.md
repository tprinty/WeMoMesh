# West Mobile Mesh Website — Spec

A community landing page for the West Mobile Meshtastic network in Mobile
County, Alabama. Reference: [birminghammesh.org](https://birminghammesh.org).

## Approach

Static HTML + CSS on webdev (192.168.2.20), served as an Apache Alias under
`echo.edisonave.net/mesh/`. No database, no JavaScript frameworks, no build
step. Dark theme, mobile-first, one scrollable page.

## Sections

### 1. Hero

- Headline: "West Mobile Mesh — off-grid communication for Mobile County"
- Sub: No cell service. No license. No monthly fees. Just text your neighbors.
- CTA: jump link to Getting Started

### 2. What is this?

- Meshtastic explained in two sentences
- Coverage: Semmes, West Mobile, expanding
- "It's like a neighborhood group chat that works when the towers don't."

### 3. WeMoBot — your mesh utility

- 24/7 bot on the mesh (node `!da408150`)
- Command highlights (not all 16):
  - `#weather` — daily forecast (high/low, rain, sunrise)
  - `#alerts` — NWS storm warnings within 5 min
  - `#tropics` — hurricane advisories
  - `#nodes` — who's online
  - `#moon` / `#sun` — celestial (computed locally, no internet needed)
  - `#help` — full list
- Auto-broadcasts: daily forecast at 7am CT, instant severe weather alerts
- Link to full command reference

### 4. Emergency communications

- Gulf Coast angle: hurricanes, tornadoes, freeze warnings
- "When the cell towers go down — and they do — the mesh stays up."
- WeMoBot pushes NWS alerts without waiting for a request
- Solar-powered repeater nodes = independent of the grid

### 5. Getting started

- Radio options with rough prices (~$30–40)
- Flashing instructions (link to meshtastic.org)
- Channel: LongFast (the default) — that's it
- Antenna tip: elevation matters, attic or rooftop
- "If you can hear our repeater, you're on the mesh."

### 6. Our hardware

- Platform: Meshtastic
- Frequency: 915 MHz (US ISM band)
- Preset: LongFast
- Repeater locations (general area, not exact addresses)
- Solar + battery backup on repeater nodes

### 7. Community

- Alabama Meshtastic Users Group (Facebook link)
- How to say hello on channel 0
- Contact: email or mesh DM
- "Tower/repeater owners: we'll sponsor a node for your site."

## Technical

| Thing | Detail |
|-------|--------|
| Host | webdev (192.168.2.20), Apache 2 |
| URL | `http://echo.edisonave.net/mesh/` |
| Files | `/var/www/westmobile-mesh/index.html` + CSS |
| Alias | `/mesh` → `/var/www/westmobile-mesh` in echo.edisonave.net vhost |
| Domain | Can add `westmobilemesh.org` later — point at same directory |
| Updates | Edit HTML, scp to webdev. No CMS. |

## Out of scope (v1)

- Live node map (link to meshmap.net instead)
- Database or CMS
- JavaScript frameworks
- User accounts or logins
- MQTT integration

## Deployment

Apache Alias is already configured and live. Deploy workflow:

```bash
scp index.html tprinty@192.168.2.20:/var/www/westmobile-mesh/index.html
ssh tprinty@192.168.2.20 'sudo chmod 755 /var/www/westmobile-mesh/index.html'
```

No reload needed — Apache picks up static file changes immediately.

## Effort

One evening. Most of the time is content, not code.