import { API_ROUTE } from '@/constant/api-route';
import { IDashboardResponse } from '@/model/response/dashboard';
import { grabData } from '@/utilities/http';
import Section from '@/components/common/paper/Section';
import { Metadata } from 'next';
import { DATASETS_AVAILABLE } from '@/constant/data';
import SimpleRecordTableCards from '@/components/common/simple-dashboard/SimpleRecordTableCards';
import SimpleBarTableChart from '@/components/common/simple-dashboard/SimpleBarTableChart';
import SimpleQuickLink from '@/components/common/simple-dashboard/SimpleQuickLink';
import { IData } from '@/model/dto/export';

export const metadata: Metadata = {
  title: 'Hayday - Data Reservoir'
};

export default async function Page() {
  const { data } = await grabData<IDashboardResponse>(API_ROUTE.DASHBOARD.HAYDAY);
  const date = new Date();
  const listLink = {
    ...DATASETS_AVAILABLE['hayday'],
    categories: [
      ...DATASETS_AVAILABLE['hayday']['categories'],
      {
        id: 'order',
        name: "Order",
        link: `/hayday/order?year=${date.getFullYear()}&month=${date.getMonth() + 1}`,
        description: '',
      }
    ]
  } as IData;

  return (
    <Section variant='h4' name='Hayday'>
      <SimpleRecordTableCards response={data}/>
      <SimpleBarTableChart response={data}/>
      <SimpleQuickLink quickLink={listLink} columns={{ xs: 1, sm: 2, md: 3 }}/>
    </Section>
  );
}