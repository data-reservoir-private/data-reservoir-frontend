import React from 'react';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import { QuartzRecipeResponse } from '@/model/response/quartz';
import { API_ROUTE } from '@/constant/api-route';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import BasicWrapper from '@/components/common/basic-wrapper/BasicWrapper';

export default function QuartzRecipe() {
  const queryResult = useQuery({
    queryKey: ['quartz-recipe'],
    queryFn: async () => {
      const j = await request<QuartzRecipeResponse[], {}>({
        method: "GET",
        url: API_ROUTE.QUARTZ.RECIPE,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: QuartzRecipeResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <BasicGridDetailImage src={d.image} alt={d.name} className='rendering-pixelated'/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Recipe: (
          <ul className='flex flex-col gap-2'>
            {
              d.recipe.map((x, idx) => (<li key={idx}>{x}</li>))
            }
          </ul>
        )
      }}/>
    </div>
  );

  return (
    <BasicWrapper queryResult={queryResult}>
      <BasicGrid data={queryResult.data!} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} gridImageUnoptimized gridImageClasses='rendering-pixelated' />;
    </BasicWrapper>
  );
}
