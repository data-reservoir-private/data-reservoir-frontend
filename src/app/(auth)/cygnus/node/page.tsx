import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ICygnusResponse } from '@/model/response/cygnus';

export const metadata: Metadata = {
  title: 'Cygnus Node - Data Reservoir'
}

export default async function TwoProduct() {
  const { data } = await grabData<ICygnusResponse['node'][]>(API_ROUTE.CYGNUS.NODE, {
    pageSize: 0,
  });

  return (
    <Section name='Cygnus Node' variant='h4' breadcrumbs={BREADCRUMBS['cygnus-node']}>
      <SimpleGrid data={data.map(x => ({ ...x, image: x.image[0] }))} link='/cygnus/node' unoptimizedImage pixelated/>
    </Section>
  )
}
