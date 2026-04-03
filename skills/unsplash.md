---
name: unsplash
description: Unsplash image sourcing guide — search and embed high-quality photos for hero backgrounds, product shots, avatars, and section imagery. Eliminates placeholder images from generated UI.
---

# Unsplash — Image Sourcing

## Overview

All generated UI must use real images, never gray boxes or placeholder URLs.
Use Unsplash as the primary source for stock photography.

## How to Search

Use `WebSearch` to find the right Unsplash photo:

```
WebSearch: "site:unsplash.com {keyword} {keyword}"
```

Examples:
- Hero background: `"site:unsplash.com dark minimal workspace"`
- Team avatars: `"site:unsplash.com professional headshot portrait"`
- Product shot: `"site:unsplash.com saas dashboard mockup"`
- Abstract texture: `"site:unsplash.com abstract gradient dark"`

Then `WebFetch` the Unsplash photo page to extract the image ID.

## URL Format

Unsplash Source URLs with on-the-fly transforms:

```
https://images.unsplash.com/photo-{id}?w={width}&h={height}&fit=crop&auto=format&q=80
```

### Common Presets

| Use Case | Params | Example |
|---|---|---|
| Hero background (full) | `w=1920&h=1080&fit=crop` | Large section background |
| Hero background (mobile) | `w=768&h=1024&fit=crop` | Responsive srcset |
| Card thumbnail | `w=600&h=400&fit=crop` | Blog/product cards |
| Avatar | `w=200&h=200&fit=crop&crop=face` | Profile pictures |
| Team photo | `w=400&h=400&fit=crop&crop=face` | Team section |
| Icon/small | `w=100&h=100&fit=crop` | Tiny thumbnails |
| OG image | `w=1200&h=630&fit=crop` | Social sharing |

### Quality & Format

- Always include `auto=format` (serves WebP to supported browsers)
- Use `q=80` for hero/large images (good balance)
- Use `q=60` for thumbnails (smaller payload)
- Add `blur=50` for placeholder blur-up patterns

## Responsive Images

Always provide srcset for hero/large images:

```tsx
<img
  src="https://images.unsplash.com/photo-{id}?w=1200&fit=crop&auto=format&q=80"
  srcSet={`
    https://images.unsplash.com/photo-{id}?w=640&fit=crop&auto=format&q=80 640w,
    https://images.unsplash.com/photo-{id}?w=1200&fit=crop&auto=format&q=80 1200w,
    https://images.unsplash.com/photo-{id}?w=1920&fit=crop&auto=format&q=80 1920w
  `}
  sizes="100vw"
  alt="descriptive alt text"
  loading="lazy"
/>
```

For Next.js projects, prefer `next/image`:

```tsx
<Image
  src="https://images.unsplash.com/photo-{id}?w=1920&fit=crop&auto=format&q=80"
  alt="descriptive alt text"
  width={1920}
  height={1080}
  className="object-cover"
  priority  // only for above-the-fold hero
/>
```

**Reminder**: Add Unsplash domain to `next.config.ts` images.remotePatterns:
```ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
  ],
},
```

## Image Selection Rules

1. **Match the mood** — dark UI = dark/moody photos, light UI = bright/airy photos
2. **No cliche stock** — avoid handshakes, pointing at screens, forced smiles
3. **Consistent style** — all images on one page should share similar color temperature, contrast, and editing style
4. **Diverse subjects** — vary gender, ethnicity, age in people photos
5. **High contrast for overlays** — if text sits on the image, pick photos with large low-detail areas (sky, blur, solid surfaces)
6. **Avoid text in photos** — signs, screens with text, etc. clash with UI copy

## Workflow Integration

### When to source images

During implementation (Step 5 in /design, Step 6 in /copy):

1. **Before coding a section**, identify all image slots: hero bg, card thumbnails, avatars, product shots
2. **Search Unsplash** for each slot with mood-appropriate keywords
3. **Extract photo IDs** and build URLs with correct size params
4. **Embed directly** in the generated code — no TODOs, no placeholders

### Image categories by section

| Section | Image Type | Search Keywords |
|---|---|---|
| Hero | Full-width background | `{product-domain} dark/light minimal` |
| Features | Icon illustrations or abstract | `abstract geometric`, `minimal icon` |
| Testimonials | Headshot portraits | `professional headshot portrait` |
| Team | Square face crops | `team member portrait professional` |
| Blog/Cards | Topical thumbnails | `{topic} photography editorial` |
| About | Office/workspace | `modern office workspace team` |
| CTA | Abstract/gradient | `abstract gradient colorful` |

### Fallback strategy

If WebSearch returns no good Unsplash results:
1. Try broader keywords (e.g., "technology" instead of "saas dashboard")
2. Use CSS gradients or SVG patterns as visual alternatives
3. For avatars: use initials-based avatar components (no gray circles)

## Curated Photo IDs (verified, high-quality)

Frequently useful photos to avoid repeated searches:

### Dark/Moody Backgrounds
- `photo-1451187580459-43490279c0fa` — earth from space, dark blue
- `photo-1534796636912-3b95b3ab5986` — dark gradient abstract
- `photo-1557682250-33bd709cbe85` — purple gradient abstract

### Light/Clean Backgrounds
- `photo-1557683316-973673baf926` — soft gradient pastel
- `photo-1579546929518-9e396f3cc135` — white minimal abstract

### Avatars (diverse set)
- `photo-1494790108377-be9c29b29330` — woman, warm tones
- `photo-1507003211169-0a1dd7228f2d` — man, neutral background
- `photo-1438761681033-6461ffad8d80` — woman, professional
- `photo-1472099645785-5658abf4ff4e` — man, casual professional
- `photo-1534528741775-53994a69daeb` — woman, clean background
- `photo-1500648767791-00dcc994a43e` — man, studio lighting

### Workspace/Tech
- `photo-1498050108023-c5249f4df085` — laptop code screen
- `photo-1517694712202-14dd9538aa97` — macbook workspace
- `photo-1460925895917-afdab827c52f` — dashboard on screen
