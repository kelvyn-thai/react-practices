import { useEffect } from "react";
import { createStore } from "./store";

export const useQueryStore = createStore((set, get) => {
  return {
    isPending: false,
    error: null,
    data: null,
    setPending: (pending) => set({ isPending: pending }),
    setError: (err) => set({ error: err }),
    setData: (data) => set({ data }),
    executeQueryFn: async ({ queryFn }) => {
      const { setPending, setData, setError } = get();
      let response;
      try {
        setPending(true);
        response = await queryFn();
        console.log({ response });
        setData(response);
      } catch (error) {
        setError(error);
      } finally {
        setPending(false);
      }
      return response;
    },
  };
});

export const useQuery = ({ queryFn }) => {
  const { isPending, error, data, executeQueryFn } = useQueryStore((s) => s);
  useEffect(() => {
    executeQueryFn({ queryFn });
  }, []);
  return {
    isPending,
    error,
    data,
  };
};
