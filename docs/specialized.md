# Specialized — calendars, pickers, file browser

Source: https://ui.barua.tz/docs/specialized.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Command Palette

The .b-cmdk glass palette — full behaviour, ⌘K wiring and filtering live in Navigation › Command Menu . Shown here as a static snapshot of the anatomy: input, grouped list, active item, footer hints.

- Documentation: https://ui.barua.tz/docs/specialized.html#command-palette
- Classes: `b-cmdk` `b-cmdk__footer` `b-cmdk__group-label` `b-cmdk__input` `b-cmdk__item` `b-cmdk__list`

```html
<div class="b-cmdk">
  <input class="b-cmdk__input" type="search" placeholder="Type a command or search…">
  <ul class="b-cmdk__list">
    <li class="b-cmdk__group-label">Actions</li>
    <li><button class="b-cmdk__item is-active">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      New invoice<kbd>⌘N</kbd>
    </button></li>
    <li><button class="b-cmdk__item">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
      Assign to Amina Hassan<kbd>⌘⇧A</kbd>
    </button></li>
    <li class="b-cmdk__group-label">Go to</li>
    <li><button class="b-cmdk__item">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" stroke-width="1.5"/></svg>
      Dar es Salaam branch
    </button></li>
  </ul>
  <div class="b-cmdk__footer"><span><kbd>↑↓</kbd> navigate</span><span><kbd>↵</kbd> select</span><span><kbd>esc</kbd> close</span></div>
</div>
```

```tsx
import { CommandFooter, CommandGroupLabel, CommandList, CommandPalette } from "barua-ui";

<CommandPalette>
  <input className="b-cmdk__input" type="search" placeholder="Type a command or search…" />
  <CommandList>
    <CommandGroupLabel>Actions</CommandGroupLabel>
    <li>
      <button className="b-cmdk__item is-active">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        New invoice
        <kbd>⌘N</kbd>
      </button>
    </li>
    <li>
      <button className="b-cmdk__item">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        Assign to Amina Hassan
        <kbd>⌘⇧A</kbd>
      </button>
    </li>
    <CommandGroupLabel>Go to</CommandGroupLabel>
    <li>
      <button className="b-cmdk__item">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        Dar es Salaam branch
      </button>
    </li>
  </CommandList>
  <CommandFooter>
    <span>
      <kbd>↑↓</kbd>
      navigate
    </span>
    <span>
      <kbd>↵</kbd>
      select
    </span>
    <span>
      <kbd>esc</kbd>
      close
    </span>
  </CommandFooter>
</CommandPalette>
```

## Calendar

A full month panel. .b-calendar__header pairs the month label with ghost icon buttons; the __grid lays seven __weekday cells over circular __day buttons. Neighbouring-month days take .is-muted , today takes .is-today plus aria-current="date" , and unavailable days are simply disabled .

- Documentation: https://ui.barua.tz/docs/specialized.html#calendar
- Classes: `b-btn` `b-btn--ghost` `b-btn--sm` `b-calendar` `b-calendar__day` `b-calendar__grid` `b-calendar__header` `b-calendar__month` `b-calendar__weekday` `b-icon-btn`

```html
<div class="b-calendar">
  <div class="b-calendar__header">
    <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" aria-label="Previous month">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m12 5-5 5 5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <span class="b-calendar__month">October 2026</span>
    <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" aria-label="Next month">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m8 5 5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  </div>
  <div class="b-calendar__grid">
    <div class="b-calendar__weekday">Mo</div>
    <div class="b-calendar__weekday">Tu</div>
    <div class="b-calendar__weekday">We</div>
    <div class="b-calendar__weekday">Th</div>
    <div class="b-calendar__weekday">Fr</div>
    <div class="b-calendar__weekday">Sa</div>
    <div class="b-calendar__weekday">Su</div>
    <button class="b-calendar__day is-muted">28</button>
    <button class="b-calendar__day is-muted">29</button>
    <button class="b-calendar__day is-muted">30</button>
    <button class="b-calendar__day">1</button>
    <button class="b-calendar__day">2</button>
    <button class="b-calendar__day">3</button>
    <button class="b-calendar__day">4</butt
```

```tsx
import { Button, Calendar, CalendarGrid, CalendarHeader, CalendarMonth, CalendarWeekday } from "barua-ui";

<Calendar>
  <CalendarHeader>
    <Button icon variant="ghost" size="sm" aria-label="Previous month">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="m12 5-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Button>
    <CalendarMonth>October 2026</CalendarMonth>
    <Button icon variant="ghost" size="sm" aria-label="Next month">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="m8 5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Button>
  </CalendarHeader>
  <CalendarGrid>
    <CalendarWeekday>Mo</CalendarWeekday>
    <CalendarWeekday>Tu</CalendarWeekday>
    <CalendarWeekday>We</CalendarWeekday>
    <CalendarWeekday>Th</CalendarWeekday>
    <CalendarWeekday>Fr</CalendarWeekday>
    <CalendarWeekday>Sa</CalendarWeekday>
    <CalendarWeekday>Su</CalendarWeekday>
    <button className="b-calendar__day is-muted">28</button>
    <button className="b-calendar__day is-muted">29</button>
    <button className="b-calendar__day is-muted">30</button>
    <button className="b-calendar__day">1</button>
    <button className="b-calendar__day">2</button>
    <button className="b-calendar__day">3</button>
    <button className="b-calendar__day">4</button>
  </CalendarGrid>
</Calendar>
```

