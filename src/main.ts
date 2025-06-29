import { sampleMap } from "./maps/sampleMap";
import { renderMap } from "./maps/MapRenderer";
import { PlayerCharacter } from "./units/PlayerCharacter";
import { TILE_SIZE, tileset, TileType } from "./tiles/tileset";

// Set viewport size (in tiles)
const canvas = document.createElement("canvas");
canvas.width = 480;
canvas.height = 480;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d")!;
const VIEWPORT_WIDTH = Math.floor(canvas.width / TILE_SIZE);
const VIEWPORT_HEIGHT = Math.floor(canvas.height / TILE_SIZE);

// Place player at a visible, walkable tile (e.g., just inside the village fence)
const player = new PlayerCharacter(20, 20);

let encounterCooldown = 0;

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function render() {
  // Calculate camera offset to center player
  const camX = clamp(
    player.x - Math.floor(VIEWPORT_WIDTH / 2),
    0,
    sampleMap.width - VIEWPORT_WIDTH
  );
  const camY = clamp(
    player.y - Math.floor(VIEWPORT_HEIGHT / 2),
    0,
    sampleMap.height - VIEWPORT_HEIGHT
  );
  renderMap(ctx, sampleMap, -camX * TILE_SIZE, -camY * TILE_SIZE);
  player.render(ctx, -camX * TILE_SIZE, -camY * TILE_SIZE);
}

// Update tryMove to expect the full map object
PlayerCharacter.prototype.tryMove = function (dx, dy, map) {
  const nx = this.x + dx;
  const ny = this.y + dy;
  if (nx < 0 || ny < 0 || nx >= map.width || ny >= map.height) {
    return;
  }
  const tile = map.data[ny]?.[nx];
  if (tile === undefined) return;
  if (!tileset[tile].solid) {
    this.x = nx;
    this.y = ny;
  }
};

function update() {
  // Placeholder for encounter cooldown
  if (encounterCooldown > 0) encounterCooldown--;
  // Check for wild encounter in tall grass
  const tile = sampleMap.data[player.y][player.x];
  if (
    tile === TileType.TallGrass &&
    Math.random() < (tileset[tile].encounterChance || 0) &&
    encounterCooldown === 0
  ) {
    alert("A wild monster appeared! (placeholder)");
    encounterCooldown = 60; // Prevent immediate re-trigger
  }
}

window.addEventListener("keydown", (e) => {
  let moved = false;
  if (e.key === "ArrowUp") {
    player.facing = "up";
    player.tryMove(0, -1, sampleMap);
    moved = true;
  } else if (e.key === "ArrowDown") {
    player.facing = "down";
    player.tryMove(0, 1, sampleMap);
    moved = true;
  } else if (e.key === "ArrowLeft") {
    player.facing = "left";
    player.tryMove(-1, 0, sampleMap);
    moved = true;
  } else if (e.key === "ArrowRight") {
    player.facing = "right";
    player.tryMove(1, 0, sampleMap);
    moved = true;
  }
  if (moved) {
    update();
    render();
  }
});

render();
