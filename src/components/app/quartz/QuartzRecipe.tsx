import React from 'react';
import Loading from '@/components/common/loading/Loading';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import Paper from '@/components/common/paper/Paper';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import Image from 'next/image';
import { QuartzRecipeResponse } from '@/model/response/quartz';
import { API_ROUTE } from '@/constant/api-route';

export default function QuartzRecipe() {
  const { isLoading, data } = useQuery({
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
      <Paper className='w-full flex justify-center items-center aspect-square bg-blackish-200 border-2 border-white/20'>
        <Image src={d.image} width={64} height={64} alt={d.name} className='rendering-pixelated'/>
      </Paper>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Image: (<a href={d.image} className='text-blue-300 underline'>Link</a>),
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

  return (isLoading || !data) ? <Loading /> : <BasicGrid data={data} imageSrc={d => d.image} imageAlt={d => d.name} detail={displayDetail} gridImageUnoptimized gridImageClasses='rendering-pixelated' />;
}
