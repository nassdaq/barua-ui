# Forms — fields, selects, switches, sliders, validation

Source: https://ui.barua.tz/docs/forms.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Text Field

The anatomy: a .b-field wraps a .b-label , the .b-input and an optional .b-help line. The label is always a real <label for> ; the placeholder only ever shows an example value.

- Documentation: https://ui.barua.tz/docs/forms.html#text-field
- Classes: `b-field` `b-help` `b-input` `b-input--filled` `b-input--lg` `b-input--sm` `b-label`

```html
<div class="b-field" style="max-width: 26rem">
  <label class="b-label" for="tf-name">Full name</label>
  <input class="b-input" id="tf-name" type="text" placeholder="Amina Salim"
         autocomplete="name" aria-describedby="tf-name-help">
  <p class="b-help" id="tf-name-help">Exactly as it appears on your national ID.</p>
</div>
```

```tsx
import { Field, Help, Input, Label } from "barua-ui";

<Field style={{ maxWidth: "26rem" }}>
  <Label htmlFor="tf-name">Full name</Label>
  <Input id="tf-name" type="text" placeholder="Amina Salim" autoComplete="name" aria-describedby="tf-name-help" />
  <Help id="tf-name-help">Exactly as it appears on your national ID.</Help>
</Field>
```

## Text Area

.b-textarea shares the input skin, starts around 5.5rem tall and resizes vertically only — the column never breaks.

- Documentation: https://ui.barua.tz/docs/forms.html#text-area
- Classes: `b-field` `b-help` `b-label` `b-textarea`

```html
<div class="b-field" style="max-width: 26rem">
  <label class="b-label" for="ta-message">Message</label>
  <textarea class="b-textarea" id="ta-message" rows="4"
            placeholder="Habari! I'd like a quote for delivery from Kariakoo to Mikocheni…"></textarea>
  <p class="b-help">Plain text. Drag the corner to make room.</p>
</div>
```

```tsx
import { Field, Help, Label, Textarea } from "barua-ui";

<Field style={{ maxWidth: "26rem" }}>
  <Label htmlFor="ta-message">Message</Label>
  <Textarea
    id="ta-message"
    rows="4"
    placeholder="Habari! I'd like a quote for delivery from Kariakoo to Mikocheni…"
  ></Textarea>
  <Help>Plain text. Drag the corner to make room.</Help>
</Field>
```

## Search Field

A .b-search wrapper turns the input into a filled pill; the .b-input-group positions icon and shortcut affixes. Affixes are click-through by default, and the input pads itself automatically when one is present.

- Documentation: https://ui.barua.tz/docs/forms.html#search-field
- Classes: `b-input` `b-input-affix` `b-input-affix--end` `b-input-affix--start` `b-input-group` `b-search`

```html
<div class="b-search" role="search" style="max-width: 26rem">
  <div class="b-input-group">
    <span class="b-input-affix b-input-affix--start">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="m13.2 13.2 3.3 3.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </span>
    <input class="b-input" type="search" placeholder="Search messages…" aria-label="Search messages">
    <span class="b-input-affix b-input-affix--end"><kbd>⌘K</kbd></span>
  </div>
</div>
```

```tsx
import { Input, InputGroup, SearchField } from "barua-ui";

<SearchField role="search" style={{ maxWidth: "26rem" }}>
  <InputGroup>
    <span className="b-input-affix b-input-affix--start">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="m13.2 13.2 3.3 3.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
    <Input type="search" placeholder="Search messages…" aria-label="Search messages" />
    <span className="b-input-affix b-input-affix--end">
      <kbd>⌘K</kbd>
    </span>
  </InputGroup>
</SearchField>
```

## Password Field

An end affix hosts a ghost icon button that swaps the input type . Buttons inside .b-input-affix--end regain pointer-events , so only the reveal is clickable — the rest of the affix stays inert.

- Documentation: https://ui.barua.tz/docs/forms.html#password-field
- Classes: `b-btn` `b-btn--ghost` `b-btn--sm` `b-field` `b-help` `b-icon-btn` `b-input` `b-input-affix` `b-input-affix--end` `b-input-group` `b-label`

```html
<div class="b-field" style="max-width: 26rem">
  <label class="b-label" for="pw">Password</label>
  <div class="b-input-group">
    <input class="b-input" id="pw" type="password" value="jambo-karibu-255"
           autocomplete="current-password" aria-describedby="pw-help">
    <span class="b-input-affix b-input-affix--end">
      <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" type="button" aria-label="Show password"
              onclick="const i=document.getElementById('pw');const s=i.type==='password';i.type=s?'text':'password';this.setAttribute('aria-label',s?'Hide password':'Show password')">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3.5c-4 0-6.5 4.5-6.5 6.5S6 16.5 10 16.5s6.5-4.5 6.5-6.5S14 3.5 10 3.5Z" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg>
      </button>
    </span>
  </div>
  <p class="b-help" id="pw-help">At least 12 characters. A phrase beats a puzzle.</p>
</div>
```

