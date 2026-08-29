# Media — galleries, players, thumbnails

Source: https://ui.barua.tz/docs/media.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Image Viewer

A dark stage that centers one image, with a .b-image-viewer__bar pinned to the bottom edge for the caption and actions. The stage stays near-black in both themes so photos read the same everywhere. Demos on this page use gradient placeholders in place of real files.

- Documentation: https://ui.barua.tz/docs/media.html#image-viewer
- Classes: `b-btn` `b-btn--glass` `b-btn--sm` `b-icon-btn` `b-image-viewer` `b-image-viewer__bar`

```html
<div class="b-image-viewer">
  <div style="width: 100%; aspect-ratio: 16 / 9; background: linear-gradient(135deg, var(--b-color-accent), var(--b-color-purple))"></div>
  <div class="b-image-viewer__bar">
    <span>Msasani Bay at dusk — 4,032 × 2,268</span>
    <span style="display: flex; gap: var(--b-space-1)">
      <button class="b-btn b-icon-btn b-btn--glass b-btn--sm" aria-label="Zoom in">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="m13.2 13.2 3.3 3.3M9 6.8v4.4M6.8 9h4.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
      <button class="b-btn b-icon-btn b-btn--glass b-btn--sm" aria-label="Download image">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3.5v9m0 0L6.5 9m3.5 3.5L13.5 9M4.5 16h11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </span>
  </div>
</div>
```

```tsx
import { Button, ImageViewer, ImageViewerBar } from "barua-ui";

<ImageViewer>
  <div
    style={{ width: "100%", aspectRatio: "16 / 9", background: "linear-gradient(135deg, var(--b-color-accent), var(--b-color-purple))" }}
  ></div>
  <ImageViewerBar>
    <span>Msasani Bay at dusk — 4,032 × 2,268</span>
    <span style={{ display: "flex", gap: "var(--b-space-1)" }}>
      <Button icon variant="glass" size="sm" aria-label="Zoom in">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="m13.2 13.2 3.3 3.3M9 6.8v4.4M6.8 9h4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </Button>
      <Button icon variant="glass" size="sm" aria-label="Download image">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 3.5v9m0 0L6.5 9m3.5 3.5L13.5 9M4.5 16h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Button>
    </span>
  </ImageViewerBar>
</ImageViewer>
```

## Image Gallery

An auto-filling square grid. Wrap each tile in a <button> (or <a> ) — the grid strips the chrome, rounds the corners and adds a zoom-in cursor, and real images get a gentle hover scale.

- Documentation: https://ui.barua.tz/docs/media.html#image-gallery
- Classes: `b-gallery`

```html
<div class="b-gallery">
  <button aria-label="View photo: Harbor at dawn">
    <div style="aspect-ratio: 1; background: linear-gradient(135deg, var(--b-color-accent), var(--b-color-purple))"></div>
  </button>
  <button aria-label="View photo: Reef shallows">
    <div style="aspect-ratio: 1; background: linear-gradient(135deg, var(--b-color-teal), var(--b-color-cyan))"></div>
  </button>
  <button aria-label="View photo: Market stalls">
    <div style="aspect-ratio: 1; background: linear-gradient(135deg, var(--b-color-pink), var(--b-color-orange))"></div>
  </button>
  <button aria-label="View photo: Forest canopy">
    <div style="aspect-ratio: 1; background: linear-gradient(135deg, var(--b-color-green), var(--b-color-mint))"></div>
  </button>
  <button aria-label="View photo: City lights">
    <div style="aspect-ratio: 1; background: linear-gradient(135deg, var(--b-color-accent), var(--b-color-indigo))"></div>
  </button>
  <button aria-label="View photo: Tide pools">
    <div style="aspect-ratio: 1; background: linear-gradient(135deg, var(--b-color-mint), var(--b-color-teal))"></div>
  </button>
  <button aria-label="View photo: Dune sunset">
    <div style="aspect-ratio: 1; background: linear-gradient(135deg, var(--b-color-orange), var(--b-color-pink))"></div>
  </button>
  <button aria-label="View photo: Night sky">
    <div style="aspect-ratio: 1; background: linear-grad
```

