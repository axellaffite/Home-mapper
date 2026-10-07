# Home mapper

Map your home in augmented reality, right from your phone's browser: point at the corners of each room, and get a dimensioned floor plan of the whole house, floor by floor, with doors, windows and electrical devices.

**Live app:** https://axellaffite.github.io/Home-mapper/

> The interface is in French.

## Features

- **Room survey in AR**: aim at the foot of each corner and tap; walls, area and perimeter are computed live. Close the room on the first corner and give it a name.
- **Whole-house plans**: survey several rooms in one session and they are positioned relative to each other automatically. Rooms surveyed in separate sessions can be arranged by hand (drag, rotate).
- **Multiple floors**: floors are detected from height changes when you take the stairs, and stay aligned with each other.
- **Doors and windows**: door, double door, sliding door, window, French window, sliding bay. Swing direction and hinge side can be inverted afterwards.
- **Electrical devices** with standard French floor-plan symbols: ceiling light, recessed spot, wall light, 16 A and 32 A outlets, switch, two-way switch, RJ45, TV outlet, smoke detector, electrical panel.
- **Manual plan editor** (zoom with wheel, pinch or buttons; full-height plan with a side panel on wide screens): drag corners (they snap square to their neighbours), add or remove corners, type exact wall lengths, move doors, windows and devices on the plan, with undo. Rooms can also be drawn by hand, without AR.
- **PDF export**: one A4 sheet per floor at a standard scale (1:50, 1:75, 1:100…), with dimensions, title block, room area table and electrical legend.
- **Share by link**: the whole house is compressed into the link itself (after the `#`, never sent to a server); the recipient previews it and can import it.
- **Robust tracking**: world anchors, tracking-loss detection, smoothed target, and manual realignment after a tracking jump.
- **Local storage**: everything is saved automatically in the browser, and an interrupted survey can be recovered.

## Requirements

AR uses [WebXR](https://immersiveweb.dev/) (`immersive-ar` + `hit-test`), so it needs an **Android phone compatible with ARCore** running **Chrome**, on an HTTPS page (GitHub Pages provides it).

Safari on iPhone does not support WebXR yet. On any other device you can still browse and edit plans, draw rooms by hand, and try the built-in example house.

## Tips for a good survey

- Light the rooms well, move slowly and keep the floor in view.
- Sweep the floor for a few seconds before placing the first corner.
- Go through doorways and up stairs calmly, filming the floor or the steps.
- On plain walls, aim at the floor just below a device if the wall isn't detected.

## Data

Plans are stored only in the browser (`localStorage`) of the device where they were made. Clearing the browser's site data erases them.

## Tech

A single self-contained `index.html`: vanilla JavaScript, [three.js](https://threejs.org/) r128 for the AR overlay, SVG for the plans. No build step, no server.