## Date Range

The same calendar expresses a span: solid endpoints get .is-range-start / .is-range-end (squared on the inner edge), and every day between takes .is-in-range for a continuous soft-accent band.

- Documentation: https://ui.barua.tz/docs/specialized.html#date-range
- Classes: `b-btn` `b-btn--ghost` `b-btn--sm` `b-calendar` `b-calendar__day` `b-calendar__grid` `b-calendar__header` `b-calendar__month` `b-calendar__weekday` `b-icon-btn`

```html
<div class="b-calendar">
  <div class="b-calendar__header">
    <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" aria-label="Previous month">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m12 5-5 5 5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <span class="b-calendar__month">October 2026</span>
    <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" aria-label="Next month">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m8 5 5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  </div>
  <div class="b-calendar__grid">
    <div class="b-calendar__weekday">Mo</div>
    <div class="b-calendar__weekday">Tu</div>
    <div class="b-calendar__weekday">We</div>
    <div class="b-calendar__weekday">Th</div>
    <div class="b-calendar__weekday">Fr</div>
    <div class="b-calendar__weekday">Sa</div>
    <div class="b-calendar__weekday">Su</div>
    <button class="b-calendar__day is-muted">28</button>
    <button class="b-calendar__day is-muted">29</button>
    <button class="b-calendar__day is-muted">30</button>
    <button class="b-calendar__day">1</button>
    <button class="b-calendar__day">2</button>
    <button class="b-calendar__day">3</button>
    <button class="b-calendar__day">4</butt
```

```tsx
import { Button, Calendar, CalendarGrid, CalendarHeader, CalendarMonth, CalendarWeekday } from "barua-ui";

<Calendar>
  <CalendarHeader>
    <Button icon variant="ghost" size="sm" aria-label="Previous month">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="m12 5-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Button>
    <CalendarMonth>October 2026</CalendarMonth>
    <Button icon variant="ghost" size="sm" aria-label="Next month">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="m8 5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Button>
  </CalendarHeader>
  <CalendarGrid>
    <CalendarWeekday>Mo</CalendarWeekday>
    <CalendarWeekday>Tu</CalendarWeekday>
    <CalendarWeekday>We</CalendarWeekday>
    <CalendarWeekday>Th</CalendarWeekday>
    <CalendarWeekday>Fr</CalendarWeekday>
    <CalendarWeekday>Sa</CalendarWeekday>
    <CalendarWeekday>Su</CalendarWeekday>
    <button className="b-calendar__day is-muted">28</button>
    <button className="b-calendar__day is-muted">29</button>
    <button className="b-calendar__day is-muted">30</button>
    <button className="b-calendar__day">1</button>
    <button className="b-calendar__day">2</button>
    <button className="b-calendar__day">3</button>
    <button className="b-calendar__day">4</button>
  </CalendarGrid>
</Calendar>
```

## Date Picker

.b-datepicker is a field that grows a calendar. Compose a .b-input-group with a leading calendar affix; when open, append a .b-calendar directly inside the wrapper — it drops beneath the field as an elevated popover ( position: absolute , --b-elevation-4 , popover z-index) with zero extra wiring.

- Documentation: https://ui.barua.tz/docs/specialized.html#date-picker
- Classes: `b-datepicker` `b-input` `b-input-affix` `b-input-affix--start` `b-input-group`

```html
<div class="b-datepicker">
  <div class="b-input-group">
    <span class="b-input-affix b-input-affix--start">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3" y="4.5" width="14" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 8.5h14M7 3v3m6-3v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </span>
    <input class="b-input" type="text" value="26 Aug 2026" aria-label="Invoice date" style="max-width: 14rem;">
  </div>
</div>
```

```tsx
import { DatePicker, Input, InputGroup } from "barua-ui";

<DatePicker>
  <InputGroup>
    <span className="b-input-affix b-input-affix--start">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="4.5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 8.5h14M7 3v3m6-3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
    <Input type="text" value="26 Aug 2026" aria-label="Invoice date" style={{ maxWidth: "14rem" }} />
  </InputGroup>
</DatePicker>
```

## Color Picker

The native .b-color-picker input and full field patterns are documented in Forms › Color Picker . For constrained palettes, a row of .b-swatches is usually the better control — pass each swatch its colour and mark the choice with .is-selected .

