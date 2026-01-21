import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import Section from '@/components/common/paper/Section';
import { Metadata } from 'next';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { INasiGorengResponse } from '@/model/response/nasi-goreng';

export const metadata: Metadata = {
  title: 'Nasi Goreng Upgrade - Data Reservoir'
}

export default async function NasiGorengUpgrade() {
  const { data } = await grabData<INasiGorengResponse['upgrade'][]>(API_ROUTE.NASI_GORENG.UPGRADE, {
    pageSize: 0,
  });

  return (
    <Section name='Nasi Goreng Upgrades' variant='h4' breadcrumbs={BREADCRUMBS['nasi-goreng-upgrade']}>
      <SimpleGrid data={data} link='/nasi-goreng/upgrade'/>
    </Section>
  )
}