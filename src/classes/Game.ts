import { KeyboardHandler } from "../input/KeyboardHandler";
import { Player } from "../units/Player";
import { renderMap } from "../maps/MapRenderer";
import { sampleMap } from "../maps/sampleMap";
import { TILE_SIZE, TileType, tileset } from "../tiles/tileset";
import { MapGrid } from "./Map";

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  keyboardHandler: KeyboardHandler;
  player: Player;
  paused = false;
  encounterCooldown = 0;
  currentMap: MapGrid;

  constructor(canvas?: HTMLCanvasElement) {
    this.canvas =
      canvas || (document.getElementById("canvas") as HTMLCanvasElement);
    this.canvas.width = TILE_SIZE * 15;
    this.canvas.height = TILE_SIZE * 15;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("2d context not supported");
    this.ctx = ctx;
    this.player = new Player(20, 20);
    this.currentMap = sampleMap;
    this.keyboardHandler = new KeyboardHandler(this);
    this.keyboardHandler.init();
  }

  clamp(val: number, min: number, max: number) {
    return Math.max(min, Math.min(max, val));
  }

  update() {
    if (this.paused) return;
    this.player.update();

    if (this.encounterCooldown <= 0) {
      // Wild encounter logic
      const tile = this.currentMap.data[this.player.y][this.player.x];

      if (
        tile === TileType.TallGrass &&
        Math.random() < (tileset[tile as TileType].encounterChance || 0)
      ) {
        this.encounterCooldown = 10;
        alert("A wild monster appeared! (placeholder)");
      }
    }
  }

  render() {
    const VIEWPORT_WIDTH = Math.floor(this.canvas.width / TILE_SIZE);
    const VIEWPORT_HEIGHT = Math.floor(this.canvas.height / TILE_SIZE);
    const camX = this.clamp(
      this.player.x - Math.floor(VIEWPORT_WIDTH / 2),
      0,
      this.currentMap.width - VIEWPORT_WIDTH
    );
    const camY = this.clamp(
      this.player.y - Math.floor(VIEWPORT_HEIGHT / 2),
      0,
      this.currentMap.height - VIEWPORT_HEIGHT
    );
    renderMap(this.ctx, this.currentMap, -camX * TILE_SIZE, -camY * TILE_SIZE);
    this.player.render(this.ctx, -camX * TILE_SIZE, -camY * TILE_SIZE);
  }

  start() {
    this.update();
    this.render();

    // const loop = () => {
    //   this.update();
    //   this.render();
    //   requestAnimationFrame(loop);
    // };
    // loop();
  }
}
