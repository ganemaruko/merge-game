import { useCallback, useEffect, useMemo, useState } from "react";
import "~/app.css";
import { MergeItem, MergeItemProps } from "~/components/mergeItem";
import { MergeGame } from "~/use_case/mergeGame";

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
              return (
                <MergeItem
                  key={`${i}-${j}`}
                  itemInfo={{ x: i, y: j, itemType: board[i][j] }}
                  merge={merge}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
