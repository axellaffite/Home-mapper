# Home mapper

Map your home in augmented reality, right from your phone's browser: point at the corners of each room, and get a dimensioned floor plan of the whole house, floor by floor, with doors, windows and electrical devices.

**Live app:** https://axellaffite.github.io/Home-mapper/

> The interface is in French.

## Features

- **Room survey in AR**: aim at the foot of each corner and tap; walls, area and perimeter are computed live. Close the room on the first corner and give it a name.
- **Whole-house plans**: survey several rooms in one session and they are positioned relative to each other automatically. Rooms surveyed in separate sessions can be arranged by hand (drag, rotate).
- **Multiple floors**: floors are detected from height changes when you take the stairs, and stay aligned with each other.
- **Doors and windows**: door, double door, sliding door, window, French window, sliding bay. Each one has a width and a height, plus a sill height for windows (standard sizes until you type your own). Swing direction and hinge side can be inverted afterwards.
- **Electrical devices** with standard French floor-plan symbols: ceiling light, recessed spot, wall light, 16 A and 32 A outlets, switch, two-way switch, RJ45, TV outlet, smoke detector, electrical panel, electricity meter, plus dedicated outlets (dishwasher, washing machine, oven) and cable outlets (water heater, radiator, hood).
- **Electrical panel**: a "Tableau" screen shows the house plan next to a drawing of your panel, rail by rail, as it really is: the meter, then as many rails as you need, each with its 30 mA residual-current switch (type AC, A or F) followed by the breakers it protects. Breakers have a usage (lighting, outlets, dishwasher, washing machine, oven, hob, water heater, EV charger, ventilation…) that sets the usual rating, and modules (contactor, surge protector, remote switch) can be added too. Move any module left, right or to another rail. Pick a breaker, then tap outlets, lights and switches on the plan to connect or disconnect them; tap a device alone to find its breaker. Each breaker gets NF C 15-100 reminders (rating, one appliance per dedicated circuit, points per circuit, type A where needed, 8 circuits per residual-current switch). Devices are tagged C1, C2… in panel order, unconnected ones are listed, and the PDF gets an extra sheet with the circuit table.
- **Finishes**: in the "Travaux" tab, which gathers all renovation work, note the floor, walls (one wall can differ, like an accent wall) and ceiling of each room, picked from the list or by tapping a wall or floor on the 2D or 3D plan (the surface under the mouse is highlighted): material, brand, reference, shade, colour, paint sheen and a free note. Areas exclude doors and windows, and the quantity to buy is estimated (litres of paint for 2 coats, rolls of wallpaper, m² with 10 % offcuts, skirting length). Brands, references and shades you already typed are suggested, any finish can be reused in one tap, and identical products are grouped into a shopping list. Colours also show in the 3D view.
- **Renovation budget**: list what you want to change (paint, wallpaper, flooring, tiles, skirting, fixed-price jobs) and pick the surfaces from a list or by tapping walls and floors on the 2D or 3D plan. Price by unit (pot or roll: price, m² covered per coat, number of coats), per m², per metre or as a flat amount, with optional labour and an offcut margin. Each line shows its calculation; totals add a contingency percentage. A line can start from a finish you noted, with its surfaces already selected.
- **Manual plan editor** (zoom with wheel, pinch or buttons; full-height plan with a side panel on wide screens): drag corners (they snap square to their neighbours), add or remove corners, type exact wall lengths, move doors, windows and devices on the plan, with undo. Rooms can also be drawn by hand, without AR.
- **2D / 3D view**: switch the house plan to 3D to see the walls at their real ceiling height, with doors and windows cut through. Orbit, pan and zoom with the mouse or your fingers, show one level or the whole house stacked, and tap a room to open it.
- **PDF export**: one A4 sheet per floor at a standard scale (1:50, 1:75, 1:100…), with dimensions, title block, room area table and electrical legend.
- **Survey from a computer**: on a device without AR, « Relevé RA » shows a QR code. Scan it with an ARCore phone, survey the rooms, and they land on the computer's plan at the end of each survey. The two browsers are paired through the public [PeerJS](https://peerjs.com/) broker, then the rooms travel directly between them over WebRTC.
- **Share by link**: the whole house is compressed into the link itself (after the `#`, never sent to a server); the recipient previews it and can import it.
- **Robust tracking**: world anchors, tracking-loss detection, smoothed target, and manual realignment after a tracking jump.
- **Local storage**: everything is saved automatically in the browser, and an interrupted survey can be recovered.

## Requirements

AR uses [WebXR](https://immersiveweb.dev/) (`immersive-ar` + `hit-test`), so it needs an **Android phone compatible with ARCore** running **Chrome**, on an HTTPS page (GitHub Pages provides it).

Safari on iPhone does not support WebXR yet. On a computer, use « Relevé RA » to pair an Android phone by QR code. On any other device you can still browse and edit plans, draw rooms by hand, and try the built-in example house.

## Tips for a good survey

- Light the rooms well, move slowly and keep the floor in view.
- Sweep the floor for a few seconds before placing the first corner.
- Go through doorways and up stairs calmly, filming the floor or the steps.
- On plain walls, aim at the floor just below a device if the wall isn't detected.

## Data

Plans are stored only in the browser (`localStorage`) of the device where they were made. Clearing the browser's site data erases them.

## Tech

A single self-contained `index.html`: vanilla JavaScript, [three.js](https://threejs.org/) r128 for the AR overlay and the 3D view, SVG for the plans, PeerJS and qrcode-generator (loaded on demand) for phone pairing. No build step, no server.

Phone pairing falls back on Cloudflare's TURN relay when the two devices can't connect directly. The short-lived TURN credentials come from a small Cloudflare Worker in `turn/`, which keeps the TURN key secret. To deploy it (wrangler needs Node 22+), create a TURN key in the Cloudflare dashboard (Realtime > TURN Server), then from `turn/`:

```bash
npx wrangler deploy
./set-key.sh   # asks for the key's ID and API token, checks them with Cloudflare, then stores them as Worker secrets
```

and set `TURN_URL` in `index.html` to the Worker's URL.
