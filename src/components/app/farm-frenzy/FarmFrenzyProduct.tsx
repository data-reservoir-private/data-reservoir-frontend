import React from 'react';
import Loading from '@/components/common/loading/Loading';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { FarmFrenzyProductResponse } from '@/model/response/farm-frenzy';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import Paper from '@/components/common/paper/Paper';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import Image from 'next/image';

export interface FarmFrenzyProductProps {
  url: string,
  queryKey: string
}

export default function FarmFrenzyProduct(props: FarmFrenzyProductProps) {
  const { isLoading, data } = useQuery({
    queryKey: [props.queryKey],
    queryFn: async () => {
      const j = await request<FarmFrenzyProductResponse[], {}>({
        method: "GET",
        url: props.url,
      });
      return (j?.data ?? []);
    },
  });

  const displayDetail = (d: FarmFrenzyProductResponse) => (
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
        Image: (<a href={d.image} className='text-blue-300 underline'>Link</a>),
        Price: d.price
      }}/>
    </div>
  );

  return (isLoading || !data) ? <Loading /> : <BasicGrid data={data} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} />;
}
