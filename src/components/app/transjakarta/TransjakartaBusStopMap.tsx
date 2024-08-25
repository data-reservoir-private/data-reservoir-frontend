'use client'

import React, { useEffect, useRef, useState } from 'react'
import './map.css'

import { Circle, LayerGroup, MapContainer, TileLayer, Tooltip, useMap } from 'react-leaflet'
import { Map as LeafletMap } from 'leaflet'
import { TransjakartaBusStopResponse } from '@/model/response/transjakarta';
import { useQuery } from '@tanstack/react-query';
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import Loading from '@/components/common/loading/Loading';
import { useAppStore } from '@/store/store';
import { LatLngExpression } from 'leaflet';

const DEFAULT_CENTER_LATLNT = [-6.185360791659521, 106.8196775099512];

export default function TransjakartaBusStopMap() {
  const busStops = useAppStore(x => x.transjakarta.corridorBusStops);
  // const ref = useRef(null);
  // const map = useMap();
  const [map, setMap] = useState<LeafletMap | null>();
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
      let d = data?.filter(x => !busStops || busStops.length === 0 || busStops.includes(x.code)) ?? [];
      if (d.length === 0) map.panTo(DEFAULT_CENTER_LATLNT as LatLngExpression);
  
      let meanLat = d.reduce((acc, x) => acc + x.latitude, 0) / d.length;
      let meanLnt = d.reduce((acc, x) => acc + x.longitude, 0) / d.length;
      
      map.panTo([meanLat, meanLnt]);
    }

  }, [busStops, data, map]);

  if (isLoading || !data) return <Loading/>

  return (
    <div>
      <MapContainer
        ref={e => {setMap(e)}}
        center={DEFAULT_CENTER_LATLNT as LatLngExpression}
        maxBounds={[[-6.022210769601403, 106.53503856901193], [-6.646795566017102, 107.05886415852537]]}
        className='z-[2] w-[700px] h-full min-h-[500px]'
        zoom={13}
        minZoom={11}
        maxZoom={17}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          subdomains='abcd'
        />
        <LayerGroup>
          {data.filter(x => !busStops || busStops.length === 0 || busStops.includes(x.code)).map(x => (
            <Circle key={x.id} center={[x.latitude, x.longitude]} radius={x.brt ? 20 : 10} color={x.brt ? 'blue' : 'red'} >
              <Tooltip>{x.name}</Tooltip>
            </Circle>
          ))}
        </LayerGroup>
      </MapContainer>
    </div>
  )
}
