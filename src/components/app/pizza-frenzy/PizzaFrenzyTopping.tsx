import React, { Suspense } from 'react'
import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { PizzaFrenzyToppingResponse } from '@/model/response/pizza-frenzy';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import Loading from '@/components/common/loading/Loading';
import Image from 'next/image';
import GridDetail from '@/components/common/basic-grid/GridDetail';

export default function PizzaFrenzyTable() {
  const { isLoading, data } = useQuery({
    queryKey: ["pizza-frenzy"],
    queryFn: async () => {
      let j = await request <PizzaFrenzyToppingResponse[], {}>({
        method: "GET",
        url: API_ROUTE.PIZZA_FRENZY,
      });
      return (j?.data ?? []);
    }
  });

  const displayFunc = (d: PizzaFrenzyToppingResponse) => (
    <Image src={d.image} alt={d.general_name} width={80} height={80} className='w-20 max-h-20 rendering-crisp-edges'/>
  )

  const displayDetail = (d: PizzaFrenzyToppingResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <Paper className='w-full p-2 relative flex justify-center items-center aspect-square bg-blackish-200 border-2 border-white/20'>
        <Suspense fallback={<Loading/>}>
          <Image src={d.image} width={256} height={256} alt={d.general_name} placeholder='empty'></Image>
        </Suspense>
      </Paper>
      <div className='text-white text-lg font-bold'>
        { d.general_name }
      </div>
      <div className='flex flex-col'>
        {
          d.upgrades.map(upg => (
            <>
              <p>Level {upg.level}</p>
              <GridDetail data={{
                Name: upg.name,
                Price: upg.price,
                Description: upg.description,
              }}/>
            </>
          ))
        }
      </div>
    </div>
  )

  return (isLoading || !data) ? <Loading/> : <BasicGrid data={data} display={displayFunc} imageSrc={d => d.image} imageAlt={d => d.general_name} detail={displayDetail}/>
}
