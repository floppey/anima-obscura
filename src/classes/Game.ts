import { KeyboardHandler } from "../input/KeyboardHandler";
import { Player } from "../units/Player";
import { renderMap } from "../maps/MapRenderer";
import { sampleMap } from "../maps/sampleMap";
import { TILE_SIZE, TileType, tileset } from "../tiles/tileset";

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  keyboardHandler: KeyboardHandler;
  player: Player;
  paused = false;
  encounterCooldown = 0;

  constructor(canvas?: HTMLCanvasElement) {
    this.canvas = canvas || document.createElement("canvas");
    this.canvas.width = 480;
    this.canvas.height = 480;
    if (!canvas) document.body.appendChild(this.canvas);
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("2d context not supported");
    this.ctx = ctx;
    this.keyboardHandler = new KeyboardHandler(this);
    this.keyboardHandler.init();
    this.player = new Player(20, 20);
    this.setupInput();
  }

  setupInput() {
    window.addEventListener("keydown", (e) => {
      let moved = false;
      if (e.key === "ArrowUp") {
        this.player.facing = "up";
        this.player.tryMove(0, -1, sampleMap);
        moved = true;
      } else if (e.key === "ArrowDown") {
        this.player.facing = "down";
        this.player.tryMove(0, 1, sampleMap);
        moved = true;
      } else if (e.key === "ArrowLeft") {
        this.player.facing = "left";
        this.player.tryMove(-1, 0, sampleMap);
        moved = true;
      } else if (e.key === "ArrowRight") {
        this.player.facing = "right";
        this.player.tryMove(1, 0, sampleMap);
        moved = true;
      }
      if (moved) {
        this.update();
        this.render();
      }
    });
  }

  clamp(val: number, min: number, max: number) {
    return Math.max(min, Math.min(max, val));
  }

  update() {
    if (this.paused) return;
    if (this.encounterCooldown > 0) this.encounterCooldown--;
    // Wild encounter logic
    const tile = sampleMap.data[this.player.y][this.player.x];
    if (
      tile === TileType.TallGrass &&
      Math.random() < (tileset[tile].encounterChance || 0) &&
      this.encounterCooldown === 0
    ) {
      this.encounterCooldown = 60; // Set cooldown BEFORE alert
      alert("A wild monster appeared! (placeholder)");
    }
    this.player.update();
  }

  render() {
    const VIEWPORT_WIDTH = Math.floor(this.canvas.width / TILE_SIZE);
    const VIEWPORT_HEIGHT = Math.floor(this.canvas.height / TILE_SIZE);
    const camX = this.clamp(
      this.player.x - Math.floor(VIEWPORT_WIDTH / 2),
      0,
      sampleMap.width - VIEWPORT_WIDTH
    );
    const camY = this.clamp(
      this.player.y - Math.floor(VIEWPORT_HEIGHT / 2),
      0,
      sampleMap.height - VIEWPORT_HEIGHT
    );
    renderMap(this.ctx, sampleMap, -camX * TILE_SIZE, -camY * TILE_SIZE);
    this.player.render(this.ctx, -camX * TILE_SIZE, -camY * TILE_SIZE);
  }

  start() {
    const loop = () => {
      this.update();
      this.render();
      requestAnimationFrame(loop);
    };
    loop();
  }
}
