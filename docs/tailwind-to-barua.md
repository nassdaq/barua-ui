# Tailwind → Barua UI: the migration guide

Every screen in `apps/mail` is drawn with the design system: `b-*` classes
from `barua-ui/css`, components from `barua-ui` and `@nasi/ui`, icons from
`barua-ui`'s `Icon`. Nothing else. This guide is the mapping used to remove
the last Tailwind classes, shadcn primitives and lucide icons.

## Rules

1. **No Tailwind tokens in `className`.** Not `flex`, `gap-2`, `text-sm`,
   `hover:…`, `sm:…`, `dark:…`, `size-4`, arbitrary values, none.
2. **No `cn()` from `@/lib/utils`** (it is tailwind-merge). Use `cn` from
   `barua-ui` (a plain joiner) or template strings.
3. **No `lucide-react`.** Use `<Icon name="…" size={…} />` from `barua-ui`.
   The loading spinner is `<span className="b-spinner" />` or `<Spinner />`.
4. **Keep behaviour.** Props, handlers, `aria-*`, `data-*`, ids, form names
   and `type` attributes stay exactly as they are. Only appearance moves.
5. **Prefer a component or class that exists.** If a look truly has no
   equivalent, use an inline `style` with `--b-*` tokens rather than
   inventing CSS. Report real gaps; do not edit the design system yourself.
6. **Responsive/hover/dark variants**: the system's components already
   handle hover and dark mode. `sm:`/`md:` layout changes become
   `b-hide-mobile` / `b-hide-desktop`, or a `b-grid` that collapses on its
   own, or a `b-stack--wrap`.

## Layout

| Tailwind | Barua |
|---|---|
| `flex items-center gap-N` | `b-hstack b-gap-N` (N in 0,1,2,3,4,6,8) |
| `flex flex-col gap-N`, `space-y-N` | `b-stack b-gap-N` |
| `flex-wrap` | add `b-stack--wrap` |
| `items-center` / `items-start` / `items-end` | `b-stack--center` / `b-stack--start` / `b-stack--end` (these set the **cross** axis) |
| `justify-center` / `justify-end` / `justify-between` | `b-justify-center` / `b-justify-end` / `b-justify-between` (the **main** axis) |

`b-stack--between` predates the `b-justify-*` family and does the same thing as
`b-justify-between`. It still works and is used widely, so it is not worth a
sweep, but prefer `b-justify-between` in new code: reading `--between` beside
`--center` and `--end`, which are cross-axis, is what caused this confusion in
the first place.
| `flex-1` | `b-flex-1` |
| `shrink-0` | `b-shrink-0` |
| `min-w-0` / `min-h-0` | `b-min-w-0` / `b-min-h-0` |
| `w-full` / `h-full` | `b-w-full` / `b-h-full` (buttons: `b-btn--block`) |
| `block` / `inline-flex` | `b-block` / `b-inline-flex` |
| `relative` / `absolute` | `b-relative` / `b-absolute` |
| `overflow-hidden` / `overflow-y-auto` | `b-overflow-hidden` / `b-overflow-auto` |
| `grid grid-cols-2/3/4` | `b-grid b-grid--2/3/4` |
| `max-w-md` etc. | `b-container b-container--sm/md` or `style={{ maxWidth: … }}` |
| `truncate` / `line-clamp-2` | `b-truncate` / `b-line-clamp-2` |
| `sr-only` | `b-sr-only` |
| `animate-spin` | `b-spin` (or use `b-spinner`) |
| margins `mt-2`, `mb-4` | prefer a `b-stack b-gap-N` parent; else `style={{ marginBlockStart: "var(--b-space-2)" }}` |
| paddings `p-3`, `px-4` | put the content in `b-card__body` / `b-container`; else `style={{ padding: "var(--b-space-3)" }}` |

## Type and colour

| Tailwind | Barua |
|---|---|
| `text-xs` | `b-caption` |
| `text-[13px]`, `text-sm` (secondary) | `b-footnote` |
| `text-sm` (body) / `text-base` | `b-subheadline` / `b-body` |
| `text-lg font-semibold` | `b-headline` or `b-title3` |
| `text-xl/2xl font-bold` | `b-title2` / `b-title1` |
| uppercase tracking labels | `b-overline` |
| `text-muted-foreground` | `b-text-secondary` (or `b-text-tertiary` for fainter) |
| `text-destructive` | `b-text-danger` |
| `text-primary` | `b-text-accent` |
| `font-medium` / `font-semibold` | usually a role above; else `style={{ fontWeight: "var(--b-weight-semibold)" }}` |
| `font-mono` | `b-mono` |
| `tabular-nums` | `b-tabular-nums` |
| `leading-relaxed` | drop it: the roles carry leading |
| `text-center` | `b-text-center` |

## Surfaces and furniture

