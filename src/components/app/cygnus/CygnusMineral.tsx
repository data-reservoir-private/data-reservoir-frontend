import React from 'react';
import Loading from '@/components/common/loading/Loading';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import BasicGridWithDetail from '@/components/common/basic-grid/BasicGridWithDetail';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import { API_ROUTE } from '@/constant/api-route';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import { CygnusMineralResponse } from '@/model/response/cygnus';

export default function CygnusMineral() {
  const { isLoading, data } = useQuery({
    queryKey: ['cygnus-mineral'],
    queryFn: async () => {
      const j = await request<CygnusMineralResponse[], {}>({
        method: "GET",
        url: API_ROUTE.CYGNUS.MINERAL,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: CygnusMineralResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <BasicGridDetailImage src={d.image} alt={d.name} className='rendering-pixelated' unoptimized/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Category: d.category,
        Name: d.name,
        Price: d.price,
        Description: d.description
      }}/>
    </div>
  );

  return (isLoading || !data) ? <Loading /> : <BasicGridWithDetail data={data} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} gridImageUnoptimized gridImageClasses='rendering-pixelated' />;
}
