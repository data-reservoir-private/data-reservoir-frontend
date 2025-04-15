import React from 'react';
import Loading from '@/components/common/loading/Loading';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import BasicGridWithDetail from '@/components/common/basic-grid/BasicGridWithDetail';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import { QuartzUtensilResponse } from '@/model/response/quartz';
import { API_ROUTE } from '@/constant/api-route';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import BasicWrapper from '@/components/common/basic-wrapper/BasicWrapper';

export default function QuartzUtensil() {
  const queryResult = useQuery({
    queryKey: ['quartz-utensil'],
    queryFn: async () => {
      const j = await request<QuartzUtensilResponse[], {}>({
        method: "GET",
        url: API_ROUTE.QUARTZ.UTENSIL,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: QuartzUtensilResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <BasicGridDetailImage src={d.image} alt={d.name} className='rendering-pixelated'/>
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

  return (
    <BasicWrapper queryResult={queryResult}>
      <BasicGridWithDetail data={queryResult.data!} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} gridImageUnoptimized gridImageClasses='rendering-pixelated' />
    </BasicWrapper>
  );
}
