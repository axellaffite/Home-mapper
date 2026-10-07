# Home mapper: design system

Source of truth for every visual and motion value in `index.html`. Every colour, size, radius,
duration and easing in the app comes from a token below. Light only.

## Theses (validated)

**Visual.** Light-only architect's tracing: cool translucent calque sheets laid on a grey
drafting table, graphite ink for everything, and one red correction pencil kept for what you are
acting on right now (the selected wall, the live measurement, the main action). The electrical
layer gets its own blue-black ink, as on real plans. Lettering is IBM Plex Sans Condensed
(uppercase tracked labels and tabular figures, like a title-block cartouche) with IBM Plex Sans
for running text. Margins around each sheet are airy and annotation within it is dense, on a 4px
base. Corners are sharp (0-2px), hairline-bordered and flat, and elevation shows as stacked sheet
edges, never soft shadows.

**Interaction.** Pen on paper: UI motion between 120 and 260ms with one "draw" ease-out. A plan's
lines draw themselves once when it opens (480ms per room, staggered 70ms). Screens arrive like a
sheet slid onto the table (16px + fade, 260ms) and leave faster (160ms, ease-in). On pointer
devices, hover underlines in graphite. A press lowers the control by 1px. Scrolling triggers
nothing. Forbidden: bounce, springs or overshoot, scale on hover, parallax, glows and soft drop
shadows, infinite loops, and blur anywhere outside the AR camera view.

**Allowed patterns:** hairline rules and construction lines; a title-block cartouche framing the
house and room headers; uppercase tracked condensed labels; tabular figures; stroke draw-in of
plan lines on open; stacked sheet edges; frosted dark panels over the camera in AR only; the
circular AR shutter button; a blue-black second ink for the electrical layer.

## Colour

| Token | Value | Role | Contrast |
|---|---|---|---|
| `--table` | `#E2E6E5` | page ground (the drafting table) | |
| `--sheet` | `#F5F7F6` | every sheet, panel, input ground | |
| `--ink` | `#23282B` | text, walls, outlines, ink buttons | 13.8:1 on sheet, 11.8:1 on table |
| `--ink-soft` | `#5E676B` | secondary text, input underlines | 5.4:1 on sheet, 4.6:1 on table |
| `--construct` | `#9AA3A6` | construction lines, dimension lines, disabled strokes. Never text. | 2.4:1 |
| `--hair` | `#C3CACB` | decorative hairlines, sheet edges | 1.6:1 |
| `--grid` | `#DCE1E0` | plan grid (1 m) | |
| `--wash` | `rgba(35,40,43,.04)` | room fill on plans | |
| `--pencil` | `#C42B1C` | the one accent: selection, live value, main action, destructive text, focus ring | 5.3:1 on sheet; white on it 5.7:1 |
| `--pencil-wash` | `rgba(196,43,28,.08)` | selected room / row / menu item ground | |
| `--elec` | `#24508F` | electrical layer ink | 7.5:1 on sheet |
| `--on-ink` | `#F5F7F6` | text on ink / pencil fills | |

AR overlay (dark, over the camera):

| Token | Value | Role |
|---|---|---|
| `--ar-panel` | `rgba(20,24,26,.78)` | frosted panels (blur 6px) |
| `--ar-sheet` | `rgba(20,24,26,.92)` | naming sheet (blur 8px) |
| `--ar-ink` | `#FFFFFF` | text on the camera |
| `--ar-line` | `rgba(255,255,255,.4)` | outlined chips and inputs |
| `--ar-field` | `rgba(255,255,255,.08)` | text field ground on the naming sheet |
| `--ar-soft` | `rgba(255,255,255,.75)` | secondary link on the naming sheet |
| `--ar-ring` | `rgba(0,0,0,.4)` | 1px ring keeping the shutter legible on bright floors |
| `--idle` | `#9AA3A6` | tracking not started (dot) |
| `--ok` | `#3DDC84` | tracking good (dot) |
| `--ok-panel` | `rgba(30,122,85,.92)` | "close the room" / confirm panels |
| `--warn` | `#FFB020` | tracking unstable (dot) |
| `--lost` | `#FF4B33` | tracking lost (dot) |
| `--lost-panel` | `rgba(160,30,15,.85)` | tracking lost panel |

Semantic AR colours are status, not accent.

Print (PDF) theme overrides the same names: `--table/--sheet:#fff`, `--ink:#111`,
`--ink-soft:#555`, `--hair/--construct:#999`, `--grid:#ddd`, `--pencil:#111`, `--wash:none`,
`--elec:#1D4F91`.

