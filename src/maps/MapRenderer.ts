// Renders a tile map to the canvas
import { tileset, TILE_SIZE, TileType } from '../tiles/tileset';

export function renderMap(ctx: CanvasRenderingContext2D, map: { width: number; height: number; data: TileType[][] }, offsetX = 0, offsetY = 0) {
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      const tile = map.data[y][x];
      const def = tileset[tile];
      ctx.fillStyle = def.color;
      ctx.fillRect(
        offsetX + x * TILE_SIZE,
        offsetY + y * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }
}
