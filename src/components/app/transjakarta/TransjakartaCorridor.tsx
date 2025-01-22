import Loading from '@/components/common/loading/Loading';
import { API_ROUTE } from '@/constant/api-route';
import { TransjakartaCorridorResponse } from '@/model/response/transjakarta';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import TransjakartaCode from './TransjakartaCode';
import Paper from '@/components/common/paper/Paper';
import TransjakartaCorridorDetail from './corridor/TransjakartaCorridorDetail';
import classNames from 'classnames';

export default function TransjakartaCorridor() {

  const [corridor, setCorridor] = useState("");
  const { isLoading, data } = useQuery({
    queryKey: ['transjakarta-corridor'],
    queryFn: async () => {
      const j = await request<TransjakartaCorridorResponse[], {}>({
        method: "GET",
        url: API_ROUTE.TRANSJAKARTA.CORRIDOR,
      });
      return (j?.data ?? []);
    },
  });

  if (isLoading || !data) return <Loading />;
  
  const regrouping: {[key: string]: TransjakartaCorridorResponse[]} = data.reduce((grouping, el) => {
    if (!grouping[el.category]) grouping[el.category] = [el];
    else grouping[el.category].push(el);
    return grouping;
  }, {} as {[key: string]: TransjakartaCorridorResponse[]});

  return (
      <div className='h-full flex gap-5'>
        <div className='text-white flex-grow overflow-y-scroll scrollbar-default p-3'>
          {
            Object.entries(regrouping).map(([key, value]) => (
              <div key={key} className='py-3'>
                <h1 className='text-lg font-bold pb-4'>{key}</h1>
                <div className='flex gap-2 flex-wrap'>
                  {
                    value.sort((a, b) => a.code.length === b.code.length ? a.code.localeCompare(b.code) : a.code.length - b.code.length).map(corridor => (
                      <div key={corridor.code}>
                        <TransjakartaCode code={corridor.code} color={corridor.color} onClickCode={(code) => setCorridor(code)} className='hover:opacity-65 cursor-pointer'/>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
        <Paper className={classNames('min-w-80', {
          'flex justify-center': corridor.length > 0,
          'text-center': corridor.length === 0
        })}>
          { corridor.length > 0 ? <TransjakartaCorridorDetail corridorCode={corridor}/> : <p className='text-white/35 text-center'>Select a corridor</p>}
        </Paper>
      </div>
  );
}