```tsx
import { Button, Field, Help, Input, InputGroup, Label } from "barua-ui";

<Field style={{ maxWidth: "26rem" }}>
  <Label htmlFor="pw">Password</Label>
  <InputGroup>
    <Input id="pw" type="password" value="jambo-karibu-255" autoComplete="current-password" aria-describedby="pw-help" />
    <span className="b-input-affix b-input-affix--end">
      <Button
        icon
        variant="ghost"
        size="sm"
        type="button"
        aria-label="Show password"
        onclick="const i=document.getElementById('pw');const s=i.type==='password';i.type=s?'text':'password';this.setAttribute('aria-label',s?'Hide password':'Show password')"
      >
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 3.5c-4 0-6.5 4.5-6.5 6.5S6 16.5 10 16.5s6.5-4.5 6.5-6.5S14 3.5 10 3.5Z" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </Button>
    </span>
  </InputGroup>
  <Help id="pw-help">At least 12 characters. A phrase beats a puzzle.</Help>
</Field>
```

## Specialized Fields

There is no separate component for numbers or URLs — each is the same Text Field with a different type , which buys the right mobile keyboard and free validation. Dates and times are the exception: their native popups are not ours, so they use the Barua pickers below instead.

- Documentation: https://ui.barua.tz/docs/forms.html#specialized-fields
- Classes: `b-field` `b-form-row` `b-input` `b-label`

```html
<div class="b-form-row">
<div class="b-field">
  <label class="b-label" for="sp-qty">Quantity</label>
  <input class="b-input" id="sp-qty" type="number" value="12" min="1" max="99">
</div>
<div class="b-field">
  <label class="b-label" for="sp-url">Website</label>
  <input class="b-input" id="sp-url" type="url" value="https://neurotech.africa" autocomplete="url">
</div>
<div class="b-field">
  <label class="b-label" for="sp-email">Email</label>
  <input class="b-input" id="sp-email" type="email" placeholder="amina@neurotech.africa" autocomplete="email">
</div>
</div>
```

```tsx
import { Field, FormRow, Input, Label } from "barua-ui";

<FormRow>
  <Field>
    <Label htmlFor="sp-qty">Quantity</Label>
    <Input id="sp-qty" type="number" value="12" min="1" max="99" />
  </Field>
  <Field>
    <Label htmlFor="sp-url">Website</Label>
    <Input id="sp-url" type="url" value="https://neurotech.africa" autoComplete="url" />
  </Field>
  <Field>
    <Label htmlFor="sp-email">Email</Label>
    <Input id="sp-email" type="email" placeholder="amina@neurotech.africa" autoComplete="email" />
  </Field>
</FormRow>
```

## Date & Time Picker

Native date and time inputs open the browser’s own popup — a surface the system cannot style, and the one thing on screen that will never look Barua. Product surfaces do not use them. Dates use the Barua date picker below: the field opens the system .b-calendar in a dropdown, the same pattern as any menu. Times use a menu select of slots. Native inputs remain only as a non-visual fallback where a picker UI truly cannot run.

- Documentation: https://ui.barua.tz/docs/forms.html#date-time-picker
- Classes: `b-btn` `b-btn--ghost` `b-btn--sm` `b-btn--tinted` `b-calendar` `b-calendar__day` `b-calendar__grid` `b-calendar__header` `b-calendar__month` `b-calendar__weekday` `b-dropdown` `b-field` `b-hstack` `b-icon-btn` `b-label` `b-menu` `b-menu__item` `b-select` `b-stack--between`

```html
<div class="b-field" style="max-width: 17rem">
  <span class="b-label" id="bdp-label">Travel date</span>
  <details class="b-dropdown">
    <summary class="b-select" aria-labelledby="bdp-label" style="display: flex; align-items: center; justify-content: space-between; gap: var(--b-space-2); cursor: pointer">
      <span data-b-date-display>28 Aug 2026</span>
      <svg viewBox="0 0 20 20" fill="none" width="16" height="16" aria-hidden="true"><rect x="3" y="4.5" width="14" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 8.5h14M7 3v3M13 3v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </summary>
    <div class="b-menu" style="padding: 0; min-width: 0">
      <div class="b-calendar" style="border: none">
        <div class="b-calendar__header">
          <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" aria-label="Previous month">‹</button>
          <span class="b-calendar__month">August 2026</span>
          <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" aria-label="Next month">›</button>
        </div>
        <div class="b-calendar__grid" role="grid" aria-label="August 2026">
          <span class="b-calendar__weekday">M</span><span class="b-calendar__weekday">T</span><span class="b-calendar__weekday">W</span><span class="b-calendar__weekday">T</span><span class="b-calendar__weekday">F</span><span class="
```

