# Theming — light and dark, the named accents, and carrying a brand colour without breaking danger

Source: https://ui.barua.tz/docs/theming.html
Rules and conventions: https://ui.barua.tz/llms.txt

## The named accents

Five accents ship with the system. Set one attribute on <html> and every button, focus ring, link and selected state re-tints.

- Documentation: https://ui.barua.tz/docs/theming.html#named-accents
- Classes: `b-btn` `b-btn--primary` `b-gap-2` `b-hstack` `b-stack--wrap`

```html
<div class="b-hstack b-gap-2 b-stack--wrap">
  <button class="b-btn b-btn--primary">Default blue</button>
  <span data-accent="indigo"><button class="b-btn b-btn--primary">Indigo</button></span>
  <span data-accent="purple"><button class="b-btn b-btn--primary">Purple</button></span>
  <span data-accent="teal"><button class="b-btn b-btn--primary">Teal</button></span>
  <span data-accent="green"><button class="b-btn b-btn--primary">Green</button></span>
</div>
```

```tsx
import { Button } from "barua-ui";

<div className="b-hstack b-gap-2 b-stack--wrap">
  <Button variant="primary">Default blue</Button>
  <span data-accent="indigo">
    <Button variant="primary">Indigo</Button>
  </span>
  <span data-accent="purple">
    <Button variant="primary">Purple</Button>
  </span>
  <span data-accent="teal">
    <Button variant="primary">Teal</Button>
  </span>
  <span data-accent="green">
    <Button variant="primary">Green</Button>
  </span>
</div>
```

## A brand colour that is not on the list

A brand rarely matches a palette. Override the accent tokens in unlayered CSS — a plain stylesheet loaded after barua.css . Unlayered rules beat every layer in the system, which is the documented seam for exactly this. It is the supported route, not a workaround.

- Documentation: https://ui.barua.tz/docs/theming.html#brand-colour
- Classes: `b-badge` `b-badge--accent` `b-btn` `b-btn--ghost` `b-btn--primary` `b-btn--tinted` `b-code` `b-code__header` `b-field` `b-gap-2` `b-gap-3` `b-hstack` `b-input` `b-label` `b-stack` `b-stack--wrap`

```html
<div class="b-stack b-gap-3">
  <div class="b-hstack b-gap-2 b-stack--wrap">
    <button class="b-btn b-btn--primary">Deploy agent</button>
    <button class="b-btn b-btn--tinted">Configure</button>
    <button class="b-btn b-btn--ghost">Cancel</button>
    <span class="b-badge b-badge--accent">Live</span>
  </div>
  <div class="b-field" style="max-width: 22rem">
    <label class="b-label" for="brand-demo-input">Focus this field</label>
    <input class="b-input" id="brand-demo-input" type="text" placeholder="The ring follows the accent">
  </div>
</div>
```

```tsx
import { Badge, Button, Field, Input, Label } from "barua-ui";

<div className="b-stack b-gap-3">
  <div className="b-hstack b-gap-2 b-stack--wrap">
    <Button variant="primary">Deploy agent</Button>
    <Button variant="tinted">Configure</Button>
    <Button variant="ghost">Cancel</Button>
    <Badge variant="accent">Live</Badge>
  </div>
  <Field style={{ maxWidth: "22rem" }}>
    <Label htmlFor="brand-demo-input">Focus this field</Label>
    <Input id="brand-demo-input" type="text" placeholder="The ring follows the accent" />
  </Field>
</div>
```

## Check what your colour now collides with

This is the part that bites. Two system colours are defined in terms of the accent or sit close to it, and a brand colour can quietly erase a distinction the interface relies on.

- Documentation: https://ui.barua.tz/docs/theming.html#collisions
- Classes: `b-btn` `b-btn--danger` `b-btn--primary` `b-code` `b-code__header` `b-gap-2` `b-hstack` `b-stack--wrap` `b-table` `b-table-wrap`

```html
<div class="b-hstack b-gap-2 b-stack--wrap">
  <button class="b-btn b-btn--primary">Primary — your brand</button>
  <button class="b-btn b-btn--danger">Delete — still unmistakably not that</button>
</div>
```

```tsx
import { Button } from "barua-ui";

<div className="b-hstack b-gap-2 b-stack--wrap">
  <Button variant="primary">Primary — your brand</Button>
  <Button variant="danger">Delete — still unmistakably not that</Button>
</div>
```

## What not to override

Accent tokens are yours. The greyscale is not: --b-text , --b-text-secondary , --b-surface , --b-separator and the fills carry the contrast contract that every component is built against, in both themes at once. Change those and you are not theming the system, you are replacing its foundation — and the accessible contrast that came free stops being guaranteed.

- Documentation: https://ui.barua.tz/docs/theming.html#leave-alone

## Scope it when the colour means something

Overriding on :root themes the product. Putting the same tokens on a class themes a region — useful for a tenant, an environment banner, or one board among many. The tokens cascade, so anything inside picks them up.

- Documentation: https://ui.barua.tz/docs/theming.html#scoping
- Classes: `b-code` `b-code__header`