```tsx
import { Gallery } from "barua-ui";

<Gallery>
  <button aria-label="View photo: Harbor at dawn">
    <div
      style={{ aspectRatio: "1", background: "linear-gradient(135deg, var(--b-color-accent), var(--b-color-purple))" }}
    ></div>
  </button>
  <button aria-label="View photo: Reef shallows">
    <div
      style={{ aspectRatio: "1", background: "linear-gradient(135deg, var(--b-color-teal), var(--b-color-cyan))" }}
    ></div>
  </button>
  <button aria-label="View photo: Market stalls">
    <div
      style={{ aspectRatio: "1", background: "linear-gradient(135deg, var(--b-color-pink), var(--b-color-orange))" }}
    ></div>
  </button>
  <button aria-label="View photo: Forest canopy">
    <div
      style={{ aspectRatio: "1", background: "linear-gradient(135deg, var(--b-color-green), var(--b-color-mint))" }}
    ></div>
  </button>
  <button aria-label="View photo: City lights">
    <div
      style={{ aspectRatio: "1", background: "linear-gradient(135deg, var(--b-color-accent), var(--b-color-indigo))" }}
    ></div>
  </button>
  <button aria-label="View photo: Tide pools">
    <div
      style={{ aspectRatio: "1", background: "linear-gradient(135deg, var(--b-color-mint), var(--b-color-teal))" }}
    ></div>
  </button>
  <button aria-label="View photo: Dune sunset">
    <div
      style={{ aspectRatio: "1", background: "linear-gradient(135deg, var(--b-color-orange), var(--b-color-pink))" }}
    ></div>
  </button>
  <button aria-label="View photo: Night sky"></button>
</Gallery>
```

## Carousel

A scroll-snap track — it works with plain CSS, and adding data-b-carousel lets barua.js wire the prev/next buttons to smooth scrolling and keep the dots in sync. Slides default to 70% of the track width; override with --b-slide-w .

- Documentation: https://ui.barua.tz/docs/media.html#carousel
- Classes: `b-btn` `b-btn--glass` `b-carousel` `b-carousel__dots` `b-carousel__nav` `b-carousel__nav--next` `b-carousel__nav--prev` `b-carousel__slide` `b-carousel__track` `b-icon-btn`

```html
<div class="b-carousel" data-b-carousel>
  <div class="b-carousel__track">
    <div class="b-carousel__slide">
      <div style="aspect-ratio: 16 / 9; background: linear-gradient(135deg, var(--b-color-accent), var(--b-color-indigo))"></div>
    </div>
    <div class="b-carousel__slide">
      <div style="aspect-ratio: 16 / 9; background: linear-gradient(135deg, var(--b-color-teal), var(--b-color-cyan))"></div>
    </div>
    <div class="b-carousel__slide">
      <div style="aspect-ratio: 16 / 9; background: linear-gradient(135deg, var(--b-color-pink), var(--b-color-orange))"></div>
    </div>
    <div class="b-carousel__slide">
      <div style="aspect-ratio: 16 / 9; background: linear-gradient(135deg, var(--b-color-green), var(--b-color-mint))"></div>
    </div>
  </div>
  <button class="b-btn b-icon-btn b-btn--glass b-carousel__nav b-carousel__nav--prev" aria-label="Previous slide">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m12 5-5 5 5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>
  <button class="b-btn b-icon-btn b-btn--glass b-carousel__nav b-carousel__nav--next" aria-label="Next slide">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m8 5 5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>
  <div c
```

