import { API_ROUTE } from '@/constant/api-route'
import { IHaydayResponse } from '@/model/response/hayday';
import { grabData } from '@/utilities/http'
import Section from '@/components/common/paper/Section';
import { Metadata } from 'next';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import HaydayBuildingClient from './client';

export const metadata: Metadata = {
  title: 'Hayday Building - Data Reservoir'
}

export default async function HaydayBuilding() {
  const { data } = await grabData<IHaydayResponse['hayday-building'][]>(API_ROUTE.HAY_DAY.BUILDING, {
    pageSize: 0,
  });

  return (
    <Section name='Hayday Buildings' variant='h4' breadcrumbs={BREADCRUMBS['hayday-building']}>
      <HaydayBuildingClient data={data} />
    </Section>
  )
}
