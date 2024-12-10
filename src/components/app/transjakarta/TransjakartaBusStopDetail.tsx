import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route';
import { TransjakartaBusStopDetailResponse } from '@/model/response/transjakarta';
import { useAppStore } from '@/store/store';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaBus } from "react-icons/fa";
import { TbBusStop } from "react-icons/tb";
import TransjakartaCode from './TransjakartaCode';
import { PiWarningFill } from 'react-icons/pi';

export default function TransjakartaBusStopDetail() {
  const [busStopCode, corridorColors] = useAppStore(x => [x.newTransjakarta.busStopCode, x.newTransjakarta.corridorColors]);

  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["transjakarta-bus-stop-map-detail", busStopCode],
    queryFn: async () => {
      let j = await request<TransjakartaBusStopDetailResponse, {}>({
        method: "GET",
        url: API_ROUTE.TRANSJAKARTA.BUS_STOP + `/${busStopCode}`,
      });
      return (j?.data);
    }
  });

  if (isLoading || isFetching) return (<Loading />);
  else if (!data) return (<p>No data</p>);

  return (
    <Paper className='p-4 min-h-[450px]'>
      <div className='h-full flex flex-col gap-4'>
        <div className='flex items-center gap-2'>
          <h3 className='text-lg font-bold flex-grow'>{data.name}</h3>
          { data.brt && <FaBus className='text-3xl text-blue-400' title='BRT'/> }
          {!data.brt && <TbBusStop className='text-3xl text-red-400' title='Non-BRT' />}
          { data.permanentlyClosed && <PiWarningFill className='text-yellow-400 text-3xl' title='Permanently Closed from Gmaps'/> }
        </div>
        <hr className='border-3 border-slate-400' />
        <div className='flex gap-2 flex-wrap'>
          { data.corridors.map(x => (<TransjakartaCode key={x} code={x} color={corridorColors[x]}/>)) }
        </div>
      </div>
    </Paper>
  );
}