```tsx
import { Button, Carousel, CarouselSlide, CarouselTrack } from "barua-ui";

<Carousel data-b-carousel="">
  <CarouselTrack>
    <CarouselSlide>
      <div
        style={{ aspectRatio: "16 / 9", background: "linear-gradient(135deg, var(--b-color-accent), var(--b-color-indigo))" }}
      ></div>
    </CarouselSlide>
    <CarouselSlide>
      <div
        style={{ aspectRatio: "16 / 9", background: "linear-gradient(135deg, var(--b-color-teal), var(--b-color-cyan))" }}
      ></div>
    </CarouselSlide>
    <CarouselSlide>
      <div
        style={{ aspectRatio: "16 / 9", background: "linear-gradient(135deg, var(--b-color-pink), var(--b-color-orange))" }}
      ></div>
    </CarouselSlide>
    <CarouselSlide>
      <div
        style={{ aspectRatio: "16 / 9", background: "linear-gradient(135deg, var(--b-color-green), var(--b-color-mint))" }}
      ></div>
    </CarouselSlide>
  </CarouselTrack>
  <Button
    icon
    variant="glass"
    className="b-carousel__nav b-carousel__nav--prev"
    aria-label="Previous slide"
  >
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m12 5-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Button>
  <Button
    icon
    variant="glass"
    className="b-carousel__nav b-carousel__nav--next"
    aria-label="Next slide"
  >
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m8 5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Button>
</Carousel>
```

## Video Player

A 16:9 frame around a <video> element. The .b-video__overlay with its glass .b-video__play button fades in on hover, or stays visible while the frame carries .is-paused . The bottom bar is the shared Media Controls strip.

- Documentation: https://ui.barua.tz/docs/media.html#video-player
- Classes: `b-btn` `b-icon-btn` `b-media-controls` `b-media-controls__time` `b-slider` `b-video` `b-video__overlay` `b-video__play`

```html
<div class="b-video is-paused">
  <div style="position: absolute; inset: 0; background: linear-gradient(135deg, var(--b-color-accent), var(--b-color-indigo))"></div>
  <div class="b-video__overlay">
    <button class="b-video__play" aria-label="Play video">
      <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24" aria-hidden="true"><path d="M7 4.9v10.2a.6.6 0 0 0 .92.5l8-5.1a.6.6 0 0 0 0-1l-8-5.1a.6.6 0 0 0-.92.5Z"/></svg>
    </button>
  </div>
  <div class="b-media-controls">
    <button class="b-btn b-icon-btn" aria-label="Play">
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M7 4.9v10.2a.6.6 0 0 0 .92.5l8-5.1a.6.6 0 0 0 0-1l-8-5.1a.6.6 0 0 0-.92.5Z"/></svg>
    </button>
    <input class="b-slider" type="range" min="0" max="100" value="37" style="--b-slider-fill: 37%" aria-label="Seek">
    <span class="b-media-controls__time">1:24 / 3:47</span>
    <button class="b-btn b-icon-btn" aria-label="Mute">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M9.5 4.8 6.6 7.3H4.7a.7.7 0 0 0-.7.7v4a.7.7 0 0 0 .7.7h1.9l2.9 2.5a.6.6 0 0 0 1-.45V5.25a.6.6 0 0 0-1-.45Z" fill="currentColor"/><path d="M12.5 7.5a3.4 3.4 0 0 1 0 5M14.4 5.6a6.2 6.2 0 0 1 0 8.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </button>
    <button class="b-btn b-icon-btn" aria-label="Enter full screen">
      <svg 
```

```tsx
import { Button, Slider, Video } from "barua-ui";

<Video className="is-paused">
  <div
    style={{ position: "absolute", inset: "0", background: "linear-gradient(135deg, var(--b-color-accent), var(--b-color-indigo))" }}
  ></div>
  <div className="b-video__overlay">
    <button className="b-video__play" aria-label="Play video">
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        width="24"
        height="24"
        aria-hidden="true"
      >
        <path d="M7 4.9v10.2a.6.6 0 0 0 .92.5l8-5.1a.6.6 0 0 0 0-1l-8-5.1a.6.6 0 0 0-.92.5Z" />
      </svg>
    </button>
  </div>
  <div className="b-media-controls">
    <Button icon aria-label="Play">
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M7 4.9v10.2a.6.6 0 0 0 .92.5l8-5.1a.6.6 0 0 0 0-1l-8-5.1a.6.6 0 0 0-.92.5Z" />
      </svg>
    </Button>
    <Slider type="range" min="0" max="100" value="37" style={{ "--b-slider-fill": "37%" }} aria-label="Seek" />
    <span className="b-media-controls__time">1:24 / 3:47</span>
    <Button icon aria-label="Mute">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M9.5 4.8 6.6 7.3H4.7a.7.7 0 0 0-.7.7v4a.7.7 0 0 0 .7.7h1.9l2.9 2.5a.6.6 0 0 0 1-.45V5.25a.6.6 0 0 0-1-.45Z" fill="currentColor" />
        <path d="M12.5 7.5a3.4 3.4 0 0 1 0 5M14.4 5.6a6.2 6.2 0 0 1 0 8.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </Button>
    <Button icon aria-label="Enter full screen"></Button>
  </div>
</Video>
```

