import { API_ROUTE } from '@/constant/api-route'
import { IHaydayResponse } from '@/model/response/hayday';
import { getSearchParam, grabData } from '@/utilities/http'
import React from 'react';
import HaydayBuildingForm, { HaydayBuildingFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import { Metadata } from 'next';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'Hayday Building - Data Reservoir'
}

export default async function HaydayBuilding() {
  const sp = await getSearchParam<HaydayBuildingFormSchema>();
  const { data, pagination } = await grabData<IHaydayResponse['hayday-building'][]>(API_ROUTE.HAY_DAY.BUILDING, {
    name: sp.name ?? "",
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
    level: sp.level
  });

  return (
    <Section name='Hayday Buildings' variant='h4' breadcrumbs={BREADCRUMBS['hayday-building']}>
      <HaydayBuildingForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid boxClassName='w-40 h-40' columns={6} data={data} link='/hayday/building'/>
    </Section>
  )
}
