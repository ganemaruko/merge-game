import { Rank, getNextRank } from "~/entity/rank";

export type ItemType = "RED" | "YELLOW" | "GREEN" | "BLUE" | "BLACK" | "WHITE";

export const ItemTypes: { [key in ItemType]: Rank } = {
  RED: 0,
  YELLOW: 1,
  GREEN: 2,
  BLUE: 3,
  BLACK: 4,
  WHITE: 5,
};

export const upgradeItem = (itemType: ItemType): ItemType => {
  const rank = ItemTypes[itemType];
  const nextRank = getNextRank(rank);
  const nextItemType = Object.keys(ItemTypes).find(
    (key) => ItemTypes[key as ItemType] === nextRank
  ) as ItemType;
  return nextItemType;
};

export type ItemInfo = {
  x: number;
  y: number;
  itemType: ItemType;
};
