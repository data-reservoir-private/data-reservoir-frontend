import React from 'react';
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { PizzaFrenzyToppingResponse } from '@/model/response/pizza-frenzy';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import Image from 'next/image';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import BasicWrapper from '@/components/common/basic-wrapper/BasicWrapper';

export default function PizzaFrenzyTable() {
  const queryResult = useQuery({
    queryKey: ["pizza-frenzy"],
    queryFn: async () => {
      const j = await request <PizzaFrenzyToppingResponse[], {}>({
        method: "GET",
        url: API_ROUTE.PIZZA_FRENZY,
      });
      return (j?.data ?? []);
    }
  });

  const displayFunc = (d: PizzaFrenzyToppingResponse) => (
    <Image src={d.image} alt={d.general_name} width={0} height={0} unoptimized className='object-contain w-full h-full p-4'/>
  );

  const displayDetail = (d: PizzaFrenzyToppingResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <BasicGridDetailImage src={d.image} alt={d.general_name} className='rendering-pixelated'/>
      <div className='text-white text-lg font-bold'>
        { d.general_name }
      </div>
      <div className='flex flex-col gap-3'>
        {
          d.upgrades.map(upg => (
            <div key={upg.name}>
              <p className='mb-1'>Level {upg.level}</p>
              <GridDetail data={{
                Name: upg.name,
                Price: upg.price,
                Description: upg.description,
              }}/>
            </div>
          ))
        }
      </div>
    </div>
  );

  return (
    <BasicWrapper queryResult={queryResult}>
      <BasicGrid data={queryResult.data!} display={displayFunc} imageSrc={d => d.image} imageAlt={d => d.general_name} detail={displayDetail} gridContainerClasses='w-24 h-24' />
    </BasicWrapper>
  );
}