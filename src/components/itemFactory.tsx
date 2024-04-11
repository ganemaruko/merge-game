export type ItemFactoryProps = {
  size: number;
  generateItem: () => void;
};

export const ItemFactory = (props: ItemFactoryProps) => {
  return (
    <div
      style={{
        width: props.size,
        height: props.size,
        border: "1px solid black",
        backgroundColor: "gray",
      }}
      onClick={() => {
        console.log("factory clicked");
        props.generateItem();
      }}
    >
      ItemFactory
    </div>
  );
};