- Documentation: https://ui.barua.tz/docs/specialized.html#color-picker
- Classes: `b-swatch` `b-swatches`

```html
<div class="b-swatches">
  <button class="b-swatch" style="background: var(--b-color-red)" aria-label="Red"></button>
  <button class="b-swatch" style="background: var(--b-color-orange)" aria-label="Orange"></button>
  <button class="b-swatch" style="background: var(--b-color-yellow)" aria-label="Yellow"></button>
  <button class="b-swatch" style="background: var(--b-color-green)" aria-label="Green"></button>
  <button class="b-swatch" style="background: var(--b-color-teal)" aria-label="Teal"></button>
  <button class="b-swatch is-selected" style="background: var(--b-color-blue)" aria-label="Blue" aria-pressed="true"></button>
  <button class="b-swatch" style="background: var(--b-color-purple)" aria-label="Purple"></button>
  <button class="b-swatch" style="background: var(--b-color-pink)" aria-label="Pink"></button>
</div>
```

```tsx
import { Swatch, Swatches } from "barua-ui";

<Swatches>
  <Swatch style={{ background: "var(--b-color-red)" }} aria-label="Red"></Swatch>
  <Swatch style={{ background: "var(--b-color-orange)" }} aria-label="Orange"></Swatch>
  <Swatch style={{ background: "var(--b-color-yellow)" }} aria-label="Yellow"></Swatch>
  <Swatch style={{ background: "var(--b-color-green)" }} aria-label="Green"></Swatch>
  <Swatch style={{ background: "var(--b-color-teal)" }} aria-label="Teal"></Swatch>
  <Swatch
    selected
    style={{ background: "var(--b-color-blue)" }}
    aria-label="Blue"
    aria-pressed="true"
  ></Swatch>
  <Swatch style={{ background: "var(--b-color-purple)" }} aria-label="Purple"></Swatch>
  <Swatch style={{ background: "var(--b-color-pink)" }} aria-label="Pink"></Swatch>
</Swatches>
```

## Emoji Picker

A compact .b-emoji-picker panel: small search field on top, then a scrollable eight-column __grid of plain buttons that scale up on hover.

- Documentation: https://ui.barua.tz/docs/specialized.html#emoji-picker
- Classes: `b-emoji-picker` `b-emoji-picker__grid` `b-input` `b-input--sm`

```html
<div class="b-emoji-picker">
  <input class="b-input b-input--sm" type="search" placeholder="Search emoji" aria-label="Search emoji">
  <!-- barua-lint disable emoji-icon: in an emoji picker the emoji are the content, not icons -->
  <div class="b-emoji-picker__grid">
    <button aria-label="Grinning face">😀</button>
    <button aria-label="Tears of joy">😂</button>
    <button aria-label="Smiling with hearts">🥰</button>
    <button aria-label="Sunglasses">😎</button>
    <button aria-label="Handshake">🤝</button>
    <button aria-label="Clapping hands">👏</button>
    <button aria-label="Folded hands">🙏</button>
    <button aria-label="Flexed biceps">💪</button>
    <button aria-label="Fire">🔥</button>
    <button aria-label="Sparkles">✨</button>
    <button aria-label="Party popper">🎉</button>
    <button aria-label="Bullseye">🎯</button>
    <button aria-label="Sun">☀️</button>
    <button aria-label="Ocean wave">🌊</button>
    <button aria-label="Palm tree">🌴</button>
    <button aria-label="Mountain">⛰️</button>
    <button aria-label="Lion">🦁</button>
    <button aria-label="Elephant">🐘</button>
    <button aria-label="Giraffe">🦒</button>
    <button aria-label="Zebra">🦓</button>
    <button aria-label="Coffee">☕</button>
    <button aria-label="Watermelon">🍉</button>
    <button aria-label="Football">⚽</button>
    <button aria-label="Rocket">🚀</button>
  <!-- barua-lint enabl
```

```tsx
import { Input } from "barua-ui";

<div className="b-emoji-picker">
  <Input className="b-input--sm" type="search" placeholder="Search emoji" aria-label="Search emoji" />
  <div className="b-emoji-picker__grid">
    <button aria-label="Grinning face">😀</button>
    <button aria-label="Tears of joy">😂</button>
    <button aria-label="Smiling with hearts">🥰</button>
    <button aria-label="Sunglasses">😎</button>
    <button aria-label="Handshake">🤝</button>
    <button aria-label="Clapping hands">👏</button>
    <button aria-label="Folded hands">🙏</button>
    <button aria-label="Flexed biceps">💪</button>
    <button aria-label="Fire">🔥</button>
    <button aria-label="Sparkles">✨</button>
    <button aria-label="Party popper">🎉</button>
    <button aria-label="Bullseye">🎯</button>
    <button aria-label="Sun">☀️</button>
    <button aria-label="Ocean wave">🌊</button>
    <button aria-label="Palm tree">🌴</button>
    <button aria-label="Mountain">⛰️</button>
    <button aria-label="Lion">🦁</button>
    <button aria-label="Elephant">🐘</button>
    <button aria-label="Giraffe">🦒</button>
    <button aria-label="Zebra">🦓</button>
    <button aria-label="Coffee">☕</button>
    <button aria-label="Watermelon">🍉</button>
    <button aria-label="Football">⚽</button>
    <button aria-label="Rocket">🚀</button>
  </div>
</div>
```

