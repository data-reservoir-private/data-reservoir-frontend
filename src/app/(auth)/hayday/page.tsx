import { API_ROUTE } from '@/constant/api-route'
import { IDashboardResponse } from '@/model/response/dashboard'
import { grabData } from '@/utilities/http'
import React from 'react'
import Section from '@/components/common/paper/Section'
import { Metadata } from 'next'
import { DATASETS_AVAILABLE } from '@/constant/data'
import SimpleRecordTableCards from '@/components/common/simple-dashboard/SimpleRecordTableCards'
import SimpleBarTableChart from '@/components/common/simple-dashboard/SimpleBarTableChart'
import SimpleQuickLink from '@/components/common/simple-dashboard/SimpleQuickLink'

export const metadata: Metadata = {
  title: 'Hayday - Data Reservoir'
}

export default async function Page() {
  'use cache'
  const { data } = await grabData<IDashboardResponse>(`${API_ROUTE.DASHBOARD}/hayday`);

  return (
    <Section variant='h4' name='Hayday'>
      <SimpleRecordTableCards response={data}/>
      <SimpleBarTableChart response={data}/>
      <SimpleQuickLink quickLink={DATASETS_AVAILABLE['hayday']} columns={{ xs: 1, sm: 2, md: 3 }}/>
    </Section>
  )
}