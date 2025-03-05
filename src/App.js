import { createStore } from "./store";
import { useQuery } from "./useQuery";

const useBearStore = createStore((set, get) => {
  return {
    bears: 0,
    increasePopulation: () => {
      console.log("increasePopulation");
      set((state) => ({ bears: state.bears + 1 }));
    },
    removeAllBears: () => set({ bears: 0 }),
    getBrief: () => {
      return get().bears % 2 === 0 ? "male" : "female";
    },
  };
});

const useCounterStore = createStore((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default () => {
  const { bears, increasePopulation, getBrief } = useBearStore(
    (store) => store,
  );

  const { count, increment, decrement } = useCounterStore((s) => s);

  const { isPending, error, data } = useQuery({
    queryFn: () =>
      fetch("https://api.github.com/repos/TanStack/query").then((res) =>
        res.json(),
      ),
  });
  return (
    <div>
      <button onClick={increasePopulation}>Click me!</button>
      {<p>{`Total bears: ${bears}`}</p>}
      <p>{getBrief()}</p>
      <button onClick={increment}>➕ Increment</button>
      <button onClick={decrement}>➖ Decrement</button>
      <p>Counter: {count}</p>
      {isPending && <div>Loading...</div>}
      {error && <div>{JSON.stringify(error)}</div>}
      {data && (
        <>
          {" "}
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <strong>👀 {data.subscribers_count}</strong>{" "}
          <strong>✨ {data.stargazers_count}</strong>{" "}
          <strong>🍴 {data.forks_count}</strong>
        </>
      )}
    </div>
  );
};