```tsx
import { Button, Calendar, CalendarGrid, CalendarHeader, CalendarMonth, CalendarWeekday, Dropdown, Field, Label, Menu, Select } from "barua-ui";

<Field style={{ maxWidth: "17rem" }}>
  <Label id="bdp-label">Travel date</Label>
  <Dropdown>
    <Select
      aria-labelledby="bdp-label"
      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--b-space-2)", cursor: "pointer" }}
    >
      <span data-b-date-display="">28 Aug 2026</span>
      <svg
        viewBox="0 0 20 20"
        fill="none"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <rect x="3" y="4.5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 8.5h14M7 3v3M13 3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </Select>
    <Menu style={{ padding: "0", minWidth: "0" }}>
      <Calendar style={{ border: "none" }}>
        <CalendarHeader>
          <Button icon variant="ghost" size="sm" aria-label="Previous month">‹</Button>
          <CalendarMonth>August 2026</CalendarMonth>
          <Button icon variant="ghost" size="sm" aria-label="Next month">›</Button>
        </CalendarHeader>
        <CalendarGrid role="grid" aria-label="August 2026">
          <CalendarWeekday>M</CalendarWeekday>
          <CalendarWeekday>T</CalendarWeekday>
          <CalendarWeekday>W</CalendarWeekday>
          <CalendarWeekday>T</CalendarWeekday>
          <CalendarWeekday>F</CalendarWeekday>
        </CalendarGrid>
      </Calendar>
    </Menu>
  </Dropdown>
</Field>
```

## Select

.b-select strips the platform chrome and draws its own chevron, so it matches the input family in both themes. It is still a native <select> — the picker sheet on iOS and the popup on macOS come along untouched.

- Documentation: https://ui.barua.tz/docs/forms.html#select
- Classes: `b-dropdown` `b-field` `b-help` `b-label` `b-menu` `b-menu__item` `b-select`

```html
<div class="b-field" style="max-width: 26rem">
  <label class="b-label" for="sel-region">Region</label>
  <!-- barua-lint disable native-select: documenting the platform control itself; product surfaces use the menu select above -->
  <select class="b-select" id="sel-region">
    <option value="" disabled>Choose a region…</option>
    <option selected>Dar es Salaam</option>
    <option>Arusha</option>
    <option>Dodoma</option>
    <option>Mwanza</option>
    <option>Zanzibar West</option>
  </select>
  <p class="b-help">Sets your default delivery zone.</p>
</div>
```

```tsx
import { Field, Help, Label, Select } from "barua-ui";

<Field style={{ maxWidth: "26rem" }}>
  <Label htmlFor="sel-region">Region</Label>
  <Select id="sel-region">
    <option value="" disabled>Choose a region…</option>
    <option selected>Dar es Salaam</option>
    <option>Arusha</option>
    <option>Dodoma</option>
    <option>Mwanza</option>
    <option>Zanzibar West</option>
  </Select>
  <Help>Sets your default delivery zone.</Help>
</Field>
```

## Combobox & Autocomplete

A .b-combobox pairs a .b-input with an anchored .b-combobox__list . The previously chosen option carries aria-selected="true" ; the option the arrow keys are resting on gets .is-active . Both lists are pinned open here for show — your JS toggles them.

- Documentation: https://ui.barua.tz/docs/forms.html#combobox-autocomplete
- Classes: `b-combobox` `b-combobox__empty` `b-combobox__list` `b-combobox__option` `b-field` `b-input` `b-label`

```html
<div class="b-field" style="width: 18rem">
  <label class="b-label" for="cb-region">Region</label>
  <div class="b-combobox">
    <input class="b-input" id="cb-region" type="text" value="M" role="combobox"
           aria-expanded="true" aria-controls="cb-region-list" aria-autocomplete="list"
           aria-activedescendant="cb-opt-morogoro" autocomplete="off">
    <ul class="b-combobox__list" id="cb-region-list" role="listbox" aria-label="Regions">
      <li class="b-combobox__option" id="cb-opt-mwanza" role="option" aria-selected="true">Mwanza</li>
      <li class="b-combobox__option is-active" id="cb-opt-morogoro" role="option" aria-selected="false">Morogoro</li>
      <li class="b-combobox__option" role="option" aria-selected="false">Mtwara</li>
      <li class="b-combobox__option" role="option" aria-selected="false">Mara</li>
      <li class="b-combobox__option" role="option" aria-selected="false">Manyara</li>
    </ul>
  </div>
</div>
<div class="b-field" style="width: 18rem">
  <label class="b-label" for="cb-none">Region</label>
  <div class="b-combobox">
    <input class="b-input" id="cb-none" type="text" value="Nairobi" role="combobox"
           aria-expanded="true" aria-controls="cb-none-list" aria-autocomplete="list" autocomplete="off">
    <ul class="b-combobox__list" id="cb-none-list" role="listbox" aria-label="Regions">
      <li class="b-combobox__empty">No Tan
```