## Audio Player

A compact row: .b-audio__art , a flexible .b-audio__meta block with title, artist and a .b-progress track, and transport buttons in .b-audio__controls .

- Documentation: https://ui.barua.tz/docs/media.html#audio-player
- Classes: `b-audio` `b-audio--glass` `b-audio__art` `b-audio__artist` `b-audio__controls` `b-audio__meta` `b-audio__title` `b-btn` `b-btn--ghost` `b-btn--primary` `b-icon-btn` `b-progress` `b-progress__fill` `b-waveform`

```html
<div class="b-audio">
  <div class="b-audio__art" style="background: linear-gradient(135deg, var(--b-color-pink), var(--b-color-orange))"></div>
  <div class="b-audio__meta">
    <div class="b-audio__title">Golden Hour</div>
    <div class="b-audio__artist">The Marine Layer</div>
    <div class="b-progress"><div class="b-progress__fill" style="--b-progress: 42%"></div></div>
  </div>
  <div class="b-audio__controls">
    <button class="b-btn b-icon-btn b-btn--ghost" aria-label="Previous track">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5.5 4.5v11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M15 5.6v8.8a.6.6 0 0 1-.93.5L7.6 10.5a.6.6 0 0 1 0-1l6.47-4.4a.6.6 0 0 1 .93.5Z" fill="currentColor"/></svg>
    </button>
    <button class="b-btn b-icon-btn b-btn--primary" aria-label="Play">
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M7 4.9v10.2a.6.6 0 0 0 .92.5l8-5.1a.6.6 0 0 0 0-1l-8-5.1a.6.6 0 0 0-.92.5Z"/></svg>
    </button>
    <button class="b-btn b-icon-btn b-btn--ghost" aria-label="Next track">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M14.5 4.5v11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M5 5.6v8.8a.6.6 0 0 0 .93.5l6.47-4.4a.6.6 0 0 0 0-1L5.93 5.1a.6.6 0 0 0-.93.5Z" fill="currentColor"/></svg>
    </button>
  </div>
</div>
```

```tsx
import { Audio, Button, Progress } from "barua-ui";

<Audio>
  <div
    className="b-audio__art"
    style={{ background: "linear-gradient(135deg, var(--b-color-pink), var(--b-color-orange))" }}
  ></div>
  <div className="b-audio__meta">
    <div className="b-audio__title">Golden Hour</div>
    <div className="b-audio__artist">The Marine Layer</div>
    <Progress>
      <div className="b-progress__fill" style={{ "--b-progress": "42%" }}></div>
    </Progress>
  </div>
  <div className="b-audio__controls">
    <Button icon variant="ghost" aria-label="Previous track">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5.5 4.5v11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M15 5.6v8.8a.6.6 0 0 1-.93.5L7.6 10.5a.6.6 0 0 1 0-1l6.47-4.4a.6.6 0 0 1 .93.5Z" fill="currentColor" />
      </svg>
    </Button>
    <Button icon variant="primary" aria-label="Play">
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M7 4.9v10.2a.6.6 0 0 0 .92.5l8-5.1a.6.6 0 0 0 0-1l-8-5.1a.6.6 0 0 0-.92.5Z" />
      </svg>
    </Button>
    <Button icon variant="ghost" aria-label="Next track">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M14.5 4.5v11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M5 5.6v8.8a.6.6 0 0 0 .93.5l6.47-4.4a.6.6 0 0 0 0-1L5.93 5.1a.6.6 0 0 0-.93.5Z" fill="currentColor" />
      </svg>
    </Button>
  </div>
</Audio>
```

## Media Controls

