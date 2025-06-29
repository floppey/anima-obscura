import { Entity } from "../classes/Entity";
import { TILE_SIZE, tileset, TileType } from "../tiles/tileset";

export class Player extends Entity {
  x: number;
  y: number;
  facing: "up" | "down" | "left" | "right" = "down";

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }

  tryMove(
    dx: number,
    dy: number,
    map: { data: TileType[][]; width: number; height: number }
  ) {
    const nx = this.x + dx;
    const ny = this.y + dy;
    if (nx < 0 || ny < 0 || nx >= map.width || ny >= map.height) return;
    const tile = map.data[ny]?.[nx];
    if (tile === undefined) return;
    if (!tileset[tile].solid) {
      this.x = nx;
      this.y = ny;
    }
  }

  update() {
    // Placeholder for future logic (e.g., animation, status)
  }

  render(ctx: CanvasRenderingContext2D, offsetX = 0, offsetY = 0) {
    ctx.fillStyle = "#2222ff";
    ctx.fillRect(
      offsetX + this.x * TILE_SIZE,
      offsetY + this.y * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE
    );
    ctx.fillStyle = "#fff";
    const faceSize = Math.floor(TILE_SIZE / 8);
    if (this.facing === "up")
      ctx.fillRect(
        offsetX + this.x * TILE_SIZE + TILE_SIZE / 2 - faceSize / 2,
        offsetY + this.y * TILE_SIZE + TILE_SIZE / 8,
        faceSize,
        faceSize
      );
    if (this.facing === "down")
      ctx.fillRect(
        offsetX + this.x * TILE_SIZE + TILE_SIZE / 2 - faceSize / 2,
        offsetY + this.y * TILE_SIZE + TILE_SIZE * 0.75 - faceSize / 2,
        faceSize,
        faceSize
      );
    if (this.facing === "left")
      ctx.fillRect(
        offsetX + this.x * TILE_SIZE + TILE_SIZE / 8,
        offsetY + this.y * TILE_SIZE + TILE_SIZE / 2 - faceSize / 2,
        faceSize,
        faceSize
      );
    if (this.facing === "right")
      ctx.fillRect(
        offsetX + this.x * TILE_SIZE + TILE_SIZE * 0.75 - faceSize / 2,
        offsetY + this.y * TILE_SIZE + TILE_SIZE / 2 - faceSize / 2,
        faceSize,
        faceSize
      );
  }
}
