import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import Section from '@/components/common/paper/Section';
import { Metadata } from 'next';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { INasiGorengResponse } from '@/model/response/nasi-goreng';
import NasiGorengFriedRiceClient from './client';

export const metadata: Metadata = {
  title: 'Nasi Goreng Fried Rice - Data Reservoir'
}

export default async function NasiGorengFriedRice() {
  const { data } = await grabData<INasiGorengResponse['fried-rice'][]>(API_ROUTE.NASI_GORENG.FRIED_RICE, { pageSize: 0 });

  return (
    <Section name='Nasi Goreng Fried Rices' variant='h4' breadcrumbs={BREADCRUMBS['nasi-goreng-fried-rice']}>
      <NasiGorengFriedRiceClient data={data}/>
    </Section>
  )
}