| Tailwind / shadcn | Barua |
|---|---|
| `rounded-lg border bg-card p-4` | `b-card` + `b-card__body` (`b-card--compact`, `--glass`, `--flat` as needed) |
| `bg-panel` / `bg-muted` box | `b-card b-card--flat` or `b-card--neutral` |
| a glass panel carrying data or a form | add `b-card--thick` to `b-card--glass` — the denser veil, so a customer's wallpaper cannot compete with the ink |
| `border-b` divider rows | `b-list b-list--inset-divider` + `b-list-item` |
| `<Skeleton className="h-4 w-…" />` | `<span className="b-skeleton b-skeleton--text" style={{ width }} />` (`--title`, `--circle`, `--card`) |
| `<Badge variant=…>` | `<span className="b-badge b-badge--success|--danger|--warning|--accent|--solid">` |
| `<Button>` | `<button className="b-btn b-btn--primary">`; variants: `ghost→b-btn--ghost`, `outline→b-btn--outline`, `secondary→b-btn--tinted`, `destructive/danger→b-btn--danger`, `success→b-btn--success`, `link→b-link`; sizes `sm→b-btn--sm`, `lg→b-btn--lg`; full width `b-btn--block`; icon-only `b-icon-btn`; loading: `is-loading` class and `aria-busy` |
| `<Input>` / `<Textarea>` / `<Label>` | `<div className="b-field"><label className="b-label">…</label><input className="b-input" /><p className="b-help">…</p></div>`; errors `b-error` |
| `<Checkbox>` | `<label className="b-checkbox"><input type="checkbox" /> …</label>` |
| `<Dialog>` family | `Modal` from `barua-ui` (`b-modal`, `__header`, `__title`, `__body`, `__footer`, `__close`) |
| `<Sheet>` | `Sheet` from `barua-ui` |
| `<DropdownMenu>` / `<ContextMenu>` | `Popover` + `b-menu` / `b-menu__item` (`--danger`, `b-menu__separator`, `b-menu__label`) |
| `<Tooltip>` | `Tooltip` from `barua-ui` |
| `<Tabs>` | `Tabs` from `barua-ui` (`b-tabs`, `b-tab`, `b-tabpanel`) or `b-segmented` |
| `Toaster` (sonner) | `ToastProvider` / `useToast` from `barua-ui` |
| `<Avatar>` | `<span className="b-avatar b-avatar--sm">{initials}</span>` |
| empty states | `b-empty` (`__title`, `__desc`) |
| results / errors pages | `b-result` (`--success`, `--error`, `--warning`) |
| alerts | `b-alert` (`--success`, `--warning`, `--danger`) |

## Icons (lucide → `Icon` name)

**The prop is a scale name, not a number.** `size?: "sm" | "md" | "lg" | "xl"`,
matching `.b-icon--*`; the default is 20×20. So `size-4`/16px → `size="sm"`,
20px → omit it, larger → `"lg"` or `"xl"`. `<Icon size={16}/>` does not
typecheck. Give an icon `title="…"` when it is the only label; without one it
is `aria-hidden`, which is right for decoration beside text.

Loader2→`b-spinner`, Check/CheckIcon→check, Trash2→trash, Send→send,
Plus→plus, Copy→copy, Upload→upload, Pencil/PenLine→pencil,
Paperclip→paperclip, Lock→lock, Globe→globe, FileText→doc, Eye→eye,
Download→download, AlertTriangle/TriangleAlert→warning, X/XIcon→close,
Users→people, UserPlus→person-plus, Sun→sun, Moon→moon-stars,
Settings→gear, Menu→menu, FolderOpen→folder, CornerUpLeft→backward
(reply), CornerUpRight→forward, ChevronRight/Down→chevron-right/-down,
Star→star, Search/SearchIcon→search, Sparkles→sparkles,
ShieldCheck/ShieldQuestion→shield, Power→power, Webhook→bolt,
OctagonX→warning, Mail→mail, Inbox→mail, Archive→folder.

Sizes: lucide `size-3.5`/`size-4` → `size="sm"`, `size-5` → omit (the 20px
default), `size-6`+ → `size="lg"`.

`--b-gap` inherits, so a nested `b-stack` with no `b-gap-N` of its own takes
its ancestor's. Always state the gap on a nested stack.

There is no font-weight or primary-text-colour utility: use
`style={{ fontWeight: "var(--b-weight-medium)" }}` and
`style={{ color: "var(--b-text)" }}` for those two cases.

## Done means

`grep -rE "lucide-react|@/lib/utils|@/components/ui/" src` finds nothing,
`grep -rE 'className="[^"]*\b(flex|gap-[0-9]|text-(xs|sm)|w-full|rounded)\b'`
finds nothing, `globals.css` imports no Tailwind, and the screens look the
same or better in the before/after screenshots.
