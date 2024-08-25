import { QueryClient } from "@tanstack/react-query";
import { create } from 'zustand'
import { produce } from 'immer'

export interface QueryClientStore {
  queryClient: QueryClient,
  setQueryClient: (s : QueryClient) => void
}
export interface TransjakartaStore {
  corridorCode: string | null,
  corridorBusStops: number[],
  setCorridorCode: (code: string) => void,
  setCorridorBusStops: (busStops: number[]) => void,
  clearCorridor: () => void,
}

export interface AppStore {
  query: QueryClientStore,
  transjakarta: TransjakartaStore
}

export const useAppStore = create<AppStore>(set => ({
  query: {
    queryClient: new QueryClient(),
    setQueryClient: (s) => set(produce<AppStore>((state) => {
      state.query.queryClient = s;
    }))
  },
  transjakarta: {
    corridorCode: null,
    corridorBusStops: [],
    setCorridorCode: (code: string) => set(produce<AppStore>((state) => {
      state.transjakarta.corridorCode = code;
    })),
    setCorridorBusStops: (busStops: number[]) => set(produce<AppStore>((state) => {
      state.transjakarta.corridorBusStops = busStops;
    })),
    clearCorridor: () => set(produce<AppStore>((state) => {
      state.transjakarta.corridorCode = null;
      state.transjakarta.corridorBusStops = [];
    })),
  }
}));