```tsx
import { Combobox, ComboboxEmpty, ComboboxList, Field, Input, Label } from "barua-ui";

<Field style={{ width: "18rem" }}>
  <Label htmlFor="cb-region">Region</Label>
  <Combobox>
    <Input id="cb-region" type="text" value="M" role="combobox" aria-expanded="true" aria-controls="cb-region-list" aria-autocomplete="list" aria-activedescendant="cb-opt-morogoro" autoComplete="off" />
    <ComboboxList id="cb-region-list" role="listbox" aria-label="Regions">
      <li
        className="b-combobox__option"
        id="cb-opt-mwanza"
        role="option"
        aria-selected="true"
      >
        Mwanza
      </li>
      <li
        className="b-combobox__option is-active"
        id="cb-opt-morogoro"
        role="option"
        aria-selected="false"
      >
        Morogoro
      </li>
      <li className="b-combobox__option" role="option" aria-selected="false">Mtwara</li>
      <li className="b-combobox__option" role="option" aria-selected="false">Mara</li>
      <li className="b-combobox__option" role="option" aria-selected="false">Manyara</li>
    </ComboboxList>
  </Combobox>
</Field>
<Field style={{ width: "18rem" }}>
  <Label htmlFor="cb-none">Region</Label>
  <Combobox>
    <Input id="cb-none" type="text" value="Nairobi" role="combobox" aria-expanded="true" aria-controls="cb-none-list" aria-autocomplete="list" autoComplete="off" />
    <ComboboxList id="cb-none-list" role="listbox" aria-label="Regions">
      <ComboboxEmpty>No Tan</ComboboxEmpty>
    </ComboboxList>
  </Combobox>
</Field>
```

## Checkbox

A styled native checkbox inside its own label — no wrapper ids, no for/id bookkeeping. Indeterminate is a JavaScript-only state: set input.indeterminate = true on a parent whose children disagree, as the tiny script below does.

- Documentation: https://ui.barua.tz/docs/forms.html#checkbox
- Classes: `b-checkbox`

```html
<label class="b-checkbox"><input type="checkbox" id="chk-districts"> Deliver across Dar es Salaam</label>
<label class="b-checkbox"><input type="checkbox" checked> Ilala district</label>
<label class="b-checkbox"><input type="checkbox"> Kinondoni district</label>
<label class="b-checkbox"><input type="checkbox" disabled> Temeke district (coming soon)</label>
<script>document.getElementById("chk-districts").indeterminate = true</script>
```

```tsx
import { Checkbox } from "barua-ui";

<Checkbox>
  <input type="checkbox" id="chk-districts" />
  Deliver across Dar es Salaam
</Checkbox>
<Checkbox>
  <input type="checkbox" checked />
  Ilala district
</Checkbox>
<Checkbox>
  <input type="checkbox" />
  Kinondoni district
</Checkbox>
<Checkbox>
  <input type="checkbox" disabled />
  Temeke district (coming soon)
</Checkbox>
<script>document.getElementById("chk-districts").indeterminate = true</script>
```

## Radio Button

Radios travel in groups, and the group needs a name of its own — wrap it in a .b-fieldset with a legend so the question is announced before the options.

- Documentation: https://ui.barua.tz/docs/forms.html#radio-button
- Classes: `b-fieldset` `b-radio`

```html
<fieldset class="b-fieldset">
  <legend>Payment method</legend>
  <label class="b-radio"><input type="radio" name="pay" checked> M-Pesa</label>
  <label class="b-radio"><input type="radio" name="pay"> Airtel Money</label>
  <label class="b-radio"><input type="radio" name="pay"> Mixx by Yas</label>
  <label class="b-radio"><input type="radio" name="pay"> Card — Visa or Mastercard</label>
</fieldset>
```

```tsx
import { Fieldset, Radio } from "barua-ui";

<Fieldset>
  <legend>Payment method</legend>
  <Radio>
    <input type="radio" name="pay" checked />
    M-Pesa
  </Radio>
  <Radio>
    <input type="radio" name="pay" />
    Airtel Money
  </Radio>
  <Radio>
    <input type="radio" name="pay" />
    Mixx by Yas
  </Radio>
  <Radio>
    <input type="radio" name="pay" />
    Card — Visa or Mastercard
  </Radio>
</Fieldset>
```

