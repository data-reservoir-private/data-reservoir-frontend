import React from 'react';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import { NasiGorengToolResponse } from '@/model/response/nasi-goreng';

export default function NasiGorengTool() {
  const { isLoading, data } = useQuery({
    queryKey: ['nasi-goreng-tool'],
    queryFn: async () => {
      let j = await request<NasiGorengToolResponse[], {}>({
        method: "GET",
        url: API_ROUTE.NASI_GORENG.TOOL,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: NasiGorengToolResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <Paper className='w-full flex justify-center items-center aspect-square bg-blackish-200 border-2 border-white/20'>
        <Image src={d.image} width={256} height={256} alt={d.name} className='w-[50%] h-auto'/>
      </Paper>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Image: (<a href={d.image} className='text-blue-300 underline'>Link</a>),
        Price: d.price,
        "Short Description": d.short_description,
        "Long Description": d.long_description
      }} />
    </div>
  );

  return (isLoading || !data) ? <Loading /> : <BasicGrid data={data} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} />;
}
