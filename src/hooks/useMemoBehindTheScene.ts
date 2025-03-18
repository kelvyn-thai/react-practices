/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { isEqual } from "lodash";

type AllowType = number | string | undefined | null | Record<string, unknown>;

type ICache = Record<
  string,
  {
    prevValue: AllowType;
    prevDeps: AllowType[];
  }
>;

interface ITodoItem {
  id: string;
  name: string;
  isCompleted: boolean;
}

interface IOrderItem {
  orderId: string;
  receiver: string;
  status: string;
}

const cache: ICache = {};

const useMemo = <T>(updater: () => T, deps: unknown[]): (() => AllowType) => {
  const calcValue = () => {
    const state = cache[updater.toString()] || {
      prevValue: null,
      prevDeps: [],
    };

    if (isEqual(state.prevDeps, deps)) {
      console.log("RETURN CACHED VALUE", state.prevValue);
      return state.prevValue;
    }

    state.prevValue = updater() as AllowType;
    state.prevDeps = [...(deps as AllowType[])];

    cache[updater.toString()] = state;
    return state.prevValue;
  };
  return calcValue;
};

const useCallback = <T>(
  updater: () => T,
  deps: unknown[],
): (() => AllowType) => {
  return useMemo(updater, deps);
};

const domTree: { todos: ITodoItem[]; orders: IOrderItem[] } = {
  todos: [
    {
      id: "514a1031-bbe6-45d9-be07-538bf8ddc137",
      name: "Clean the house",
      isCompleted: false,
    },
    {
      id: "6ec0c4c0-5530-42be-97c8-6996a2f09989",
      name: "Learn new thing",
      isCompleted: true,
    },
  ],
  orders: [
    { orderId: "dbf01df4", receiver: "Kelvyn", status: "pending" },
    { orderId: "bdb928a3", receiver: "Jihan", status: "completed" },
  ],
};
const render = () => {
  // const completedTodos = useMemo<ITodoItem[]>(
  //   () => domTree.todos.filter((todo) => todo.isCompleted === true),
  //   [domTree.todos],
  // );
  //
  // const pendingOrders = useMemo(
  //   () => domTree.orders.filter((order) => order.status === "pending"),
  //   [domTree.orders],
  // );
  //
  // console.info({ completedTodos, pendingOrders });

  const handleSubmit = useCallback(() => {
    console.log("Will submit data");
  }, [domTree.todos]);

  if (typeof handleSubmit === "function") {
    handleSubmit();
  }
};

const newTodo = {
  id: "a2748d8f-2649-4571-a233-7a6664c0f79c",
  name: "Washing clothes",
  isCompleted: true,
};

render();
render();

domTree.orders = [
  ...domTree.orders,
  { orderId: "new", receiver: "Min", status: "pending" },
];
domTree.todos = [...domTree.todos, newTodo];
render();
