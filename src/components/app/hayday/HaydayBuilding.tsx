import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { HayDayBuildingResponse } from '@/model/response/hayday';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import Loading from '@/components/common/loading/Loading';
import Image from 'next/image';
import { secondToTimespan } from '@/utilities/general';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import HaydayIconHelper from './HaydayIconHelper';
import Error from '@/components/common/error/Error';

export default function HaydayProduct() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["hayday-building"],
    queryFn: async () => {
      const j = await request<HayDayBuildingResponse[], {}>({
        method: "GET",
        url: API_ROUTE.HAY_DAY.BUILDING,
      });
      return (j?.data ?? []);
    }
  });

  const displayDetail = (d: HayDayBuildingResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <BasicGridDetailImage src={d.image} alt={d.name} className='rendering-pixelated w-full h-full' unoptimized/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Price: <div className='flex gap-1'>{d.price} <HaydayIconHelper type='coins'/> </div>,
        Time: <div className='flex gap-1'>{secondToTimespan(d.time)} <HaydayIconHelper type='time'/> </div>,
        XP: <div className='flex gap-1'>{d.xp} <HaydayIconHelper type='xp'/> </div>,
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

  if (isLoading) return (<Loading />);
  else if (isError || !data) return (<Error message={error?.message}/>);
  return <BasicGrid data={data} imageAlt={d => d.name} imageSrc={d => d.image} detail={displayDetail} gridContainerClasses='w-20 h-20' />;
}