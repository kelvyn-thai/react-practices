"use client";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

interface ITask {
  id: string;

  name: string;

  status: "In progress" | "Todo";
}

const tasks: ITask[] = [...Array(10)].map(() => ({
  id: v4(),
  name: "Anything",
  status: "Todo",
}));

const filterTasks = (tasks: ITask[], status: string): ITask[] => {
  console.log("re-calculate");
  console.time("START");
  console.timeLog("START");
  const filteredTasks = tasks.filter((task) => task.status === status);
  console.timeEnd("START");
  return filteredTasks;
};

// const delay = (ms: number): Promise<void> =>
// new Promise((resolve) => setTimeout(resolve, ms));

export default function App() {
  const [count, setCount] = useState<number>(0);

  const handleClickCount3Times = async () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };
  return (
    <div>
      Count = {count}
      <button onClick={handleClickCount3Times}>Click</button>
      {/* <button */}
      {/*   onClick={() => setLang((prevLang) => (prevLang === "en" ? "vn" : "en"))} */}
      {/* > */}
      {/*   Set language */}
      {/* </button> */}
      {/* {visibleTodos.map((task) => ( */}
      {/*   <div key={task.id}> */}
      {/*     <p>{task.id}</p> */}
      {/*     <p>{task.name}</p> */}
      {/*     <p>{task.status}</p> */}
      {/*   </div> */}
      {/* ))} */}
    </div>
  );
}
