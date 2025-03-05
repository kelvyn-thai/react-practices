import { useSyncExternalStore } from "react";

let listeners = [];

export const createStore = (initialStore) => {
  let state = {};
  const set = (cb) => {
    try {
      const newState = typeof cb === "function" ? cb(get()) : cb;
      state = { ...state, ...newState };
      emitChange();
    } catch (err) {
      console.error(err);
    }
  };
  const get = () => {
    return state;
  };

  const emitChange = () => {
    for (let listener of listeners) {
      listener();
    }
  };

  state = {
    ...initialStore(set, get),
    subscribe(listener) {
      listeners = [...listeners, listener];
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
    getSnapshot() {
      return get();
    },
  };

  return (selector = (s) => s) => {
    return selector(useSyncExternalStore(state.subscribe, state.getSnapshot));
  };
};
