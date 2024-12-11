import React from 'react';
import Loading from '@/components/common/loading/Loading';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import { API_ROUTE } from '@/constant/api-route';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import { CygnusDishResponse } from '@/model/response/cygnus';

export default function CygnusDish() {
  const { isLoading, data } = useQuery({
    queryKey: ['cygnus-dish'],
    queryFn: async () => {
      const j = await request<CygnusDishResponse[], {}>({
        method: "GET",
        url: API_ROUTE.CYGNUS.DISH,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: CygnusDishResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <BasicGridDetailImage src={d.image} alt={d.name} className='rendering-pixelated' unoptimized/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Image: (<a href={d.image} className='text-blue-300 underline'>Link</a>),
        Price: d.price,
        Description: d.description,
        Ingredients: (
          <ul className='flex flex-col gap-2'>
            {
              Object.entries(d.ingredients).map(([key, value]) => (<li key={key}>{key} ({value})</li>))
            }
          </ul>
        )
      }}/>
    </div>
  );

  return (isLoading || !data) ? <Loading /> : <BasicGrid data={data} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} gridImageUnoptimized gridImageClasses='rendering-pixelated' />;
}
