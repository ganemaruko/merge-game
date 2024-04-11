import { ItemType, upgradeItem } from "~/use_case/mergeItem";

type Board = (ItemType | undefined)[][];

export const generateBoard = (x: number, y: number): Board => {
  return Array.from(new Array(y), () => new Array(x).fill("RED"));
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

  private getItem(x: number, y: number): ItemType | undefined {
    return this.board[x][y];
  }

  private setItem(x: number, y: number, itemType: ItemType | undefined) {
    console.log(`set item ${x}, ${y} to ${itemType}`);
    this.board[x][y] = itemType;
  }

  public merge(src: { x: number; y: number }, dest: { x: number; y: number }) {
    const srcItem = this.getItem(src.x, src.y);
    const destItem = this.getItem(dest.x, dest.y);

    if (srcItem === undefined) {
      console.error("src item is undefined");
      return;
    }
    if (destItem === undefined) {
      console.error("dest item is undefined");
      return;
    }
    if (srcItem !== destItem) {
      console.error("src item and dest item are different");
      return;
    }

    this.setItem(dest.x, dest.y, upgradeItem(srcItem));
    this.setItem(src.x, src.y, undefined);
  }

  public getBoard(): Board {
    return this.board;
  }
}
