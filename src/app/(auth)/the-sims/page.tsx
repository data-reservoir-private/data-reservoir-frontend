import { API_ROUTE } from '@/constant/api-route'
import { IDashboardResponse } from '@/model/response/dashboard'
import { grabData } from '@/utilities/http'
import React from 'react'
import { Metadata } from 'next'
import Section from '@/components/common/paper/Section'
import { DATASETS_AVAILABLE } from '@/constant/data'
import SimpleRecordTableCards from '@/components/common/simple-dashboard/SimpleRecordTableCards'
import SimpleBarTableChart from '@/components/common/simple-dashboard/SimpleBarTableChart'
import SimpleQuickLink from '@/components/common/simple-dashboard/SimpleQuickLink'

export const metadata: Metadata = {
  title: 'The Sims - Data Reservoir'
}

export default async function Page() {
  const { data } = await grabData<IDashboardResponse>(`${API_ROUTE.DASHBOARD}/the_sims`);

  return (
    <Section name="The Sims" variant='h4'>
      <SimpleRecordTableCards response={data}/>
      <SimpleBarTableChart response={data}/>
      <SimpleQuickLink quickLink={DATASETS_AVAILABLE['the-sims']}/>
    </Section>
  )
}