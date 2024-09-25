'use client'

import React, { useEffect, useState } from 'react'
import { Circle, LayerGroup, MapContainer, TileLayer, Tooltip } from 'react-leaflet'
import { Marker } from '@adamscybot/react-leaflet-component-marker';
import { LatLngBoundsExpression, Map as LeafletMap } from 'leaflet'
import { TransjakartaBusStopResponse } from '@/model/response/transjakarta';
import { useQuery } from '@tanstack/react-query';
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import Loading from '@/components/common/loading/Loading';
import { useAppStore } from '@/store/store';
import { LatLngExpression } from 'leaflet';
import { PiWarningFill } from 'react-icons/pi'
import { Label, ToggleSwitch } from 'flowbite-react';

import './map.css';

const DEFAULT_CENTER_LATLNT = [-6.185360791659521, 106.8196775099512];
const MAP_BOUNDARY = [[-6.030836457013818, 106.58502824971715], [-6.403683335765004, 107.04629657201926]];

interface TransjakartaBusStopMapState {
  permanentlyClosed: boolean
}

export default function TransjakartaBusStopMap() {
  const busStops = useAppStore(x => x.transjakarta.corridorBusStops);
  const [map, setMap] = useState<LeafletMap | null>();
  const [state, setState] = useState<TransjakartaBusStopMapState>({
    permanentlyClosed: false
  });
  const { isLoading, data } = useQuery({
    queryKey: ["transjakarta-bus-stop-map"],
    queryFn: async () => {
      let j = await request<TransjakartaBusStopResponse[], {}>({
        method: "GET",
        url: API_ROUTE.TRANSJAKARTA.BUS_STOP,
      });
      return (j?.data ?? []);
    }
  });

  useEffect(() => {
    // Ubah coordinate
    if (map) {
      let d = data?.filter(x => !busStops || busStops.length === 0 || busStops.includes(x.code)).filter(x => !x.permanentlyClosed && x.latitude !== 0) ?? [];
      if (d.length === 0) map.panTo(DEFAULT_CENTER_LATLNT as LatLngExpression);
      else {
        let meanLat = d.reduce((acc, x) => acc + x.latitude, 0) / d.length;
        let meanLnt = d.reduce((acc, x) => acc + x.longitude, 0) / d.length;
        
        map.panTo([meanLat, meanLnt]);
      }
    }

  }, [busStops, data, map]);

  if (isLoading || !data) return <Loading />

  const refinedPoints = data.filter(x =>
    (!busStops || busStops.length === 0 || busStops.includes(x.code)) && x.latitude !== 0
  );

  return (
    <div className="flex flex-col gap-4">
      <div className='w-full'>
        <div className='flex flex-col gap-2'>
          <Label>Permanently Closed</Label>
          <ToggleSwitch checked={state.permanentlyClosed} onChange={e => { setState({ ...state, permanentlyClosed: e }) }}/>
        </div>
      </div>
      <MapContainer
        ref={e => {setMap(e)}}
        center={DEFAULT_CENTER_LATLNT as LatLngExpression}
        maxBounds={MAP_BOUNDARY as LatLngBoundsExpression}
        className='z-[2] w-auto min-h-[500px] h-full'
        zoom={13}
        minZoom={11}
        maxZoom={17}
        scrollWheelZoom={true}
      >
        <TileLayer
          
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
        /> 
        <LayerGroup>
          {/* Normal */}
          {refinedPoints.map(x => {
            const sizeCircle = x.corridors.length * (x.brt ? 8 : 5);
            if (x.permanentlyClosed && state.permanentlyClosed) return (
              <Marker key={x.id} icon={<PiWarningFill className='text-yellow-400 text-lg' />} position={[x.latitude, x.longitude]}>
                <Tooltip>{x.name}</Tooltip>
              </Marker>
            )
            else return (
              <Circle key={x.id} center={[x.latitude, x.longitude]} radius={sizeCircle} color={x.brt ? 'blue' : 'red'} >
                <Tooltip>{x.name}</Tooltip>
              </Circle>
            )
          })}
        </LayerGroup>
      </MapContainer>
    </div>
  )
}
