import { MergeGameData } from "~/use_case/mergeGame";
import { ItemInfo } from "~/use_case/mergeItem";

export const mergeItem = (
  src: ItemInfo,
  dest: ItemInfo,
  gameData: MergeGameData,
  updateGameData: (gameData: MergeGameData) => void
) => {
  const newGameData = { ...gameData };
  newGameData.board[dest.x][dest.y] = src.itemType;
  newGameData.board[src.x][src.y] = undefined;
  updateGameData(newGameData);
};
