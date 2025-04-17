'use client'

import BasicGrid from '@/components/common/basic-grid/BasicGrid';
import BasicGridWithDetail from '@/components/common/basic-grid/BasicGridWithDetail';
import Error from '@/components/common/error/Error';
import SimpleButton from '@/components/common/form/SimpleButton';
import SimpleTextInput from '@/components/common/form/text-input/SimpleTextInput';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper';
import SimpleListboxNew from '@/components/common/simple-listbox/SimpleListboxNew';
import { API_ROUTE } from '@/constant/api-route';
import { HayDayProductResponse } from '@/model/response/hayday';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query'
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface HaydayProductState {
  keyword: string,
  category: string,
  level: number
}

const options = [
  "Ores",
  "Animals",
  "Bushes",
  "Supplies",
  "Processed",
  "Trees",
  "Crops"
].reduce((acc, curr) => {
  acc[curr] = curr;
  return acc
}, {} as { [key: string]: string })

export default function HaydayGridPage() {
  const [state, setState] = useState<HaydayProductState>({
    keyword: '',
    category: '',
    level: 0
  });
  const { data, isError, error, refetch, isLoading } = useQuery({
    queryKey: ["hayday-product"],
    queryFn: async () => {
      const j = await request<HayDayProductResponse[], HaydayProductState>({
        method: "GET",
        data: { ...state },
        url: API_ROUTE.HAY_DAY.PRODUCT,
      });
      return (j?.data ?? []);
    }
  });

  const router = useRouter();
  const handleOnChangeLevel = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 0) setState({ ...state, level: 0 });
    else if (!isNaN(e.currentTarget.valueAsNumber) && e.currentTarget.valueAsNumber >= 0) setState({ ...state, level: e.currentTarget.valueAsNumber });
  }

  return (
    <div className='flex flex-col gap-5'>
      <Paper className='w-full flex gap-2 max-md:flex-col p-3'>
        <SimpleListboxNew options={options} onChange={x => setState({ ...state, category: x })} value={state.category} defaultEmptyLabel='All Categories' />
        <SimpleTextInput type='number' value={state.level} onChange={handleOnChangeLevel} placeholder='XP' />
        <SimpleTextInput type='text' onBlur={e => setState({...state, keyword: e.currentTarget.value})} placeholder='Item Name'/>
        <SimpleButton type='button' color='blue' onClick={() => refetch({ cancelRefetch: true })}>Search</SimpleButton>
      </Paper>
      <div>
        { (isError && !data) && <Error message={error?.message}/> }
        { isLoading && <Loading/> }
        { (!isLoading && data && data.length === 0) && <span className='text-white'>Empty</span> }
        { (!isLoading && data && data.length > 0) && <BasicGrid data={data} gridContainerClasses='w-32 h-32' imageAlt={d => d.name} imageSrc={d => d.image} onClick={d => router.push(`/hayday/product/${d.id}`)}/> }
      </div>
    </div>
  )
}
