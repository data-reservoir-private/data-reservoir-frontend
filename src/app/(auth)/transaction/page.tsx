import { API_ROUTE } from '@/constant/api-route';
import { IDashboardResponse } from '@/model/response/dashboard';
import { grabData } from '@/utilities/http';
import { Metadata } from 'next';
import Section from '@/components/common/paper/Section';
import { DATASETS_AVAILABLE } from '@/constant/data';
import SimpleRecordTableCards from '@/components/common/simple-dashboard/SimpleRecordTableCards';
import SimpleBarTableChart from '@/components/common/simple-dashboard/SimpleBarTableChart';
import SimpleQuickLink from '@/components/common/simple-dashboard/SimpleQuickLink';
import { IData } from '@/model/dto/export';

export const metadata: Metadata = {
  title: 'Transaction - Data Reservoir'
};

export default async function Page() {
  const { data } = await grabData<IDashboardResponse>(`${API_ROUTE.DASHBOARD}/transaction`);
  const date = new Date();
  const sets = {
    ...DATASETS_AVAILABLE['transaction'],
    categories: [
      {
        ...DATASETS_AVAILABLE['transaction'].categories[0],
        link: `/transaction/breakdown?year=${date.getFullYear()}&month=${date.getMonth() + 1}`
      }
    ]
  } as IData;

  return (
    <Section name="Transaction" variant='h4'>
      <SimpleRecordTableCards response={data}/>
      <SimpleBarTableChart response={data}/>
      <SimpleQuickLink quickLink={sets} columns={1}/>
    </Section>
  );
}