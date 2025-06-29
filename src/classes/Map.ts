import { TileType } from "../tiles/tileset";

export class MapGrid {
  data: TileType[][];
  width: number;
  height: number;

  constructor(data: TileType[][]) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Map data must be a non-empty 2D array");
    }
    const rowLength = data[0].length;
    for (let i = 0; i < data.length; i++) {
      if (data[i].length !== rowLength) {
        throw new Error(
          `Row ${i} has length ${data[i].length}, expected ${rowLength}`
        );
      }
    }
    this.data = data;
    this.height = data.length;
    this.width = rowLength;
  }
}
