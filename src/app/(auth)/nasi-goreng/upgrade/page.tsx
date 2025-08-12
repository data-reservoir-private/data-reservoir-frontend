import { API_ROUTE } from '@/constant/api-route'
import { getSearchParam, grabData } from '@/utilities/http'
import React from 'react';
import NasiGorengUpgradeForm, { NasiGorengUpgradeFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import { Metadata } from 'next';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { INasiGorengResponse } from '@/model/response/nasi-goreng';

export const metadata: Metadata = {
  title: 'Nasi Goreng Upgrade - Data Reservoir'
}

export default async function NasiGorengUpgrade() {
  const sp = await getSearchParam<NasiGorengUpgradeFormSchema>();
  const { data, pagination } = await grabData<INasiGorengResponse['upgrade'][]>(API_ROUTE.NASI_GORENG.UPGRADE, {
    name: sp.name ?? "",
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='Nasi Goreng Upgrades' variant='h4' breadcrumbs={BREADCRUMBS['nasi-goreng-upgrade']}>
      <NasiGorengUpgradeForm param={sp} totalData={pagination?.totalData ?? 0}/>
      <SimpleGrid data={data} link='/nasi-goreng/upgrade'/>
    </Section>
  )
}