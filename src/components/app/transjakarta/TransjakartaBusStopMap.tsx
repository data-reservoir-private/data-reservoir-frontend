'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TransjakartaBusStopResponse } from '@/model/response/transjakarta';
import { useQuery } from '@tanstack/react-query';
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import Loading from '@/components/common/loading/Loading';
import { useAppStore } from '@/store/store';
import { LatLngExpression } from 'leaflet';
import { Label, ToggleSwitch } from 'flowbite-react';

import './map.css';

const DEFAULT_CENTER_LATLNT = [-6.185360791659521, 106.8196775099512];
const MAP_BOUNDARY = [[-5.961622687240897, 106.25797317146241], [-6.472351625803001, 107.1415468426288]];

interface TransjakartaBusStopMapState {
  permanentlyClosed: boolean
}   

export default function TransjakartaBusStopMap() {
  const [setBusStop] = useAppStore(x => [x.newTransjakarta.setBusStop]);
  const [state, setState] = useState<TransjakartaBusStopMapState>({
    permanentlyClosed: false
  });
  const { isLoading, data } = useQuery({
    queryKey: ["transjakarta-bus-stop-map"],
    queryFn: async () => {
      const j = await request<TransjakartaBusStopResponse[], {}>({
        method: "GET",
        url: API_ROUTE.TRANSJAKARTA.BUS_STOP,
      });
      return (j?.data ?? []);
    }
  });

  if (isLoading || !data) return <Loading />;

  const handleOnClickDot = (busStopCode: number) => setBusStop(busStopCode);
  return (
    <div className="flex flex-col gap-4">
      <div className='w-full'>
        <div className='flex flex-col gap-2'>
          <Label>Permanently Closed</Label>
          <ToggleSwitch checked={state.permanentlyClosed} onChange={e => { setState({ ...state, permanentlyClosed: e }); }}/>
        </div>
      </div>
    </div>
  );
}
