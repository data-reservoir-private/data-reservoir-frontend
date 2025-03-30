import React from 'react';
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { NasiGorengBurnedFoodResponse } from '@/model/response/nasi-goreng';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import BasicWrapper from '@/components/common/basic-wrapper/BasicWrapper';

export default function NasiGorengBurnedFood() {
  const queryResult = useQuery({
    queryKey: ['nasi-goreng-burned-food'],
    queryFn: async () => {
      const j = await request<NasiGorengBurnedFoodResponse[], {}>({
        method: "GET",
        url: API_ROUTE.NASI_GORENG.BURNED_FOOD,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: NasiGorengBurnedFoodResponse) => (
    <div className='w-full gap-3 flex flex-col'>
      <BasicGridDetailImage src={d.image} width={256} height={256} alt={d.name} unoptimized/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Category: d.category,
      }}/>
    </div>
  );

  return (
    <BasicWrapper queryResult={queryResult}>
      <BasicGrid data={queryResult.data!} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} gridContainerClasses='w-24 h-24' />;
    </BasicWrapper>
  );
}
