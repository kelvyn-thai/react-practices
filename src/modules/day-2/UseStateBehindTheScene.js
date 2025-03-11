const flushSyncCallback = () => {
  console.info("Redraw react dom");
};

const useState = (initializeValue) => {
  const hook = {
    value:
      typeof initializeValue === "function"
        ? initializeValue()
        : initializeValue,
    pendingQueue: [],
  };

  const dispatch = () => {
    console.info({ pendingQueue: hook.pendingQueue });
    while (hook.pendingQueue.length > 0) {
      const action = hook.pendingQueue.shift(); // dequeue action
      console.log({ action });
      hook.value = typeof action === "function" ? action(hook.value) : action; // can pass updater fnc or assign new value
    }
  };

  const get = () => hook.value;

  const set = (updater) => {
    hook.pendingQueue.push(updater);
    setTimeout(() => dispatch(), 0);
  };

  return [get, set];
};

const [getState, setState] = useState(0);
const state = getState();
setState(state + 1); // state is always 0
setState(state + 1);
setState(state + 1);
console.log(getState()); // wrong: 1
//
setState((prevState) => prevState + 1);
setState((prevState) => prevState + 1);
setState((prevState) => prevState + 1);

console.log(getState()); // corrected: 3
