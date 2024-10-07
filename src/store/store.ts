import { QueryClient } from "@tanstack/react-query";
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { produce } from 'immer'

export interface QueryClientStore {
  queryClient: QueryClient
}
export interface TransjakartaStore {
  corridorCode: string | null,
  corridorBusStops: number[],
  setCorridorCode: (code: string) => void,
  setCorridorBusStops: (busStops: number[]) => void,
  clearCorridor: () => void,
}

export interface TransjakartaCorridorColor { code: string, color: string };

export type NewTransjakartaStore = {
  mode: 'corridor' | 'bus-stop' | '',
  corridorColors: Record<string, string>,
  corridorCode: string,
  busStopCode: number,
  setCorridor: (corridorCode: string) => void,
  setBusStop: (busStopCode: number) => void,
  unsetTransjakarta: () => void,
  setCorridorStyle: (corridorColors: TransjakartaCorridorColor[]) => void
}

export interface AppStore {
  query: QueryClientStore,
  transjakarta: TransjakartaStore,
  newTransjakarta: NewTransjakartaStore
}

export const useAppStore = create<AppStore>()(
  devtools(set => (
    {
      query: {
        queryClient: new QueryClient({
          defaultOptions: {
            queries: {
              gcTime: 3600 * 24,
              refetchOnWindowFocus: false
            }
          }
        })
      },
      newTransjakarta: {
        mode: '',
        busStopCode: 0,
        corridorCode: '',
        corridorColors: {},
        setBusStop: (busStopCode: number) => set(produce<AppStore>(state => {
          state.newTransjakarta.mode = 'bus-stop';
          state.newTransjakarta.busStopCode = busStopCode;
        })),
        setCorridor: (corridorCode: string) => set(produce<AppStore>(state => {
          state.newTransjakarta.mode = 'corridor';
          state.newTransjakarta.corridorCode = corridorCode;
        })),
        unsetTransjakarta: () => set(produce<AppStore>(state => {
          state.newTransjakarta.mode = state.newTransjakarta.corridorCode = '';
          state.newTransjakarta.busStopCode = 0;
        })),
        setCorridorStyle: (corridorColors: TransjakartaCorridorColor[]) => set(produce<AppStore>(state => {
          console.log(corridorColors.reduce<Record<string, string>>((acc, val) => { acc[val.code] = val.color; return acc; }, {}));
          state.newTransjakarta.corridorColors = corridorColors.reduce<Record<string, string>>((acc, val) => { acc[val.code] = `${val.color.startsWith('#') ? '' : '#'}${val.color}`; return acc; }, {});
        })),
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
    }
  )
));