**Rooms carry no colour.** The previous seven-colour room palette is removed: rooms are washed in
`--wash`, the selected room in `--pencil-wash` with a pencil outline.

## Type

| Token | Value |
|---|---|
| `--f-letter` | `"IBM Plex Sans Condensed","Arial Narrow","Roboto Condensed",sans-serif` |
| `--f-text` | `"IBM Plex Sans","Segoe UI",Roboto,system-ui,sans-serif` |

Loaded from Google Fonts: Plex Sans Condensed 400/500/600, Plex Sans 400/500/600, `display=swap`.

| Step | Size / line | Face, weight | Use |
|---|---|---|---|
| `--fs-label` | 12px / 1.2, `.12em`, uppercase | letter 500 | cartouche labels, section labels, nav |
| `--fs-note` | 14px / 1.45 | text 400 | hints, secondary lines |
| `--fs-body` | 16px / 1.5 | text 400 | running text |
| `--fs-fig` | 18px / 1.2 | letter 600, tabular | inputs, list figures |
| `--fs-h2` | 22px / 1.2 | letter 600 | section titles |
| `--fs-name` | 30px / 1.1 | letter 600 | house / room name, big figures |
| `--fs-h1` | 40px / 1.05 | letter 600 | home title |

Every figure uses `font-variant-numeric: tabular-nums`. Buttons: letter 600, 14px, `.08em`,
uppercase.

## Spacing

Base 4px: `--s1:4px --s2:8px --s3:12px --s4:16px --s5:24px --s6:32px --s7:48px`.
Sheets get `--s5` inner padding and `--s6` between them; annotation inside lists and stats uses
`--s2`/`--s3`. Touch targets stay at 44px minimum (48px for main buttons).

## Radii

`--r0:0` (sheets, panels, cartouches), `--r1:2px` (buttons, inputs, tabs, chips), `50%` only for the AR
shutter, device dots and joint badges.

## Elevation

| Token | Value | Use |
|---|---|---|
| `--stack` | `3px 3px 0 -1px var(--sheet), 3px 3px 0 0 var(--hair)` | a sheet resting on another (plan sheet, context menu, panels) |
| `--stack-ink` | `3px 3px 0 0 var(--ink)` | the floating context menu |

No blurred shadows outside the AR overlay.

## Motion

| Token | Value | Use |
|---|---|---|
| `--t-press` | `120ms` | hover, press, focus, chip toggles |
| `--t-base` | `200ms` | panels, toast, context menu, fills |
| `--t-sheet` | `260ms` | screen enter (16px + fade) |
| `--t-exit` | `160ms` | screen / toast / menu exit (8px + fade) |
| `--t-line` | `480ms` | one room's walls drawing in |
| `--t-stagger` | `70ms` | delay between rooms |
| `--e-draw` | `cubic-bezier(.2,.7,.2,1)` | every entrance and state change |
| `--e-exit` | `cubic-bezier(.4,0,1,1)` | every exit |

- Press: `translateY(1px)`, `--t-press`. No scale.
- Hover (only `@media (hover:hover)`): `box-shadow: inset 0 -2px 0 currentColor` on buttons;
  underline on text links and list rows.
- Plan draw-in runs once per opening of a house or room, never on re-render while editing.
- Reduced motion: no travel, no draw-in; state changes become 120ms opacity fades.

## Components

- **Button main**: pencil fill, `--on-ink` text, 48px, `--r1`.
- **Button ghost**: transparent, 1px ink border, ink text.
- **Button danger**: text only, pencil, underline on hover.
- **Mini**: 40px, 1px `--ink-soft` border, `--sheet` ground.
- **Disabled**: dashed `--construct` border, `--construct` text, no fill.
- **Focus**: `2px solid var(--pencil)`, offset 3px.
- **Input**: no box, 1px `--ink-soft` underline, 2px pencil underline on focus, figures in letter 600.
- **Select**: 1px `--ink-soft` border, `--r1`, `--sheet` ground.
- **Tabs (levels)**: 1px ink border, selected = ink fill + `--on-ink` text.
- **List row**: hairline top rule, name in text 600, figures right in letter tabular.
- **Cartouche** (stats, sheet headers): 1px ink frame, cells split by 1px ink rules, label above value.
- **Nav**: sheet ground, hairline top rule (left rule on the side rail), labels in `--fs-label`;
  current item ink with a 2px ink rule on its outer edge, others `--ink-soft`.
- **Toast**: ink fill, `--on-ink` text, `--r1`.
- **Context menu**: sheet, 1px ink border, `--stack-ink`.