The shared bottom bar used by the video player and any custom media frame. It pins to the bottom of the nearest position: relative ancestor over a soft black gradient, forces dark color-scheme, and makes any inner .b-icon-btn white and transparent. The .b-slider (a native range input from Forms ) flexes to fill the row, and .b-media-controls__time keeps timestamps in tabular numerals so they never wiggle.

- Documentation: https://ui.barua.tz/docs/media.html#media-controls
- Classes: `b-btn` `b-icon-btn` `b-media-controls` `b-media-controls__time` `b-slider`

```html
<div class="b-media-controls">
  <button class="b-btn b-icon-btn" aria-label="Pause">
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><rect x="5.5" y="4.5" width="3" height="11" rx="1"/><rect x="11.5" y="4.5" width="3" height="11" rx="1"/></svg>
  </button>
  <input class="b-slider" type="range" min="0" max="100" value="64" style="--b-slider-fill: 64%" aria-label="Seek">
  <span class="b-media-controls__time">2:26 / 3:47</span>
  <button class="b-btn b-icon-btn" aria-label="Mute">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M9.5 4.8 6.6 7.3H4.7a.7.7 0 0 0-.7.7v4a.7.7 0 0 0 .7.7h1.9l2.9 2.5a.6.6 0 0 0 1-.45V5.25a.6.6 0 0 0-1-.45Z" fill="currentColor"/><path d="M12.5 7.5a3.4 3.4 0 0 1 0 5M14.4 5.6a6.2 6.2 0 0 1 0 8.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  </button>
</div>
```

```tsx
import { Button, Slider } from "barua-ui";

<div className="b-media-controls">
  <Button icon aria-label="Pause">
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <rect x="5.5" y="4.5" width="3" height="11" rx="1" />
      <rect x="11.5" y="4.5" width="3" height="11" rx="1" />
    </svg>
  </Button>
  <Slider type="range" min="0" max="100" value="64" style={{ "--b-slider-fill": "64%" }} aria-label="Seek" />
  <span className="b-media-controls__time">2:26 / 3:47</span>
  <Button icon aria-label="Mute">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M9.5 4.8 6.6 7.3H4.7a.7.7 0 0 0-.7.7v4a.7.7 0 0 0 .7.7h1.9l2.9 2.5a.6.6 0 0 0 1-.45V5.25a.6.6 0 0 0-1-.45Z" fill="currentColor" />
      <path d="M12.5 7.5a3.4 3.4 0 0 1 0 5M14.4 5.6a6.2 6.2 0 0 1 0 8.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </Button>
</div>
```

## Thumbnail

A square media chip, sized with --b-thumb-size (default 4.5rem). .b-thumb--video overlays a play glyph, and .b-thumb__duration stamps a runtime in the corner.

- Documentation: https://ui.barua.tz/docs/media.html#thumbnail
- Classes: `b-thumb` `b-thumb--video` `b-thumb__duration`

```html
<div class="b-thumb" style="--b-thumb-size: 3rem">
  <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--b-color-green), var(--b-color-mint))"></div>
</div>
<div class="b-thumb">
  <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--b-color-teal), var(--b-color-cyan))"></div>
</div>
<div class="b-thumb" style="--b-thumb-size: 6rem">
  <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--b-color-accent), var(--b-color-purple))"></div>
</div>
<div class="b-thumb b-thumb--video" style="--b-thumb-size: 6rem">
  <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--b-color-pink), var(--b-color-orange))"></div>
  <span class="b-thumb__duration">2:14</span>
</div>
```

```tsx
import { Thumb } from "barua-ui";

<Thumb style={{ "--b-thumb-size": "3rem" }}>
  <div
    style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--b-color-green), var(--b-color-mint))" }}
  ></div>
</Thumb>
<Thumb>
  <div
    style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--b-color-teal), var(--b-color-cyan))" }}
  ></div>
</Thumb>
<Thumb style={{ "--b-thumb-size": "6rem" }}>
  <div
    style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--b-color-accent), var(--b-color-purple))" }}
  ></div>
</Thumb>
<Thumb className="b-thumb--video" style={{ "--b-thumb-size": "6rem" }}>
  <div
    style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--b-color-pink), var(--b-color-orange))" }}
  ></div>
  <span className="b-thumb__duration">2:14</span>
</Thumb>
```

