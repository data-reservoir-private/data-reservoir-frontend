import { API_ROUTE } from '@/constant/api-route'
import { IDashboardResponse } from '@/model/response/dashboard'
import { grabData } from '@/utilities/http'
import React from 'react'
import Section from '@/components/common/paper/Section'
import { Metadata } from 'next'
import { DATASETS_AVAILABLE } from '@/constant/data'
import Alert from '@mui/material/Alert'
import SimpleRecordTableCards from '@/components/common/simple-dashboard/SimpleRecordTableCards'
import SimpleBarTableChart from '@/components/common/simple-dashboard/SimpleBarTableChart'
import SimpleQuickLink from '@/components/common/simple-dashboard/SimpleQuickLink'

export const metadata: Metadata = {
  title: 'Nasi Goreng - Data Reservoir'
}

export default async function Page() {
  const { data } = await grabData<IDashboardResponse>(`${API_ROUTE.DASHBOARD}/nasi_goreng`);

  return (
    <Section variant='h4' name='Nasi Goreng'>
      <Alert severity="warning" variant='filled'>🇮🇩 These data is sourced from non-English language. I have decided to NOT translate them 🇮🇩</Alert>
      <SimpleRecordTableCards response={data}/>
      <SimpleBarTableChart response={data}/>
      <SimpleQuickLink quickLink={DATASETS_AVAILABLE['nasi-goreng']}/>
    </Section>
  )
}