# barua-ui

Barua UI as React components — an Apple-DNA design system (Barua blue, real
glass materials, HIG type) built on **pure CSS**, with thin typed React
bindings on top. The CSS is the source of truth; components just compose the
`.b-*` class system and add the interactive behaviors the React way.

## What is in it

278 components and hooks — every block in the system has one. The full
list, grouped, is at <https://ui.barua.tz/docs/react.html>, and every example in
the documentation carries a **React** tab with the JSX that produces it.

```tsx
import { Card, CardBody, Stat, Button, Icon } from "barua-ui";

<Card compact>
  <CardBody>
    <Stat label="Outstanding" value="TZS 4.2M" />
    <Button variant="primary">
      <Icon name="check" /> Mark paid
    </Button>
  </CardBody>
</Card>
```

Components render the documented markup and nothing else, so anything you read
on the docs pages applies unchanged. Each one forwards `className` and its ref,
so you are never boxed in.

## Install

```sh
npm install barua-ui
```

## Use

```tsx
// 1. Load the stylesheet once (any bundler handles the @imports)
import "barua-ui/css";

// 2. Mount the provider at your root
import { BaruaProvider, Button, Card, CardBody, useToast } from "barua-ui";

function Root() {
  return (
    <BaruaProvider theme="auto" accent="blue" glass={false}>
      <App />
    </BaruaProvider>
  );
}

function App() {
  const toast = useToast();
  return (
    <Card variant="glass" interactive>
      <CardBody>
        <Button
          variant="primary"
          size="lg"
          onClick={() => toast({ title: "Karibu!", variant: "success" })}
        >
          Habari, Barua!
        </Button>
      </CardBody>
    </Card>
  );
}
```

SSR/Next.js: render `<ThemeScript />` in `<head>` so the stored theme applies
before first paint.

## What's in the box

- **Provider** — `BaruaProvider` (theme / `accent` re-tint / Liquid Glass
  `glass` mode / Tier-2 `refraction`), `ThemeScript`, `useToast`
- **Actions** — `Button`, `ButtonLink`, `Fab`, `Toolbar`
- **Forms** — `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`,
  `Switch`, `Slider`, `OtpInput`
- **Content** — `Card` family (incl. `StoryCard`, flush iOS-Settings groups),
  `List`/`ListItem`, `Badge`, `Tag`, `Chip`, `Avatar`(+`AvatarGroup`),
  `IconTile`, `Stat`, `EmptyState`
- **Feedback** — `Alert`, `Progress`, `Spinner`, `Skeleton`, `StatusDot`,
  toasts
- **Overlays** — `Modal`, `AlertDialog`, `Sheet`, `BottomSheet`, `Popover`
  (arrowed/card), `Tooltip` — all on native `<dialog>`, centered by default
- **Navigation** — `Segmented`, `Tabs`/`TabPanel`, `Breadcrumbs`

Anything not wrapped yet is still one `className` away — the entire `.b-*`
system ships in `barua-ui/css`, documented in the Barua UI docs site.

## Theming

```tsx
<BaruaProvider theme="dark" accent="purple" glass refraction />
```

- `theme`: `"auto" | "light" | "dark"` → `data-theme` on `<html>`
- `accent`: re-tints every component from one token
- `glass`: Liquid Glass mode — re-skins the whole system
- `refraction`: SVG-displacement refraction on liquid objects (Blink only,
  graceful elsewhere)

Modern evergreen browsers: `light-dark()`, `@layer`, `color-mix()`, Popover
API, `<dialog>`.
