import React from 'react';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { NasiGorengBurnedFoodResponse } from '@/model/response/nasi-goreng';
import Image from 'next/image';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';

export default function NasiGorengBurnedFood() {
  const { isLoading, data } = useQuery({
    queryKey: ['nasi-goreng-burned-food'],
    queryFn: async () => {
      let j = await request<NasiGorengBurnedFoodResponse[], {}>({
        method: "GET",
        url: API_ROUTE.NASI_GORENG.BURNED_FOOD,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: NasiGorengBurnedFoodResponse) => (
    <div className='w-full gap-3 flex flex-col'>
      <Paper className='w-full flex justify-center items-center aspect-square bg-blackish-200 border-2 border-white/20'>
        <Image src={d.image} width={256} height={256} alt={d.name} className='w-[50%] h-auto'/>
      </Paper>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Category: d.category,
        Image: (<a href={d.image} className='text-blue-300 underline'>Link</a>)
      }}/>
    </div>
  );

  return (isLoading || !data) ? <Loading /> : <BasicGrid data={data} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} />;
}
