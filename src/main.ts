import { sampleMap } from "./maps/sampleMap";
import { renderMap } from "./maps/MapRenderer";
import { PlayerCharacter } from "./units/PlayerCharacter";
import { TILE_SIZE, tileset, TileType } from "./tiles/tileset";

const canvas = document.createElement("canvas");
canvas.width = sampleMap.width * TILE_SIZE;
canvas.height = sampleMap.height * TILE_SIZE;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d")!;

const player = new PlayerCharacter(2, 2);

let encounterCooldown = 0;

function render() {
  renderMap(ctx, sampleMap);
  player.render(ctx);
}

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