## Toggle Switch

An iOS-grade .b-switch with a sprung thumb. Use it for settings that take effect immediately; if the choice is submitted with the rest of a form, that is a checkbox.

- Documentation: https://ui.barua.tz/docs/forms.html#toggle-switch
- Classes: `b-switch` `b-switch--sm`

```html
<label class="b-switch"><input type="checkbox" checked> Read receipts</label>
<label class="b-switch"><input type="checkbox"> Auto-archive promotions</label>
<label class="b-switch b-switch--sm"><input type="checkbox" checked> Compact inbox</label>
<label class="b-switch"><input type="checkbox" checked disabled> End-to-end encryption — always on</label>
```

```tsx
import { Switch } from "barua-ui";

<Switch>
  <input type="checkbox" checked />
  Read receipts
</Switch>
<Switch>
  <input type="checkbox" />
  Auto-archive promotions
</Switch>
<Switch small>
  <input type="checkbox" checked />
  Compact inbox
</Switch>
<Switch>
  <input type="checkbox" checked disabled />
  End-to-end encryption — always on
</Switch>
```

## Slider

input.b-slider is a native range input with an accent fill. barua.js finds every one and keeps --b-slider-fill in sync as the thumb moves, normalising against whatever min / max you set.

- Documentation: https://ui.barua.tz/docs/forms.html#slider
- Classes: `b-field` `b-help` `b-label` `b-slider`

```html
<div class="b-field" style="max-width: 26rem">
  <label class="b-label" for="sl-volume">Volume</label>
  <input class="b-slider" id="sl-volume" type="range" min="0" max="100" value="65">
</div>
<div class="b-field" style="max-width: 26rem">
  <label class="b-label" for="sl-font">Font size</label>
  <input class="b-slider" id="sl-font" type="range" min="12" max="24" step="1" value="16">
  <p class="b-help">12–24 px. The fill is computed from min/max, not the raw value.</p>
</div>
```

```tsx
import { Field, Help, Label, Slider } from "barua-ui";

<Field style={{ maxWidth: "26rem" }}>
  <Label htmlFor="sl-volume">Volume</Label>
  <Slider id="sl-volume" type="range" min="0" max="100" value="65" />
</Field>
<Field style={{ maxWidth: "26rem" }}>
  <Label htmlFor="sl-font">Font size</Label>
  <Slider id="sl-font" type="range" min="12" max="24" step="1" value="16" />
  <Help>12–24 px. The fill is computed from min/max, not the raw value.</Help>
</Field>
```

## Range Slider

Two native range inputs overlaid in a .b-range : the track is drawn by the wrapper, the thumbs stay interactive, and the .b-range__fill bar between them is positioned inline — here statically, in production from your input handler.

- Documentation: https://ui.barua.tz/docs/forms.html#range-slider
- Classes: `b-field` `b-help` `b-label` `b-range` `b-range__fill`

```html
<div class="b-field" style="max-width: 26rem">
  <span class="b-label" id="rs-label">Price range</span>
  <div class="b-range" role="group" aria-labelledby="rs-label">
    <div class="b-range__fill" style="inset-inline-start: 20%; width: 45%"></div>
    <input type="range" min="0" max="100000" step="5000" value="20000" aria-label="Minimum price">
    <input type="range" min="0" max="100000" step="5000" value="65000" aria-label="Maximum price">
  </div>
  <p class="b-help">TZS 20,000 – TZS 65,000</p>
</div>
```

```tsx
import { Field, Help, Label, Range } from "barua-ui";

<Field style={{ maxWidth: "26rem" }}>
  <Label id="rs-label">Price range</Label>
  <Range role="group" aria-labelledby="rs-label">
    <div
      className="b-range__fill"
      style={{ insetInlineStart: "20%", width: "45%" }}
    ></div>
    <input type="range" min="0" max="100000" step="5000" value="20000" aria-label="Minimum price" />
    <input type="range" min="0" max="100000" step="5000" value="65000" aria-label="Maximum price" />
  </Range>
  <Help>TZS 20,000 – TZS 65,000</Help>
</Field>
```

## Stepper Input

A .b-stepper-input is a number input flanked by − and + buttons. barua.js wires the pair automatically, honouring min , max and step — no data attributes required.

- Documentation: https://ui.barua.tz/docs/forms.html#stepper-input
- Classes: `b-field` `b-label` `b-stepper-input`

```html
<div class="b-field">
  <label class="b-label" for="st-passengers">Passengers</label>
  <div class="b-stepper-input">
    <button type="button" aria-label="Fewer passengers">−</button>
    <input id="st-passengers" type="number" value="2" min="1" max="10">
    <button type="button" aria-label="More passengers">+</button>
  </div>
</div>
<div class="b-field">
  <label class="b-label" for="st-copies">Print copies</label>
  <div class="b-stepper-input">
    <button type="button" aria-label="Fewer copies">−</button>
    <input id="st-copies" type="number" value="15" min="5" max="50" step="5">
    <button type="button" aria-label="More copies">+</button>
  </div>
</div>
```

