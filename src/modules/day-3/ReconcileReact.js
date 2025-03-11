import { useState } from "react";

const Count = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      {count}{" "}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setCount((prevCount) => prevCount + 1);
        }}
      >
        CLick
      </button>
    </div>
  );
};
const ListWithoutKeyAnimation = () => {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry"]);

  const swapItems = () => {
    setItems([items[1], items[0], items[2]]); // Swap Apple and Banana
  };

  return (
    <>
      <button onClick={swapItems}>Swap Items</button>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="fade">
            {item}
            <Count />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListWithoutKeyAnimation;
