/* eslint-disable react-hooks/rules-of-hooks */

type TValue = number | string | Record<string, unknown>;

let batchingQueue: [any, TValue][] = [];
let isBatching = false;

function flushBatchQueue() {
  isBatching = false;
  batchingQueue.forEach(([hook, newState]) => {
    console.log({ hook, newState });
    hook.value = newState;
  });
  batchingQueue = [];
}

const forceUpdate = (): void => {
  console.info("Force re-render UI");
  console.log({ batchingQueue });
};
const useState = <T>(
  initialValue: T | (() => T),
): [() => T, (updater: T | ((prevValue: T) => T)) => void] => {
  debugger;
  const hook = {
    value:
      typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue,
  };

  const get = (): T => hook.value;

  const set = (updater: T | ((prevValue: T) => T)) => {
    let newState: T;
    if (typeof updater === "function") {
      newState = (updater as (prevValue: T) => T)(hook.value);
    } else {
      newState = updater as T;
    }

    batchingQueue.push([hook, newState as TValue]);

    if (!isBatching) {
      isBatching = true;
      setTimeout(() => {
        flushBatchQueue();
        forceUpdate(); // Only called once per batch
      }, 0);
    }
  };

  return [get, set];
};

const [getState, setState] = useState<number>(0);

// Functional Updates Test (Correct batching behavior)
setState((prevState) => prevState + 1);
setState((prevState) => prevState + 1);
setState((prevState) => prevState + 1);
console.log(getState()); // => 1 with "Force re-render UI only 1 time
// //
// setState((prevState: number) => prevState + 1);
// setState((prevState: number) => prevState + 1);
// setState((prevState: number) => prevState + 1);
//
// console.log(getState()); // corrected: 3
//
