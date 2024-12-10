import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { HayDayProductResponse } from '@/model/response/hayday';
import Paper from '@/components/common/paper/Paper';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import Loading from '@/components/common/loading/Loading';
import Image from 'next/image';
import { Checkbox } from 'flowbite-react';
import { secondToTimespan } from '@/utilities/general';
import { Suspense } from 'react';

export default function HaydayProduct() {
  const { isLoading, data } = useQuery({
    queryKey: ["hayday-product"],
    queryFn: async () => {
      let j = await request<HayDayProductResponse[], {}>({
        method: "GET",
        url: API_ROUTE.HAY_DAY.PRODUCT,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: HayDayProductResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <Paper className='w-full p-2 relative flex justify-center items-center aspect-square bg-blackish-200 border-2 border-white/20'>
        <Suspense fallback={<Loading/>}>
          <Image src={d.image} width={256} height={256} alt={d.name} placeholder='empty'></Image>
        </Suspense>
      </Paper>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Category: d.category,
        Image: (<a href={d.image} className='text-blue-300 underline'>Link</a>),
        Price: d.price,
        Time: secondToTimespan(d.time),
        XP: d.xp,
        Level: d.level,
        "Is Raw": (
          <Checkbox checked={d.is_raw} size={8} disabled/>
        ),
        "Made In": d.producer ? (
          <>
            <div className='grid grid-cols-[2fr_8fr] gap-x-2'>
            <div className='relative min-h-6 w-6'>
              <Image src={d.producer.building_image} alt={d.producer.building_name} fill objectFit='contain' />
            </div>
              <span>{d.producer.building_name}</span>
            </div>
          </>
        ) : "-",
        Recipe: d.ingredients.length > 0 ? (
          <ul className='gap-2 flex flex-col'>
            {
              d.ingredients.map(i => (
                <li key={i.ingredient_name}>
                  <div className='grid grid-cols-[2fr_8fr] gap-x-2'>
                    <div className='relative min-h-6 w-6'>
                      <Image src={i.ingredient_image} alt={i.ingredient_name} fill objectFit='contain' />
                    </div>
                    <span>{i.ingredient_name} ({i.quantity})</span>
                  </div>
                </li>
              ))
            }
          </ul>
        ) : "-",
        "Used By": d.usage.length > 0 ? (
          <ul className='gap-2 flex flex-col'>
            {
              d.usage.map(i => (
                <li key={i.product_name}>
                  <div className='grid grid-cols-[2fr_8fr] gap-x-2'>
                    <div className='relative min-h-6 w-6'>
                      <Image src={i.product_image} alt={i.product_name} fill objectFit='contain' />
                    </div>
                    <span>{i.product_name} ({i.quantity})</span>
                  </div>
                </li>
              ))
            }
          </ul>
        ) : "-"
      }}/>
    </div>
  );

  return (isLoading || !data) ? <Loading /> : <BasicGrid data={data} imageAlt={d => d.name} imageSrc={d => d.image} detail={displayDetail} />;
}