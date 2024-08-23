'use client'

import React from 'react'
import './map.css'

import { Circle, LayerGroup, MapContainer, TileLayer, Tooltip } from 'react-leaflet'
import { TransjakartaBusStopResponse } from '@/model/response/transjakarta';
import { useQuery } from '@tanstack/react-query';
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import Loading from '@/components/common/loading/Loading';

export type TransjakartaBusStopMapProps = {
  selectedID?: string[]
}

export default function TransjakartaBusStopMap(props: TransjakartaBusStopMapProps) {

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

  if (isLoading || !data) return <Loading/>

  return (
    <div>
      <MapContainer
        center={[-6.185360791659521, 106.8196775099512]}
        maxBounds={[[-6.022210769601403, 106.53503856901193], [-6.646795566017102, 107.05886415852537]]}
        className='z-[2]'
        zoom={13}
        minZoom={13}
        maxZoom={17}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          subdomains='abcd'
        />
        <LayerGroup>
          {data.filter(x => !props.selectedID || props.selectedID.length === 0 || props.selectedID.includes(x.id)).map(x => (
            <Circle key={x.id} center={[x.latitude, x.longitude]} radius={x.brt ? 20 : 10} color={x.brt ? 'blue' : 'red'} >
              <Tooltip>{x.name}</Tooltip>
            </Circle>
          ))}
        </LayerGroup>
      </MapContainer>
    </div>
  )
}