## Mention Picker

Typing @ in a composer opens a .b-mention-list of people — avatar initials, __name , muted __handle , with .is-active tracking the keyboard. Committed mentions render inline as .b-mention tokens.

- Documentation: https://ui.barua.tz/docs/specialized.html#mention-picker
- Classes: `b-avatar` `b-mention` `b-mention-list` `b-mention-list__handle` `b-mention-list__item` `b-mention-list__name`

```html
<ul class="b-mention-list" style="max-width: 20rem;">
  <li><button class="b-mention-list__item is-active">
    <span class="b-avatar">AH</span>
    <span class="b-mention-list__name">Amina Hassan</span>
    <span class="b-mention-list__handle">@amina</span>
  </button></li>
  <li><button class="b-mention-list__item">
    <span class="b-avatar">BO</span>
    <span class="b-mention-list__name">Baraka Otieno</span>
    <span class="b-mention-list__handle">@baraka</span>
  </button></li>
  <li><button class="b-mention-list__item">
    <span class="b-avatar">NM</span>
    <span class="b-mention-list__name">Neema Mushi</span>
    <span class="b-mention-list__handle">@neema</span>
  </button></li>
  <li><button class="b-mention-list__item">
    <span class="b-avatar">JK</span>
    <span class="b-mention-list__name">Juma Kibwana</span>
    <span class="b-mention-list__handle">@juma</span>
  </button></li>
</ul>
<p>Handing the Q3 invoices to <span class="b-mention">@amina</span> —
<span class="b-mention">@baraka</span> has the port-fees context.</p>
```

```tsx
import { Avatar } from "barua-ui";

<ul className="b-mention-list" style={{ maxWidth: "20rem" }}>
  <li>
    <button className="b-mention-list__item is-active">
      <Avatar>AH</Avatar>
      <span className="b-mention-list__name">Amina Hassan</span>
      <span className="b-mention-list__handle">@amina</span>
    </button>
  </li>
  <li>
    <button className="b-mention-list__item">
      <Avatar>BO</Avatar>
      <span className="b-mention-list__name">Baraka Otieno</span>
      <span className="b-mention-list__handle">@baraka</span>
    </button>
  </li>
  <li>
    <button className="b-mention-list__item">
      <Avatar>NM</Avatar>
      <span className="b-mention-list__name">Neema Mushi</span>
      <span className="b-mention-list__handle">@neema</span>
    </button>
  </li>
  <li>
    <button className="b-mention-list__item">
      <Avatar>JK</Avatar>
      <span className="b-mention-list__name">Juma Kibwana</span>
      <span className="b-mention-list__handle">@juma</span>
    </button>
  </li>
</ul>
<p>
  Handing the Q3 invoices to
  <span className="b-mention">@amina</span>
  —
  <span className="b-mention">@baraka</span>
  has the port-fees context.
</p>
```

## User Picker

Compose a .b-multiselect token field with the mention list as its open listbox: chosen people become removable .b-chip tokens, the inline input keeps filtering, and the list below tracks the highlighted option.

- Documentation: https://ui.barua.tz/docs/specialized.html#user-picker
- Classes: `b-avatar` `b-chip` `b-chip__remove` `b-mention-list` `b-mention-list__handle` `b-mention-list__item` `b-mention-list__name` `b-multiselect`

```html
<div class="b-multiselect" style="max-width: 24rem;">
  <span class="b-chip">Amina Hassan
    <button class="b-chip__remove" aria-label="Remove Amina Hassan">×</button>
  </span>
  <span class="b-chip">Baraka Otieno
    <button class="b-chip__remove" aria-label="Remove Baraka Otieno">×</button>
  </span>
  <input type="text" placeholder="Add people…" aria-label="Add people">
</div>
<ul class="b-mention-list" role="listbox" aria-label="People" style="max-width: 24rem;">
  <li class="b-mention-list__item is-active" role="option" aria-selected="true">
    <span class="b-avatar">NM</span>
    <span class="b-mention-list__name">Neema Mushi</span>
    <span class="b-mention-list__handle">@neema</span>
  </li>
  <li class="b-mention-list__item" role="option" aria-selected="false">
    <span class="b-avatar">JK</span>
    <span class="b-mention-list__name">Juma Kibwana</span>
    <span class="b-mention-list__handle">@juma</span>
  </li>
</ul>
```

