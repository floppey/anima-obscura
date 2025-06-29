// Renders a tile map to the canvas
import { tileset, TILE_SIZE, TileType } from "../tiles/tileset";

export function renderMap(
  ctx: CanvasRenderingContext2D,
  map: { width: number; height: number; data: TileType[][] },
  offsetX = 0,
  offsetY = 0
) {
  for (let y = 0; y < map.height; y++) {
    const row = map.data[y];
    if (!row) {
      console.warn(`Row ${y} is undefined in map data`);
      continue;
    }
    for (let x = 0; x < map.width; x++) {
      const tile = row[x];
      const def = tileset[tile];
      ctx.fillStyle = def ? def.color : "#000";
      ctx.fillRect(
        offsetX + x * TILE_SIZE,
        offsetY + y * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }
}
