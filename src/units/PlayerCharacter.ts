// Simple player character for grid movement
import { TILE_SIZE, tileset, TileType } from '../tiles/tileset';

export class PlayerCharacter {
  x: number;
  y: number;
  facing: 'up' | 'down' | 'left' | 'right' = 'down';

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  tryMove(dx: number, dy: number, map: { data: TileType[][] }) {
    const nx = this.x + dx;
    const ny = this.y + dy;
    const tile = map.data[ny]?.[nx];
    if (tile === undefined) return;
    if (!tileset[tile].solid) {
      this.x = nx;
      this.y = ny;
    }
  }

  render(ctx: CanvasRenderingContext2D, offsetX = 0, offsetY = 0) {
    ctx.fillStyle = '#2222ff';
    ctx.fillRect(
      offsetX + this.x * TILE_SIZE,
      offsetY + this.y * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE
    );
    // Optionally: draw a face/eye for direction
    ctx.fillStyle = '#fff';
    if (this.facing === 'up') ctx.fillRect(offsetX + this.x * TILE_SIZE + 6, offsetY + this.y * TILE_SIZE + 2, 4, 4);
    if (this.facing === 'down') ctx.fillRect(offsetX + this.x * TILE_SIZE + 6, offsetY + this.y * TILE_SIZE + 10, 4, 4);
    if (this.facing === 'left') ctx.fillRect(offsetX + this.x * TILE_SIZE + 2, offsetY + this.y * TILE_SIZE + 6, 4, 4);
    if (this.facing === 'right') ctx.fillRect(offsetX + this.x * TILE_SIZE + 10, offsetY + this.y * TILE_SIZE + 6, 4, 4);
  }
}