```tsx
import { Avatar, Chip } from "barua-ui";

<div className="b-multiselect" style={{ maxWidth: "24rem" }}>
  <Chip>
    Amina Hassan
    <button className="b-chip__remove" aria-label="Remove Amina Hassan">×</button>
  </Chip>
  <Chip>
    Baraka Otieno
    <button className="b-chip__remove" aria-label="Remove Baraka Otieno">×</button>
  </Chip>
  <input type="text" placeholder="Add people…" aria-label="Add people" />
</div>
<ul
  className="b-mention-list"
  role="listbox"
  aria-label="People"
  style={{ maxWidth: "24rem" }}
>
  <li
    className="b-mention-list__item is-active"
    role="option"
    aria-selected="true"
  >
    <Avatar>NM</Avatar>
    <span className="b-mention-list__name">Neema Mushi</span>
    <span className="b-mention-list__handle">@neema</span>
  </li>
  <li className="b-mention-list__item" role="option" aria-selected="false">
    <Avatar>JK</Avatar>
    <span className="b-mention-list__name">Juma Kibwana</span>
    <span className="b-mention-list__handle">@juma</span>
  </li>
</ul>
```

## Search Results

A .b-search-results stack renders each hit as a title, snippet and breadcrumb __path . Wrap matched terms in <mark> — or .b-highlight on any element — for the soft yellow wash.

- Documentation: https://ui.barua.tz/docs/specialized.html#search-results
- Classes: `b-highlight` `b-search-result` `b-search-result__path` `b-search-result__snippet` `b-search-result__title` `b-search-results`

```html
<div class="b-search-results" style="max-width: 34rem;">
  <a class="b-search-result" href="#search-results">
    <span class="b-search-result__title">Q3 invoice ready for approval</span>
    <span class="b-search-result__snippet">Baraka uploaded <mark>invoice</mark>-q3.pdf covering the Dar es Salaam port fees…</span>
    <span class="b-search-result__path">Finance › Invoices › invoice-q3.pdf</span>
  </a>
  <a class="b-search-result" href="#search-results">
    <span class="b-search-result__title">Supplier <mark>invoice</mark> workflow</span>
    <span class="b-search-result__snippet">Amina approves any <span class="b-highlight">invoice</span> above TZS 2,000,000 before payout…</span>
    <span class="b-search-result__path">Handbook › Finance › Approvals</span>
  </a>
  <a class="b-search-result" href="#search-results">
    <span class="b-search-result__title">Mwanza depot handover notes</span>
    <span class="b-search-result__snippet">…final <mark>invoice</mark> reconciliation is owed to the Mwanza depot by Friday.</span>
    <span class="b-search-result__path">Operations › Mwanza › Handover</span>
  </a>
</div>
```

```tsx
import { SearchResult, SearchResults } from "barua-ui";

<SearchResults style={{ maxWidth: "34rem" }}>
  <SearchResult href="#search-results">
    <span className="b-search-result__title">Q3 invoice ready for approval</span>
    <span className="b-search-result__snippet">
      Baraka uploaded
      <mark>invoice</mark>
      -q3.pdf covering the Dar es Salaam port fees…
    </span>
    <span className="b-search-result__path">Finance › Invoices › invoice-q3.pdf</span>
  </SearchResult>
  <SearchResult href="#search-results">
    <span className="b-search-result__title">
      Supplier
      <mark>invoice</mark>
      workflow
    </span>
    <span className="b-search-result__snippet">
      Amina approves any
      <span className="b-highlight">invoice</span>
      above TZS 2,000,000 before payout…
    </span>
    <span className="b-search-result__path">Handbook › Finance › Approvals</span>
  </SearchResult>
  <SearchResult href="#search-results">
    <span className="b-search-result__title">Mwanza depot handover notes</span>
    <span className="b-search-result__snippet">
      …final
      <mark>invoice</mark>
      reconciliation is owed to the Mwanza depot by Friday.
    </span>
    <span className="b-search-result__path">Operations › Mwanza › Handover</span>
  </SearchResult>
</SearchResults>
```

## Filter Bar

.b-filter-bar is a wrapping row that composes a small search field, .b-filter-chip facets, a .b-sort-control and a clear-all link — no bespoke styling, just flex and gap.

- Documentation: https://ui.barua.tz/docs/specialized.html#filter-bar
- Classes: `b-filter-bar` `b-filter-chip` `b-filter-chip__value` `b-input` `b-input--sm` `b-link` `b-search` `b-sort-control`

```html
<div class="b-filter-bar">
  <div class="b-search">
    <input class="b-input b-input--sm" type="search" placeholder="Search documents…" aria-label="Search documents">
  </div>
  <button class="b-filter-chip">Owner</button>
  <button class="b-filter-chip is-active">Type <span class="b-filter-chip__value">PDF</span></button>
  <button class="b-filter-chip">Modified</button>
  <button class="b-sort-control is-desc">Sort: Newest</button>
  <button class="b-link">Clear all</button>
</div>
```

