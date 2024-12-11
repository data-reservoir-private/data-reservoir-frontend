import React from 'react';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { NasiGorengPlateResponse } from '@/model/response/nasi-goreng';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import Image from 'next/image';

export default function NasiGorengPlate() {
  const { isLoading, data } = useQuery({
    queryKey: ['nasi-goreng-plate'],
    queryFn: async () => {
      const j = await request<NasiGorengPlateResponse[], {}>({
        method: "GET",
        url: API_ROUTE.NASI_GORENG.PLATE,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: NasiGorengPlateResponse) => (
    <div className='w-full gap-3 flex flex-col'>
      <Paper className='w-full flex justify-center items-center aspect-square bg-blackish-200 border-2 border-white/20'>
        <Image src={d.image} width={256} height={256} alt={d.index.toString()} className='w-[50%] h-auto'/>
      </Paper>
      <GridDetail data={{
        ID: d.id,
        Index: d.index,
        Image: (<a href={d.image} className='text-blue-300 underline'>Link</a>)
      }}/>
    </div>
  );

  return (isLoading || !data) ? <Loading /> : <BasicGrid data={data} imageSrc={d => d.image} imageAlt={d => d.index.toString()} detail={displayDetail} />;
}
