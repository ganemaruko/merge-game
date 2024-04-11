import { rgba } from "polished";
import { useEffect, useMemo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useRecoilState } from "recoil";
import { isDraggingState } from "~/store/recoilState";

import { ItemInfo } from "~/use_case/mergeItem";

export type MergeItemProps = {
  itemInfo: ItemInfo;
  merge: (src: ItemInfo, dest: ItemInfo) => void;
};

export const MergeItem = (props: MergeItemProps) => {
  const [isDragging, setIsDragging] = useRecoilState(isDraggingState);
  const [{ isDragging: isLocalDragging }, drag] = useDrag<
    ItemInfo,
    unknown,
    { isDragging: boolean }
  >(
    () => ({
      type: props.itemInfo.itemType,
      item: props.itemInfo,
      end: (item, monitor) => {
        console.log(item, monitor);
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  const [, drop] = useDrop<ItemInfo, unknown, { isDragging: boolean }>(() => ({
    accept: props.itemInfo.itemType,
    drop: (item, monitor) => {
      console.log(item, monitor);
      props.merge(item, props.itemInfo);
    },
  }));

  useEffect(() => {
    setIsDragging(isLocalDragging);
  }, [isLocalDragging, setIsDragging]);

  const color = useMemo(() => {
    switch (props.itemInfo.itemType) {
      case "BLACK":
        return "black";
      case "WHITE":
        return "white";
      case "BLUE":
        return "blue";
      case "RED":
        return "red";
      case "YELLOW":
        return "yellow";
      case "GREEN":
        return "green";
      default:
        return undefined;
    }
  }, [props.itemInfo.itemType]);
  return (
    <div
      style={{
        position: "relative",
        width: "80px",
        height: "80px",
        border: "1px solid black",
      }}
    >
      {/* <DragPreviewImage connect={preview} src={reactLogo} /> */}
      <div
        ref={drop}
        style={{
          position: "absolute",
          backgroundColor: color ? rgba(color, 0.1) : undefined,
          opacity: isDragging ? 0.5 : 1,
          width: "80px",
          height: "80px",
          // bottom: "100px",
          pointerEvents: isDragging ? undefined : "none",
          zIndex: isDragging ? 1 : -1,
        }}
      />
      <div
        ref={drag}
        style={{
          position: "absolute",
          // opacity: isDragging ? 0.5 : 1,
          // zIndex: 2,
          width: "80px",
          height: "80px",
          border: "1px solid white",
        }}
      >
        {color}
      </div>
    </div>
  );
};
