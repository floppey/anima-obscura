# Anima Obscura

Anima Obscura is a Game Boy-style creature-collecting adventure inspired by classic monster-taming games. Explore a tile-based overworld, encounter wild monsters in tall grass, and build your team for turn-based battles. The project provides a baseline for creating your own Pokémon-like game using HTML5 Canvas and TypeScript.

## Features

- Tile-based overworld map (Game Boy style)
- Player character with grid movement and collision
- Tall grass with random wild monster encounters
- Easily extensible for new maps, monsters, and features
- Simple, readable TypeScript codebase

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the project**

   ```bash
   npm run dev
   ```

   (Or use your preferred dev server to serve `index.html`)

3. **Open in your browser**

   Navigate to `http://localhost:5173` (or the port shown in your terminal).

## Project Structure

- `src/`
  - `main.ts` — Entry point (overworld, player, encounters)
  - `maps/` — Tile maps and map rendering logic
  - `tiles/` — Tile definitions and tileset
  - `units/` — Player and monster classes
  - `classes/` — (Legacy) Core game classes (Game, Unit, Entity)
  - `input/` — Keyboard and mouse input handlers
  - `renderHelpers/` — Sprite rendering utilities
  - `util/` — Utility functions
  - `constants/` — Asset/image references
  - `css/` — Styles
- `public/assets/monsters/` — Example sprite images
- `index.html` — Main HTML file

## How to Build Your Game

- **Add new monsters:**
  - Create a new file in `src/units/` and extend the `Unit` class or create your own.
- **Add new maps:**
  - Add a new file in `src/maps/` and follow the format in `sampleMap.ts`.
- **Customize tiles:**
  - Edit `src/tiles/tileset.ts` to add or modify tile types and properties.
- **Handle encounters:**
  - Expand the wild encounter logic in `main.ts` to trigger battles or events.
- **Game logic:**
  - Add your logic to `main.ts` or create new classes in `src/` as needed.

## Customization Tips

- Use the provided `renderMap` and `PlayerCharacter` for overworld logic.
- Add sprites and animations for a more authentic look.
- Organize your code into modules for clarity and reusability.

## License

MIT — Use freely for workshops, learning, and your own projects.
