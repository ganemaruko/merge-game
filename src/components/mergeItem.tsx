import { rgba } from "polished";
import { useEffect, useMemo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useRecoilState } from "recoil";
import { isDraggingState } from "~/store/recoilState";

import { ItemInfo } from "~/use_case/mergeItem";

export type MergeItemProps = {
  itemInfo: ItemInfo;
  merge: (src: ItemInfo, dest: ItemInfo) => void;
  size: number;
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
    [props.itemInfo.itemType]
  );

  const [, drop] = useDrop<ItemInfo, unknown, { isDragging: boolean }>(
    () => ({
      accept: props.itemInfo.itemType,
      drop: (item, monitor) => {
        console.log(item, monitor);
        props.merge(item, props.itemInfo);
        setIsDragging(false);
      },
    }),
    [props.itemInfo.itemType]
  );

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
        width: props.size,
        height: props.size,
        border: "1px solid black",
      }}
    >
      <div
        ref={drop}
        style={{
          position: "absolute",
          backgroundColor: color ? rgba(color, 0.1) : undefined,
          opacity: isDragging ? 0.5 : 1,
          width: props.size,
          height: props.size,
          pointerEvents: isDragging ? undefined : "none",
          zIndex: isDragging ? 1 : -1,
        }}
      />
      <div
        ref={drag}
        style={{
          position: "absolute",
          width: props.size,
          height: props.size,
          border: "1px solid white",
          cursor: "move",
        }}
      >
        {color}
      </div>
    </div>
  );
};