```tsx
import { Field, Label, StepperInput } from "barua-ui";

<Field>
  <Label htmlFor="st-passengers">Passengers</Label>
  <StepperInput>
    <button type="button" aria-label="Fewer passengers">−</button>
    <input id="st-passengers" type="number" value="2" min="1" max="10" />
    <button type="button" aria-label="More passengers">+</button>
  </StepperInput>
</Field>
<Field>
  <Label htmlFor="st-copies">Print copies</Label>
  <StepperInput>
    <button type="button" aria-label="Fewer copies">−</button>
    <input id="st-copies" type="number" value="15" min="5" max="50" step="5" />
    <button type="button" aria-label="More copies">+</button>
  </StepperInput>
</Field>
```

## File Upload

The .b-upload dropzone is a label wrapping a hidden file input, so clicking anywhere opens the picker. Add .is-dragover from your dragenter handler to light it up, and list accepted files as .b-upload-item rows.

- Documentation: https://ui.barua.tz/docs/forms.html#file-upload
- Classes: `b-btn` `b-btn--ghost` `b-btn--sm` `b-icon-btn` `b-upload` `b-upload-item` `b-upload-item__meta` `b-upload-item__name` `b-upload-item__size` `b-upload-item__thumb` `b-upload__hint`

```html
<label class="b-upload" style="max-width: 26rem">
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 16V8m0 0-3 3m3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 18.5a4.5 4.5 0 0 1-.42-8.98 5.5 5.5 0 0 1 10.84 0A4.5 4.5 0 0 1 17 18.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  <span><strong>Choose files</strong> or drag them here</span>
  <span class="b-upload__hint">PDF, PNG or JPG · up to 10 MB each</span>
  <input type="file" multiple accept=".pdf,.png,.jpg,.jpeg">
</label>
<div class="b-upload-item" style="max-width: 26rem">
  <div class="b-upload-item__thumb" aria-hidden="true"></div>
  <div class="b-upload-item__meta">
    <div class="b-upload-item__name">zanzibar-ferry-eticket.pdf</div>
    <div class="b-upload-item__size">1.2 MB</div>
  </div>
  <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" type="button" aria-label="Remove zanzibar-ferry-eticket.pdf">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5.5 5.5 9 9m0-9-9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  </button>
</div>
<div class="b-upload-item" style="max-width: 26rem">
  <div class="b-upload-item__thumb" aria-hidden="true"></div>
  <div class="b-upload-item__meta">
    <div class="b-upload-item__name">amina-profile-photo.jpg</div>
    <
```

```tsx
import { Button, Upload, UploadItem } from "barua-ui";

<Upload style={{ maxWidth: "26rem" }}>
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 16V8m0 0-3 3m3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 18.5a4.5 4.5 0 0 1-.42-8.98 5.5 5.5 0 0 1 10.84 0A4.5 4.5 0 0 1 17 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
  <span>
    <strong>Choose files</strong>
    or drag them here
  </span>
  <span className="b-upload__hint">PDF, PNG or JPG · up to 10 MB each</span>
  <input type="file" multiple accept=".pdf,.png,.jpg,.jpeg" />
</Upload>
<UploadItem style={{ maxWidth: "26rem" }}>
  <div className="b-upload-item__thumb" aria-hidden="true"></div>
  <div className="b-upload-item__meta">
    <div className="b-upload-item__name">zanzibar-ferry-eticket.pdf</div>
    <div className="b-upload-item__size">1.2 MB</div>
  </div>
  <Button
    icon
    variant="ghost"
    size="sm"
    type="button"
    aria-label="Remove zanzibar-ferry-eticket.pdf"
  >
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m5.5 5.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </Button>
</UploadItem>
<UploadItem style={{ maxWidth: "26rem" }}>
  <div className="b-upload-item__thumb" aria-hidden="true"></div>
  <div className="b-upload-item__meta">
    <div className="b-upload-item__name">amina-profile-photo.jpg</div>
  </div>
</UploadItem>
```

## Color Picker

A native input[type=color] dressed to sit beside the other controls, plus a .b-swatches row for presets — mark the current one with .is-selected .

- Documentation: https://ui.barua.tz/docs/forms.html#color-picker
- Classes: `b-color-picker` `b-field` `b-label` `b-swatch` `b-swatches`

