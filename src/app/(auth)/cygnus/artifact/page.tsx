import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ICygnusResponse } from '@/model/response/cygnus';

export const metadata: Metadata = {
  title: 'Cygnus Artifact - Data Reservoir'
}

export default async function TwoProduct() {
  const { data } = await grabData<ICygnusResponse['artifact'][]>(API_ROUTE.CYGNUS.ARTIFACT, {
    pageSize: 0,
  });

  return (
    <Section name='Cygnus Artifact' variant='h4' breadcrumbs={BREADCRUMBS['cygnus-artifact']}>
      <SimpleGrid data={data} link='/cygnus/artifact' unoptimizedImage pixelated/>
    </Section>
  )
}
