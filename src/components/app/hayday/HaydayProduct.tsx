import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { HayDayProductResponse } from '@/model/response/hayday';
import Paper from '@/components/common/paper/Paper';
import GridDetail from '@/components/common/basic-grid/GridDetail';
import BasicGridWithDetail from '@/components/common/basic-grid/BasicGridWithDetail';
import Loading from '@/components/common/loading/Loading';
import Image from 'next/image';
import { Checkbox } from 'flowbite-react';
import { secondToTimespan } from '@/utilities/general';
import BasicGridDetailImage from '@/components/common/basic-grid/BasicGridDetailImage';
import HaydayIconHelper from './HaydayIconHelper';
import Error from '@/components/common/error/Error';
import SimpleListbox from '@/components/common/simple-listbox/SimpleListbox';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';


interface HaydayProductState {
  keyword: string,
  category: string
}

export default function HaydayProduct() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["hayday-product"],
    queryFn: async () => {
      const j = await request<HayDayProductResponse[], {}>({
        method: "GET",
        url: API_ROUTE.HAY_DAY.PRODUCT,
      });
      return (j?.data ?? []);
    }
  });

  const [state, setState] = useState<HaydayProductState>({
    keyword: '',
    category: ''
  });

  const inputDeb = useDebouncedCallback((value: string) => {
    setState({ ...state, keyword: value });
  }, 1000);

  const displayDetail = (d: HayDayProductResponse) => (
    <div className='w-full gap-3 flex flex-col overflow-scroll scrollbar-none'>
      <BasicGridDetailImage src={d.image} alt={d.name} className='rendering-pixelated' unoptimized/>
      <div className='text-white text-lg font-bold'>
        { d.name }
      </div>
      <GridDetail data={{
        ID: d.id,
        Name: d.name,
        Category: d.category,
        Price: <div className='flex gap-1'>{d.price} <HaydayIconHelper type='coins'/> </div>,
        Time: <div className='flex gap-1'>{secondToTimespan(d.time)} <HaydayIconHelper type='time'/> </div>,
        XP: <div className='flex gap-1'>{d.xp} <HaydayIconHelper type='xp'/> </div>,
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

  if (isLoading) return (<Loading />);
  else if (isError || !data) return (<Error message={error?.message} />);
  
  const pickedChoice = data.reduce((acc, curr) => acc.includes(curr.category) ? acc : [...acc, curr.category], [] as string[])
    .reduce((acc, curr) => { 
      acc[curr] = curr;
      return acc;
    }, {} as { [key: string]: string });

  return (
    <>
      <Paper className='p-2 flex justify-between gap-4'>
        <SimpleListbox onChange={v => setState({ ...state, category: v })} options={pickedChoice} value={state.category} defaultEmptyLabel='All Categories'/>
        <input
          className='text rounded-sm border-2 px-2 py-1 text-sm border-gray-500 bg-gray-600 text-white outline-none w-full'
          placeholder='Keyword'
          onChange={e => inputDeb(e.target.value)}
        />
      </Paper>
      <BasicGridWithDetail data={data.filter(x => (state.keyword.length === 0 || x.name.toLowerCase().includes(state.keyword.toLowerCase())) && (state.category.length === 0 || state.category === x.category))} imageAlt={d => d.name} imageSrc={d => d.image} detail={displayDetail} />
    </>
  );
}