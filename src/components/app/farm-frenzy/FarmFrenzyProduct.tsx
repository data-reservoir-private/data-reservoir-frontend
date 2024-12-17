import React from 'react';
import Loading from '@/components/common/loading/Loading';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { FarmFrenzyProductResponse } from '@/model/response/farm-frenzy';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';

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
      <BasicGridDetailImage src={d.image} alt={d.name} unoptimized/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Price: d.price
      }}/>
    </div>
  );

  return (isLoading || !data) ? <Loading /> : <BasicGrid data={data} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} />;
}
