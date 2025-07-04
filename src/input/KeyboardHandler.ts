import { Game } from "../classes/Game";
import { sampleMap } from "../maps/sampleMap";

interface EventListeners {
  keydown: (e: KeyboardEvent) => void;
  keyup: (e: KeyboardEvent) => void;
}

export class KeyboardHandler {
  #id: number;
  #created: number;
  #game: Game;
  #destroyed: boolean = false;
  #eventListeners: Partial<EventListeners> = {};
  #pressedKeys: { [key: string]: boolean } = {};

  constructor(game: Game) {
    this.#created = Date.now();
    this.#id = Math.floor(Math.random() * 1000000);
    this.#game = game;
    this.#pressedKeys = {};
    this.#eventListeners = {
      keydown: this.keyDownHandler.bind(this),
      keyup: this.keyUpHandler.bind(this),
    };
  }

  init() {
    if (!window.keyboardhandlers) {
      window.keyboardhandlers = [];
    }
    window.keyboardhandlers.forEach((handler: KeyboardHandler) => {
      handler.destroy();
    });
    window.keyboardhandlers.push(this);
    Object.keys(this.#eventListeners).forEach((key) => {
      /* @ts-ignore */
      window.addEventListener(key, this.#eventListeners[key]);
    });
  }

  get pressedKeys() {
    return this.#pressedKeys;
  }

  private keyDownHandler = (e: KeyboardEvent) => {
    if (this.ignoreInput(e)) {
      return;
    }

    let moved = false;
    const map = this.#game.currentMap;
    if (e.key === "ArrowUp") {
      this.#game.player.facing = "up";
      this.#game.player.tryMove(0, -1, map);
      moved = true;
    } else if (e.key === "ArrowDown") {
      this.#game.player.facing = "down";
      this.#game.player.tryMove(0, 1, map);
      moved = true;
    } else if (e.key === "ArrowLeft") {
      this.#game.player.facing = "left";
      this.#game.player.tryMove(-1, 0, map);
      moved = true;
    } else if (e.key === "ArrowRight") {
      this.#game.player.facing = "right";
      this.#game.player.tryMove(1, 0, map);
      moved = true;
    }

    if (e.key === "Escape") {
      this.#game.paused = !this.#game.paused;
      return;
    }

    this.#pressedKeys[e.key.toUpperCase()] = true;

    if (moved) {
      this.#game.update();
      this.#game.render();
    }
  };

  private ignoreInput(e: KeyboardEvent) {
    return (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLButtonElement ||
      e.target instanceof HTMLSelectElement ||
      (e.target as HTMLElement)?.closest(".window")
    );
  }

  private keyUpHandler = (e: KeyboardEvent) => {
    if (this.ignoreInput(e)) {
      return;
    }
    this.#pressedKeys[e.key.toUpperCase()] = false;
  };

  destroy() {
    if (this.#destroyed) {
      return;
    }
    this.#destroyed = true;
    Object.keys(this.#eventListeners).forEach((key) => {
      /* @ts-ignore */
      window.removeEventListener(key, this.#eventListeners[key]);
    });
  }
}
