import { ITEMS, ItemType, upgradeItem } from "~/use_case/mergeItem";

type ItemTile = {
  tileType: "item";
  properties: {
    itemType: ItemType;
  };
};

type EmptyTile = {
  tileType: "empty";
};

type FactoryTile = {
  tileType: "factory";
};

type Tile = ItemTile | EmptyTile | FactoryTile;

type Board = Tile[][];

export const generateBoard = (x: number, y: number): Board => {
  const board: Board = Array.from(new Array(x), () =>
    new Array(y).fill({ tileType: "empty" })
  );
  board[0][0] = { tileType: "factory" };
  return board;
};

export class MergeGame {
  public board: Board;
  private xSize: number;
  private ySize: number;

  constructor(xSize: number, ySize: number) {
    this.board = generateBoard(xSize, ySize);
    this.xSize = xSize;
    this.ySize = ySize;
  }

  private getTile(x: number, y: number): Tile {
    return this.board[x][y];
  }

  private setTile(x: number, y: number, tile: Tile) {
    console.log(`set item ${x}, ${y} to ${tile}`);
    this.board[x][y] = tile;
  }

  public merge(src: { x: number; y: number }, dest: { x: number; y: number }) {
    const srcItem = this.getTile(src.x, src.y);
    const destItem = this.getTile(dest.x, dest.y);

    if (srcItem.tileType !== "item") {
      console.error("src item is undefined");
      return;
    }
    if (destItem.tileType !== "item") {
      console.error("dest item is undefined");
      return;
    }
    if (srcItem.properties.itemType !== destItem.properties.itemType) {
      console.error("src item and dest item are different");
      return;
    }
    const upgraded: ItemTile = {
      tileType: "item",
      properties: {
        ...destItem.properties,
        itemType: upgradeItem(destItem.properties.itemType),
      },
    };
    this.setTile(dest.x, dest.y, upgraded);
    this.setTile(src.x, src.y, { tileType: "empty" });
  }

  public getBoard(): Board {
    return this.board;
  }

  public generateItem() {
    const emptyTiles: { x: number; y: number }[] = [];
    for (let i = 0; i < this.xSize; i++) {
      for (let j = 0; j < this.ySize; j++) {
        if (this.board[i][j].tileType === "empty") {
          emptyTiles.push({ x: i, y: j });
        }
      }
    }

    if (emptyTiles.length === 0) {
      console.error("no empty tiles");
      return;
    }

    const randomIndex = Math.floor(Math.random() * emptyTiles.length);
    const randomTile = emptyTiles[randomIndex];
    const randomItemType = ITEMS[Math.floor(Math.random() * 6)];
    this.setTile(randomTile.x, randomTile.y, {
      tileType: "item",
      properties: {
        itemType: randomItemType,
      },
    });
  }
}
