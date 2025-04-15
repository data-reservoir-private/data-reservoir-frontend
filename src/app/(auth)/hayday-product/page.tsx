'use client'

import BasicGridWithDetail from '@/components/common/basic-grid/BasicGridWithDetail';
import Error from '@/components/common/error/Error';
import SimpleTextInput from '@/components/common/form/text-input/SimpleTextInput';
import Loading from '@/components/common/loading/Loading';
import SimpleListboxNew from '@/components/common/simple-listbox/SimpleListboxNew';
import { API_ROUTE } from '@/constant/api-route';
import { HayDayProductResponse } from '@/model/response/hayday';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query'
import { Button, TextInput } from 'flowbite-react';
import React, { useState } from 'react'

interface HaydayProductState {
  keyword: string,
  category: string,
  level: number
}

const options = [
  "",
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
  const { isLoading, data, isError, error, refetch } = useQuery({
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

  if (isLoading) return (<Loading />);
  else if (isError || !data) return (<Error message={error?.message} />);

  return (
    <div>
      <div>
        <SimpleListboxNew options={options} onChange={x => setState({ ...state, category: x })} value={state.category} />
        <SimpleTextInput type='number' value={state.level} onChange={e => setState({...state, level: e.currentTarget.valueAsNumber})} />
        <SimpleTextInput type='text' value={state.keyword} onChange={e => setState({...state, keyword: e.currentTarget.value})}/>
        <Button type='button' color='blue' onClick={() => refetch({ cancelRefetch: true })}/>
      </div>
      <div>
        <BasicGridWithDetail data={data} imageAlt={d => d.name} imageSrc={d => d.image}/>
      </div>
    </div>
  )
}
