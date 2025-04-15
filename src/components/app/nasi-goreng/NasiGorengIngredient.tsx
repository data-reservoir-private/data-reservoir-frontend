import React from 'react';
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { NasiGorengIngredientResponse } from '@/model/response/nasi-goreng';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import Image from 'next/image';
import { Checkbox } from 'flowbite-react';
import BasicGridWithDetail from '@/components/common/basic-grid/BasicGridWithDetail';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import BasicWrapper from '@/components/common/basic-wrapper/BasicWrapper';

export default function NasiGorengIngredient() {
  const queryResult = useQuery({
    queryKey: ['nasi-goreng-ingredient'],
    queryFn: async () => {
      const j = await request<NasiGorengIngredientResponse[], {}>({
        method: "GET",
        url: API_ROUTE.NASI_GORENG.INGREDIENT,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: NasiGorengIngredientResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <BasicGridDetailImage src={d.image} width={256} height={256} alt={d.name} unoptimized/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Category: d.category,
        Price: d.price,
        Processed: <Checkbox checked={d.is_processed} size={8} disabled />,
        Description: d.description,
        Tool: d.tool ? (
          <>
            <div className='grid grid-cols-[2fr_8fr] gap-x-2'>
            <div className='relative min-h-6 w-6'>
              <Image src={d.tool.tool_image} alt={d.tool.tool_name} fill objectFit='contain' />
            </div>
              <span>{d.tool.tool_name}</span>
            </div>
          </>
        ) : "-",
        Recipe: d.recipe.length > 0 ? (
          <ul className='gap-2 flex flex-col'>
            {
              d.recipe.map(i => (
                <li key={i.ingredient_name}>
                  <div className='grid grid-cols-[2fr_8fr] gap-x-2'>
                    <div className='relative min-h-6 w-6'>
                      <Image src={i.ingredient_image} alt={i.ingredient_name} fill objectFit='contain' />
                    </div>
                    <span>{i.ingredient_name}</span>
                  </div>
                </li>
              ))
            }
          </ul>
        ) : "-",
      }}/>
    </div>
  );

  return (
    <BasicWrapper queryResult={queryResult}>
      <BasicGridWithDetail data={queryResult.data!} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} />
    </BasicWrapper>
  );
}