```html
<div class="b-field">
  <label class="b-label" for="cp-brand">Brand color</label>
  <div class="b-color-picker">
    <input type="color" id="cp-brand" value="#0a84ff">
    <div class="b-swatches" role="group" aria-label="Preset colors">
      <button class="b-swatch is-selected" type="button" style="background: #0a84ff" aria-label="Blue" aria-pressed="true"></button>
      <button class="b-swatch" type="button" style="background: #30d158" aria-label="Green" aria-pressed="false"></button>
      <button class="b-swatch" type="button" style="background: #ff9f0a" aria-label="Orange" aria-pressed="false"></button>
      <button class="b-swatch" type="button" style="background: #ff375f" aria-label="Pink" aria-pressed="false"></button>
      <button class="b-swatch" type="button" style="background: #bf5af2" aria-label="Purple" aria-pressed="false"></button>
      <button class="b-swatch" type="button" style="background: #64d2ff" aria-label="Cyan" aria-pressed="false"></button>
    </div>
  </div>
</div>
```

```tsx
import { Field, Label, Swatch, Swatches } from "barua-ui";

<Field>
  <Label htmlFor="cp-brand">Brand color</Label>
  <div className="b-color-picker">
    <input type="color" id="cp-brand" value="#0a84ff" />
    <Swatches role="group" aria-label="Preset colors">
      <Swatch
        selected
        type="button"
        style={{ background: "#0a84ff" }}
        aria-label="Blue"
        aria-pressed="true"
      ></Swatch>
      <Swatch
        type="button"
        style={{ background: "#30d158" }}
        aria-label="Green"
        aria-pressed="false"
      ></Swatch>
      <Swatch
        type="button"
        style={{ background: "#ff9f0a" }}
        aria-label="Orange"
        aria-pressed="false"
      ></Swatch>
      <Swatch
        type="button"
        style={{ background: "#ff375f" }}
        aria-label="Pink"
        aria-pressed="false"
      ></Swatch>
      <Swatch
        type="button"
        style={{ background: "#bf5af2" }}
        aria-label="Purple"
        aria-pressed="false"
      ></Swatch>
      <Swatch
        type="button"
        style={{ background: "#64d2ff" }}
        aria-label="Cyan"
        aria-pressed="false"
      ></Swatch>
    </Swatches>
  </div>
</Field>
```

## Form Structure

.b-form stacks .b-form-section cards, each with a header, its fields, and rows that auto-flow into columns when there is at least 14rem to spare. .b-form-actions aligns trailing, like a macOS sheet.

- Documentation: https://ui.barua.tz/docs/forms.html#form-structure
- Classes: `b-btn` `b-btn--primary` `b-field` `b-form` `b-form-actions` `b-form-row` `b-form-section` `b-form-section__desc` `b-form-section__header` `b-form-section__title` `b-help` `b-input` `b-label` `b-label--required` `b-optional` `b-select` `b-switch` `b-textarea`

```html
<form class="b-form" onsubmit="event.preventDefault()">
  <div class="b-form-section">
    <div class="b-form-section__header">
      <div class="b-form-section__title">Profile settings</div>
      <p class="b-form-section__desc">How you appear across Barua apps.</p>
    </div>
    <div class="b-form-row">
      <div class="b-field">
        <label class="b-label" for="ps-first">First name</label>
        <input class="b-input" id="ps-first" type="text" value="Amina" autocomplete="given-name">
      </div>
      <div class="b-field">
        <label class="b-label" for="ps-last">Last name</label>
        <input class="b-input" id="ps-last" type="text" value="Salim" autocomplete="family-name">
      </div>
    </div>
    <div class="b-field">
      <label class="b-label b-label--required" for="ps-email">Work email</label>
      <input class="b-input" id="ps-email" type="email" value="amina@neurotech.africa" required autocomplete="email">
      <p class="b-help">Used for sign-in and receipts.</p>
    </div>
    <div class="b-form-row">
      <div class="b-field">
        <label class="b-label" for="ps-phone">Phone</label>
        <input class="b-input" id="ps-phone" type="tel" value="+255 754 123 456" autocomplete="tel">
      </div>
      <div class="b-field">
        <label class="b-label" for="ps-city">City</label>
        <!-- barua-lint disable native-select: documenting the 
```

