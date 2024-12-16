import React from 'react';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { NasiGorengFriedRiceResponse } from '@/model/response/nasi-goreng';
import Image from 'next/image';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import GridDetail from '@/components/common/basic-grid/GridDetail';

export default function NasiGorengFriedRice() {
  const { isLoading, data } = useQuery({
    queryKey: ['nasi-goreng-fried-rice'],
    queryFn: async () => {
      const j = await request<NasiGorengFriedRiceResponse[], {}>({
        method: "GET",
        url: API_ROUTE.NASI_GORENG.FRIED_RICE,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: NasiGorengFriedRiceResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <Paper className='w-full flex justify-center items-center aspect-square bg-blackish-200 border-2 border-white/20'>
        <Image src={d.levels[0].image} width={128} height={128} alt={d.name} className='w-[50%] h-auto'/>
        <Image src={d.levels[5].image} width={128} height={128} alt={d.name} className='w-[50%] h-auto'/>
      </Paper>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Price: d.price,
        Description: d.description,
        Plate: (
          <>
            <div className='grid grid-cols-[2fr_8fr] gap-x-2'>
              <div className='relative min-h-12 w-12'>
                <Image src={d.plate.image} alt="Plate" fill objectFit='contain' />
              </div>
            </div>
          </>
        ),
        Tool: (
          <>
            <div className='grid grid-cols-[2fr_8fr] gap-x-2'>
              <div className='relative min-h-6 w-6'>
                <Image src={d.tool_image} alt={d.tool_name} fill objectFit='contain' />
              </div>
              <span>{d.tool_name}</span>
            </div>
          </>
        ),
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
      }} />
      
      <h1 className='text-lg font-bold'>Details</h1>
      <hr />
      <div className='flex flex-col gap-2'>
        {
          d.levels.map(level => (
            <div key={level.level}>
              <h1>Level {level.level}</h1>
              <GridDetail data={{
                Image: (
                  <div className='relative min-h-24 w-24 p-2'>
                    <Image src={level.image} alt="Plate" fill objectFit='contain' />
                  </div>
                ),
                "Fried Rices Needed": level.fried_rices_needed,
                Recipe: level.recipe.length > 0 ? (
                  <ul className='gap-2 flex flex-col'>
                    {
                      level.recipe.map(lr => (
                        <li key={lr.ingredient_name}>
                          <div className='grid grid-cols-[2fr_8fr] gap-x-2'>
                            <div className='relative min-h-6 w-6'>
                              <Image src={lr.ingredient_image} alt={lr.ingredient_name} fill objectFit='contain' />
                            </div>
                            <span>{lr.ingredient_name} ({lr.quantity})</span>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                ) : "-",
                Detail: level.details.length > 0 ? (
                  <ul className='gap-2 flex flex-col'>
                    {
                      level.details.map(ld => (
                        <li key={ld.upgrade_name}>
                          <div className='grid grid-cols-[2fr_8fr] gap-x-2'>
                            <div className='relative min-h-6 w-6'>
                              <Image src={ld.upgrade_image} alt={ld.upgrade_name} fill objectFit='contain' />
                            </div>
                            <span>{ld.upgrade_name}</span>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                ) : "-",
              }}/>
            </div>
          ))
        }
      </div>

    </div>
  );

  return (isLoading || !data) ? <Loading /> : <BasicGrid data={data} imageSrc={d => d.levels[0].image} imageAlt={d => d.name} detail={displayDetail} gridContainerClasses='w-24 h-24' />;
}
