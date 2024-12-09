import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { HayDayBuildingResponse } from '@/model/response/hayday';
import Paper from '@/components/common/paper/Paper';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import Loading from '@/components/common/loading/Loading';
import Image from 'next/image';
import { secondToTimespan } from '@/utilities/general';
import { Suspense } from 'react';

export default function HaydayProduct() {
  const { isLoading, data } = useQuery({
    queryKey: ["hayday-building"],
    queryFn: async () => {
      let j = await request<HayDayBuildingResponse[], {}>({
        method: "GET",
        url: API_ROUTE.HAY_DAY.BUILDING,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: HayDayBuildingResponse) => (
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
        Image: (<a href={d.image} className='text-blue-300 underline'>Link</a>),
        Price: d.price,
        Time: secondToTimespan(d.time),
        XP: d.xp,
        Level: d.level,
        Produces: d.produces.length > 0 ? (
          <ul className='gap-2 flex flex-col'>
            {
              d.produces.map(i => (
                <li key={i.product_name}>
                  <div className='grid grid-cols-[2fr_8fr] gap-x-2'>
                    <div className='relative min-h-6 w-6'>
                      <Image src={i.product_image} alt={i.product_name} fill objectFit='contain' />
                    </div>
                    <span>{i.product_name}</span>
                  </div>
                </li>
              ))
            }
          </ul>
        ) : "-",
      }}/>
    </div>
  );

  return (isLoading || !data) ? <Loading /> : <BasicGrid data={data} imageAlt={d => d.name} imageSrc={d => d.image} detail={displayDetail} />
}