```tsx
import { Field, Form, FormRow, FormSection, Help, Input, Label } from "barua-ui";

<Form onsubmit="event.preventDefault()">
  <FormSection>
    <div className="b-form-section__header">
      <div className="b-form-section__title">Profile settings</div>
      <p className="b-form-section__desc">How you appear across Barua apps.</p>
    </div>
    <FormRow>
      <Field>
        <Label htmlFor="ps-first">First name</Label>
        <Input id="ps-first" type="text" value="Amina" autoComplete="given-name" />
      </Field>
      <Field>
        <Label htmlFor="ps-last">Last name</Label>
        <Input id="ps-last" type="text" value="Salim" autoComplete="family-name" />
      </Field>
    </FormRow>
    <Field>
      <Label className="b-label--required" htmlFor="ps-email">Work email</Label>
      <Input id="ps-email" type="email" value="amina@neurotech.africa" required autoComplete="email" />
      <Help>Used for sign-in and receipts.</Help>
    </Field>
    <FormRow>
      <Field>
        <Label htmlFor="ps-phone">Phone</Label>
        <Input id="ps-phone" type="tel" value="+255 754 123 456" autoComplete="tel" />
      </Field>
      <Field>
        <Label htmlFor="ps-city">City</Label>
      </Field>
    </FormRow>
  </FormSection>
</Form>
```

## Labels & Help

Required fields get .b-label--required , which appends a red asterisk; genuinely optional ones say so with a .b-optional span. When most of a form is required, mark the optional few instead of starring everything. Keep .b-help to one calm sentence.

- Documentation: https://ui.barua.tz/docs/forms.html#labels-help
- Classes: `b-field` `b-help` `b-input` `b-label` `b-label--required` `b-optional`

```html
<div class="b-field" style="max-width: 26rem">
  <label class="b-label b-label--required" for="lh-tin">TIN</label>
  <input class="b-input" id="lh-tin" type="text" inputmode="numeric" placeholder="123-456-789"
         required aria-describedby="lh-tin-help">
  <p class="b-help" id="lh-tin-help">9 digits, as issued by the Tanzania Revenue Authority.</p>
</div>
<div class="b-field" style="max-width: 26rem">
  <label class="b-label" for="lh-instagram">Instagram <span class="b-optional">(optional)</span></label>
  <input class="b-input" id="lh-instagram" type="text" placeholder="@duka.langu">
</div>
```

```tsx
import { Field, Help, Input, Label, Optional } from "barua-ui";

<Field style={{ maxWidth: "26rem" }}>
  <Label className="b-label--required" htmlFor="lh-tin">TIN</Label>
  <Input id="lh-tin" type="text" inputMode="numeric" placeholder="123-456-789" required aria-describedby="lh-tin-help" />
  <Help id="lh-tin-help">9 digits, as issued by the Tanzania Revenue Authority.</Help>
</Field>
<Field style={{ maxWidth: "26rem" }}>
  <Label htmlFor="lh-instagram">
    Instagram
    <Optional>(optional)</Optional>
  </Label>
  <Input id="lh-instagram" type="text" placeholder="@duka.langu" />
</Field>
```

## Validation

Add .is-invalid to the field and swap the help line for a .b-error — border, focus ring and message all turn danger together. .is-valid confirms with a success border. Prefer no class at all where you can: .b-input:user-invalid picks up the danger border only after the person has actually touched the field, so a pristine form never opens covered in red.

- Documentation: https://ui.barua.tz/docs/forms.html#validation
- Classes: `b-error` `b-field` `b-help` `b-input` `b-label`

```html
<div class="b-field is-invalid" style="max-width: 26rem">
  <label class="b-label" for="v-phone">Phone number</label>
  <input class="b-input" id="v-phone" type="tel" value="0754 123" autocomplete="tel"
         aria-invalid="true" aria-describedby="v-phone-error">
  <p class="b-error" id="v-phone-error">
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.25" stroke="currentColor" stroke-width="1.5"/><path d="M10 6.5v4m0 2.8v.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    Enter the full number, e.g. +255 754 123 456.
  </p>
</div>
<div class="b-field is-valid" style="max-width: 26rem">
  <label class="b-label" for="v-email">Email</label>
  <input class="b-input" id="v-email" type="email" value="amina@neurotech.africa"
         aria-describedby="v-email-help">
  <p class="b-help" id="v-email-help">Looks good — we'll send a confirmation here.</p>
</div>
```

```tsx
import { ErrorText, Field, Help, Input, Label } from "barua-ui";

<Field invalid style={{ maxWidth: "26rem" }}>
  <Label htmlFor="v-phone">Phone number</Label>
  <Input id="v-phone" type="tel" value="0754 123" autoComplete="tel" aria-invalid="true" aria-describedby="v-phone-error" />
  <ErrorText id="v-phone-error">
    <svg
      viewBox="0 0 20 20"
      width="14"
      height="14"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6.5v4m0 2.8v.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    Enter the full number, e.g. +255 754 123 456.
  </ErrorText>
</Field>
<Field className="is-valid" style={{ maxWidth: "26rem" }}>
  <Label htmlFor="v-email">Email</Label>
  <Input id="v-email" type="email" value="amina@neurotech.africa" aria-describedby="v-email-help" />
  <Help id="v-email-help">Looks good — we'll send a confirmation here.</Help>
</Field>
```

