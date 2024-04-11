import { useCallback, useEffect, useMemo, useState } from "react";
import "~/app.css";
import { ItemFactory, ItemFactoryProps } from "~/components/itemFactory";
import { MergeItem, MergeItemProps } from "~/components/mergeItem";
import { MergeGame } from "~/use_case/mergeGame";
const TILE_SIZE = 80;
function App() {
  const game = useMemo(() => new MergeGame(8, 10), []);
  const [, setRenderCount] = useState(0);

  const merge = useCallback<MergeItemProps["merge"]>(
    (src, dest) => {
      game.merge(src, dest);
      setRenderCount((prev) => prev + 1);
    },
    [game]
  );

  const generateItem = useCallback<ItemFactoryProps["generateItem"]>(() => {
    game.generateItem();
    setRenderCount((prev) => prev + 1);
  }, [game]);

  useEffect(() => {
    console.log("game has changed.", game);
  }, [game]);

  console.count("render");
  const board = game.board;
  console.log(board);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {board.map((row, i) => {
        return (
          <div style={{ display: "flex", width: "100%" }} key={i}>
            {row.map((_, j) => {
              const tile = board[i][j];
              if (tile.tileType === "item") {
                return (
                  <MergeItem
                    key={`${i}-${j}`}
                    itemInfo={{
                      x: i,
                      y: j,
                      itemType: tile.properties.itemType,
                    }}
                    merge={merge}
                    size={TILE_SIZE}
                  />
                );
              } else if (tile.tileType === "empty") {
                return (
                  <div
                    key={`${i}-${j}`}
                    style={{
                      width: TILE_SIZE,
                      height: TILE_SIZE,
                      border: "1px solid black",
                    }}
                  ></div>
                );
              } else if (tile.tileType === "factory") {
                return (
                  <ItemFactory
                    key={`${i}-${j}`}
                    size={TILE_SIZE}
                    generateItem={generateItem}
                  />
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