```tsx
import { FilterBar, FilterChip, Input, Link, SearchField, SortControl } from "barua-ui";

<FilterBar>
  <SearchField>
    <Input className="b-input--sm" type="search" placeholder="Search documents…" aria-label="Search documents" />
  </SearchField>
  <FilterChip>Owner</FilterChip>
  <FilterChip active>
    Type
    <span className="b-filter-chip__value">PDF</span>
  </FilterChip>
  <FilterChip>Modified</FilterChip>
  <SortControl className="is-desc">Sort: Newest</SortControl>
  <Link>Clear all</Link>
</FilterBar>
```

## Filter Chip

A dashed pill that reads as “add a constraint”. On hover the dashed border and label tint accent; once applied, .is-active swaps to a solid soft-accent fill and the chosen __value renders semibold beside the facet name.

- Documentation: https://ui.barua.tz/docs/specialized.html#filter-chip
- Classes: `b-filter-chip` `b-filter-chip__value`

```html
<button class="b-filter-chip">Owner</button>
<button class="b-filter-chip">Status</button>
<button class="b-filter-chip is-active">Branch <span class="b-filter-chip__value">Dar es Salaam</span></button>
```

```tsx
import { FilterChip } from "barua-ui";

<FilterChip>Owner</FilterChip>
<FilterChip>Status</FilterChip>
<FilterChip active>
  Branch
  <span className="b-filter-chip__value">Dar es Salaam</span>
</FilterChip>
```

## Sort Control

A quiet text button for column or list ordering. .is-asc and .is-desc append an accent arrow via CSS; with neither class the control reads as unsorted. Cycle asc → desc → none on press and mirror the state with aria-sort on the column header.

- Documentation: https://ui.barua.tz/docs/specialized.html#sort-control
- Classes: `b-sort-control`

```html
<button class="b-sort-control is-asc">Name</button>
<button class="b-sort-control is-desc">Modified</button>
<button class="b-sort-control">Size</button>
```

```tsx
import { SortControl } from "barua-ui";

<SortControl className="is-asc">Name</SortControl>
<SortControl className="is-desc">Modified</SortControl>
<SortControl>Size</SortControl>
```

## Bulk Actions

When a selection exists, a glass .b-bulk-actions__bar floats in with the count and the few actions that apply to every selected item. In production, wrap it in .b-bulk-actions to pin it bottom-center; the bar is shown here statically.

- Documentation: https://ui.barua.tz/docs/specialized.html#bulk-actions
- Classes: `b-btn` `b-btn--danger-tinted` `b-btn--ghost` `b-btn--sm` `b-bulk-actions__bar` `b-bulk-actions__count` `b-divider` `b-divider--vertical` `b-icon-btn`

```html
<div class="b-bulk-actions__bar">
  <span class="b-bulk-actions__count">3 selected</span>
  <button class="b-btn b-btn--ghost b-btn--sm">Move</button>
  <button class="b-btn b-btn--ghost b-btn--sm">Share</button>
  <hr class="b-divider b-divider--vertical">
  <button class="b-btn b-btn--danger-tinted b-btn--sm">Delete</button>
  <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" aria-label="Clear selection">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
  </button>
</div>
```

```tsx
import { Button, Divider } from "barua-ui";

<div className="b-bulk-actions__bar">
  <span className="b-bulk-actions__count">3 selected</span>
  <Button variant="ghost" size="sm">Move</Button>
  <Button variant="ghost" size="sm">Share</Button>
  <Divider vertical />
  <Button variant="danger-tinted" size="sm">Delete</Button>
  <Button icon variant="ghost" size="sm" aria-label="Clear selection">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  </Button>
</div>
```

## Multi-Select

A token field: .b-multiselect looks like one input but holds removable .b-chip tokens ahead of a borderless inline input. The whole frame lights up on :focus-within , so it behaves like a single control.

- Documentation: https://ui.barua.tz/docs/specialized.html#multi-select
- Classes: `b-chip` `b-chip__remove` `b-multiselect`

```html
<div class="b-multiselect" style="max-width: 26rem;">
  <span class="b-chip">Dar es Salaam
    <button class="b-chip__remove" aria-label="Remove Dar es Salaam">×</button>
  </span>
  <span class="b-chip">Mwanza
    <button class="b-chip__remove" aria-label="Remove Mwanza">×</button>
  </span>
  <span class="b-chip">Arusha
    <button class="b-chip__remove" aria-label="Remove Arusha">×</button>
  </span>
  <input type="text" placeholder="Add branch…" aria-label="Add branch">
</div>
```

