import { API_ROUTE } from '@/constant/api-route';
import { IPeriodicTableElementResponse } from '@/model/response/periodic-table';
import { grabData } from '@/utilities/http';
import { Metadata } from 'next';
import PeriodicTableClient from './table';

export const metadata: Metadata = {
  title: 'Periodic Table Element - Data Reservoir'
}

export default async function PeriodicTable() {
  const { data } = await grabData<IPeriodicTableElementResponse[]>(API_ROUTE.PERIODIC_TABLE_ELEMENT, {
    pageSize: 0,
  });

  return <PeriodicTableClient data={data} />
}