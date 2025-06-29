// Basic tileset for a Game Boy-style overworld
export enum TileType {
  Grass,
  TallGrass,
  Water,
  Tree,
  Path,
  Wall
}

export interface TileDef {
  type: TileType;
  solid: boolean;
  encounterChance?: number; // For wild encounters
  color: string; // Simple color for now
}

export const TILE_SIZE = 16;

export const tileset: Record<TileType, TileDef> = {
  [TileType.Grass]: { type: TileType.Grass, solid: false, color: '#7ec850' },
  [TileType.TallGrass]: { type: TileType.TallGrass, solid: false, color: '#4fa64b', encounterChance: 0.1 },
  [TileType.Water]: { type: TileType.Water, solid: true, color: '#3a6ea5' },
  [TileType.Tree]: { type: TileType.Tree, solid: true, color: '#2e5d34' },
  [TileType.Path]: { type: TileType.Path, solid: false, color: '#e2c290' },
  [TileType.Wall]: { type: TileType.Wall, solid: true, color: '#888888' },
};