```tsx
import { Chip } from "barua-ui";

<div className="b-multiselect" style={{ maxWidth: "26rem" }}>
  <Chip>
    Dar es Salaam
    <button className="b-chip__remove" aria-label="Remove Dar es Salaam">×</button>
  </Chip>
  <Chip>
    Mwanza
    <button className="b-chip__remove" aria-label="Remove Mwanza">×</button>
  </Chip>
  <Chip>
    Arusha
    <button className="b-chip__remove" aria-label="Remove Arusha">×</button>
  </Chip>
  <input type="text" placeholder="Add branch…" aria-label="Add branch" />
</div>
```

## File Browser

A two-pane Finder-style shell: __side holds a compact folder .b-tree on a recessed fill, __main holds a responsive .b-file-grid of .b-file-tile items. The selected tile gets a soft-accent wash and a solid accent name pill — exactly like the desktop.

- Documentation: https://ui.barua.tz/docs/specialized.html#file-browser
- Classes: `b-file-browser` `b-file-browser__main` `b-file-browser__side` `b-file-grid` `b-file-tile` `b-file-tile__icon` `b-file-tile__name` `b-tree` `b-tree-item` `b-tree-item__row`

```html
<div class="b-file-browser">
  <aside class="b-file-browser__side">
    <ul class="b-tree">
      <li>
        <details class="b-tree-item" open>
          <summary><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" stroke-width="1.5"/></svg>Finance</summary>
          <ul class="b-tree">
            <li><div class="b-tree-item__row is-selected"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" stroke-width="1.5"/></svg>Invoices</div></li>
            <li><div class="b-tree-item__row"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" stroke-width="1.5"/></svg>Receipts</div></li>
          </ul>
        </details>
      </li>
      <li><div class="b-tree-item__row"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" stroke-width="1.5"/></svg>Operations</div></li>
      <li><div class="b-tree-item__row"><s
```

```tsx
import { FileBrowser, Tree, TreeItem } from "barua-ui";

<FileBrowser>
  <aside className="b-file-browser__side">
    <Tree>
      <li>
        <TreeItem open>
          <summary>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Finance
          </summary>
          <Tree>
            <li>
              <div className="b-tree-item__row is-selected">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Invoices
              </div>
            </li>
            <li>
              <div className="b-tree-item__row">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Receipts
              </div>
            </li>
          </Tree>
        </TreeItem>
      </li>
      <li>
        <div className="b-tree-item__row">
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          Operations
        </div>
      </li>
      <li>
        <div className="b-tree-item__row"></div>
      </li>
    </Tree>
  </aside>
</FileBrowser>
```

## Folder Tree

The generic disclosure tree is documented in Content › Tree . Flavoured with folder icons it becomes a location picker: <details class="b-tree-item"> for branches, __row for leaves, .is-selected for the current folder.

- Documentation: https://ui.barua.tz/docs/specialized.html#folder-tree
- Classes: `b-tree` `b-tree-item` `b-tree-item__row`

```html
<ul class="b-tree" style="max-width: 18rem;">
  <li>
    <details class="b-tree-item" open>
      <summary><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" stroke-width="1.5"/></svg>Dar es Salaam HQ</summary>
      <ul class="b-tree">
        <li>
          <details class="b-tree-item" open>
            <summary><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" stroke-width="1.5"/></svg>Finance</summary>
            <ul class="b-tree">
              <li><div class="b-tree-item__row is-selected"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" stroke-width="1.5"/></svg>Invoices</div></li>
              <li><div class="b-tree-item__row"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" stroke-width="1.5"/></svg>Payroll</div></li>
            </ul>
          </details>
        </li>
        <li><div cl
```

```tsx
import { Tree, TreeItem } from "barua-ui";

<Tree style={{ maxWidth: "18rem" }}>
  <li>
    <TreeItem open>
      <summary>
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        Dar es Salaam HQ
      </summary>
      <Tree>
        <li>
          <TreeItem open>
            <summary>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Finance
            </summary>
            <Tree>
              <li>
                <div className="b-tree-item__row is-selected">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  Invoices
                </div>
              </li>
              <li>
                <div className="b-tree-item__row">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2h6A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  Payroll
                </div>
              </li>
            </Tree>
          </TreeItem>
        </li>
        <li></li>
      </Tree>
    </TreeItem>
  </li>
</Tree>
```

## Activity Log

.b-log renders each __entry on a three-column baseline grid — semibold __actor , muted __action with object names in <code> , and a tabular __time pinned trailing. Rows separate with hairlines and highlight on hover.

- Documentation: https://ui.barua.tz/docs/specialized.html#activity-log
- Classes: `b-log` `b-log__action` `b-log__actor` `b-log__entry` `b-log__time`