## Media Placeholder

The empty state for a media slot — a dashed 16:9 frame with a hatched fill and a quiet glyph. Use it wherever an image or video hasn't been chosen, uploaded or loaded yet; it holds the exact space the media will occupy.

- Documentation: https://ui.barua.tz/docs/media.html#media-placeholder
- Classes: `b-media-placeholder`

```html
<div class="b-media-placeholder">
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><circle cx="8.5" cy="10" r="1.5" fill="currentColor"/><path d="m5.5 16.5 4-4 3 3 3-3 3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
</div>
```

```tsx
import { MediaPlaceholder } from "barua-ui";

<MediaPlaceholder>
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
    <path d="m5.5 16.5 4-4 3 3 3-3 3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
</MediaPlaceholder>
```

## Upload Preview

A grid of square tiles for files being attached. While a file uploads, float a .b-progress near the bottom edge; once done, show the .b-upload-preview__remove button. Pairs with the File Upload dropzone in Forms .

- Documentation: https://ui.barua.tz/docs/media.html#upload-preview
- Classes: `b-progress` `b-progress__fill` `b-upload-preview` `b-upload-preview__remove` `b-upload-previews`

```html
<div class="b-upload-previews">
  <div class="b-upload-preview">
    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--b-color-accent), var(--b-color-purple))"></div>
  </div>
  <div class="b-upload-preview">
    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--b-color-teal), var(--b-color-cyan))"></div>
    <button class="b-upload-preview__remove" aria-label="Remove harbor-02.jpg">✕</button>
  </div>
  <div class="b-upload-preview">
    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--b-color-green), var(--b-color-mint))"></div>
    <div class="b-progress"><div class="b-progress__fill" style="--b-progress: 60%"></div></div>
  </div>
  <div class="b-upload-preview">
    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--b-color-pink), var(--b-color-orange))"></div>
  </div>
</div>
```

```tsx
import { Progress, UploadPreview, UploadPreviews } from "barua-ui";

<UploadPreviews>
  <UploadPreview>
    <div
      style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--b-color-accent), var(--b-color-purple))" }}
    ></div>
  </UploadPreview>
  <UploadPreview>
    <div
      style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--b-color-teal), var(--b-color-cyan))" }}
    ></div>
    <button
      className="b-upload-preview__remove"
      aria-label="Remove harbor-02.jpg"
    >
      ✕
    </button>
  </UploadPreview>
  <UploadPreview>
    <div
      style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--b-color-green), var(--b-color-mint))" }}
    ></div>
    <Progress>
      <div className="b-progress__fill" style={{ "--b-progress": "60%" }}></div>
    </Progress>
  </UploadPreview>
  <UploadPreview>
    <div
      style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--b-color-pink), var(--b-color-orange))" }}
    ></div>
  </UploadPreview>
</UploadPreviews>
```

## Async Image

SwiftUI's AsyncImage loading choreography: wrap the image in .b-async-img and add data-b-async — it shimmers while loading, then the picture fades in. Errors stop the shimmer and leave the quiet fill.

- Documentation: https://ui.barua.tz/docs/media.html#async-image
- Classes: `b-async-img`

```html
<span class="b-async-img" style="width: 14rem; aspect-ratio: 16/10">
  <img data-b-async alt="Sample" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%230a7aff'/%3E%3Cstop offset='1' stop-color='%23af52de'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='200' fill='url(%23g)'/%3E%3C/svg%3E">
</span>
<span class="b-async-img" style="width: 14rem; aspect-ratio: 16/10" aria-label="Still loading"></span>
```

```tsx
import { AsyncImage } from "barua-ui";

<AsyncImage style={{ width: "14rem", aspectRatio: "16/10" }}>
  <img data-b-async="" alt="Sample" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%230a7aff'/%3E%3Cstop offset='1' stop-color='%23af52de'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='200' fill='url(%23g)'/%3E%3C/svg%3E" />
</AsyncImage>
<AsyncImage
  style={{ width: "14rem", aspectRatio: "16/10" }}
  aria-label="Still loading"
></AsyncImage>
```

