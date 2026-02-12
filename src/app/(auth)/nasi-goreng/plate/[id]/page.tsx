import { API_ROUTE } from '@/constant/api-route';
import { grabData } from '@/utilities/http';
import Paper from '@/components/common/paper/Paper';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import { cache } from 'react'
import Section from '@/components/common/paper/Section';
import SimpleImage from '@/components/common/SimpleImage';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { notFound } from 'next/navigation';
import { INasiGorengResponse } from '@/model/response/nasi-goreng';
import { getStaticParams } from '@/utilities/static';
import DetailGrid from '@/components/common/detail-grid/DetailGrid';

interface NasiGorengPlateDetailProps {
  params: Promise<{ id: string }>
}

export const generateStaticParams = getStaticParams<INasiGorengResponse['relic']>(API_ROUTE.NASI_GORENG.RELIC);

const grabDetail = cache(async (id: string) => await grabData<INasiGorengResponse['plate-complete'] | null>(`${API_ROUTE.NASI_GORENG.PLATE}/${id}`));

export async function generateMetadata(props: NasiGorengPlateDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Nasi Goreng Plate - Detail - Data Reservoir`
  }
}

export default async function NasiGorengPlateDetail(props: NasiGorengPlateDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name="Plate" variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['nasi-goreng-plate-detail'], { label: "Plate Detail" }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5'>
        <Box className='w-50 h-50 relative items-center object-center'>
          <SimpleImage src={data.image} alt={data.id} />
        </Box>
      </Paper>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id
        }} />

      </Section>

      {/* Usage */}
      {data.friedRices.length > 0 && <DetailGrid name='Usage' data={data.friedRices.map(x => ({
        id: x.id,
        image: x.image,
        title: x.name,
        link: `/nasi-goreng/fried-rice/${x.id}`
      }))} />}

    </Section>
  )
}