```html
<div class="b-log" style="max-width: 40rem;">
  <div class="b-log__entry">
    <span class="b-log__actor">Amina Hassan</span>
    <span class="b-log__action">uploaded <code>invoice-q3.pdf</code> to Finance / Invoices</span>
    <time class="b-log__time">2 min ago</time>
  </div>
  <div class="b-log__entry">
    <span class="b-log__actor">Baraka Otieno</span>
    <span class="b-log__action">approved purchase order <code>PO-2214</code></span>
    <time class="b-log__time">38 min ago</time>
  </div>
  <div class="b-log__entry">
    <span class="b-log__actor">Neema Mushi</span>
    <span class="b-log__action">renamed <code>port-fees-draft.xlsx</code> to <code>port-fees.xlsx</code></span>
    <time class="b-log__time">Yesterday</time>
  </div>
  <div class="b-log__entry">
    <span class="b-log__actor">Juma Kibwana</span>
    <span class="b-log__action">shared <code>tender-brief.docx</code> with the Mwanza depot</span>
    <time class="b-log__time">Mon 09:12</time>
  </div>
</div>
```

```tsx
import { Log } from "barua-ui";

<Log style={{ maxWidth: "40rem" }}>
  <div className="b-log__entry">
    <span className="b-log__actor">Amina Hassan</span>
    <span className="b-log__action">
      uploaded
      <code>invoice-q3.pdf</code>
      to Finance / Invoices
    </span>
    <time className="b-log__time">2 min ago</time>
  </div>
  <div className="b-log__entry">
    <span className="b-log__actor">Baraka Otieno</span>
    <span className="b-log__action">
      approved purchase order
      <code>PO-2214</code>
    </span>
    <time className="b-log__time">38 min ago</time>
  </div>
  <div className="b-log__entry">
    <span className="b-log__actor">Neema Mushi</span>
    <span className="b-log__action">
      renamed
      <code>port-fees-draft.xlsx</code>
      to
      <code>port-fees.xlsx</code>
    </span>
    <time className="b-log__time">Yesterday</time>
  </div>
  <div className="b-log__entry">
    <span className="b-log__actor">Juma Kibwana</span>
    <span className="b-log__action">
      shared
      <code>tender-brief.docx</code>
      with the Mwanza depot
    </span>
    <time className="b-log__time">Mon 09:12</time>
  </div>
</Log>
```

## Audit Log

Security review needs provenance. .b-log--audit widens the entry grid to four columns — 7.5rem max-content 1fr max-content — so a monospace __ip leads each row and full timestamps align down the right edge.

- Documentation: https://ui.barua.tz/docs/specialized.html#audit-log
- Classes: `b-log` `b-log--audit` `b-log__action` `b-log__actor` `b-log__entry` `b-log__ip` `b-log__time`

```html
<div class="b-log b-log--audit">
  <div class="b-log__entry">
    <span class="b-log__ip">197.250.14.62</span>
    <span class="b-log__actor">amina</span>
    <span class="b-log__action">signed in with <code>passkey</code></span>
    <time class="b-log__time">2026-08-26 09:14</time>
  </div>
  <div class="b-log__entry">
    <span class="b-log__ip">197.250.14.62</span>
    <span class="b-log__actor">amina</span>
    <span class="b-log__action">exported <code>invoice-q3.pdf</code></span>
    <time class="b-log__time">2026-08-26 09:21</time>
  </div>
  <div class="b-log__entry">
    <span class="b-log__ip">41.222.180.7</span>
    <span class="b-log__actor">baraka</span>
    <span class="b-log__action">changed role of <code>@juma</code> to <code>editor</code></span>
    <time class="b-log__time">2026-08-25 17:03</time>
  </div>
  <div class="b-log__entry">
    <span class="b-log__ip">196.249.5.118</span>
    <span class="b-log__actor">system</span>
    <span class="b-log__action">rotated API key <code>brk_live_…9f2</code></span>
    <time class="b-log__time">2026-08-25 02:00</time>
  </div>
</div>
```

```tsx
import { Log } from "barua-ui";

<Log className="b-log--audit">
  <div className="b-log__entry">
    <span className="b-log__ip">197.250.14.62</span>
    <span className="b-log__actor">amina</span>
    <span className="b-log__action">
      signed in with
      <code>passkey</code>
    </span>
    <time className="b-log__time">2026-08-26 09:14</time>
  </div>
  <div className="b-log__entry">
    <span className="b-log__ip">197.250.14.62</span>
    <span className="b-log__actor">amina</span>
    <span className="b-log__action">
      exported
      <code>invoice-q3.pdf</code>
    </span>
    <time className="b-log__time">2026-08-26 09:21</time>
  </div>
  <div className="b-log__entry">
    <span className="b-log__ip">41.222.180.7</span>
    <span className="b-log__actor">baraka</span>
    <span className="b-log__action">
      changed role of
      <code>@juma</code>
      to
      <code>editor</code>
    </span>
    <time className="b-log__time">2026-08-25 17:03</time>
  </div>
  <div className="b-log__entry">
    <span className="b-log__ip">196.249.5.118</span>
    <span className="b-log__actor">system</span>
    <span className="b-log__action">
      rotated API key
      <code>brk_live_…9f2</code>
    </span>
    <time className="b-log__time">2026-08-25 02:00</time>
  </div>
</Log>
```

