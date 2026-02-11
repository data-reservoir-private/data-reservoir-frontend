import { API_ROUTE } from '@/constant/api-route';
import { grabData } from '@/utilities/http';
import Paper from '@/components/common/paper/Paper';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import Section from '@/components/common/paper/Section';
import SimpleImage from '@/components/common/SimpleImage';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { notFound } from 'next/navigation';
import { INasiGorengResponse } from '@/model/response/nasi-goreng';
import DetailGrid from '@/components/detail-grid';

interface NasiGorengUpgradeDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = async (id: string) => {
  return await grabData<INasiGorengResponse['upgrade-complete'] | null>(`${API_ROUTE.NASI_GORENG.UPGRADE}/${id}`);
};

export async function generateMetadata(props: NasiGorengUpgradeDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Nasi Goreng Upgrade - ${post.data.name} - Data Reservoir`
  }
}

export default async function NasiGorengUpgradeDetail(props: NasiGorengUpgradeDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['nasi-goreng-upgrade-detail'], { label: data.name }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5'>
        <Box className='w-50 h-50 relative items-center object-center'>
          <SimpleImage src={data.image} alt={data.name} />
        </Box>
      </Paper>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.name
        }} />

      </Section>

      {/* Fried Rice */}
      {data.friedRice.length > 0 && <DetailGrid name='Fried Rice Usage' data={data.friedRice.map(x => ({
        id: x.id,
        image: x.image,
        title: x.name,
        link: `/nasi-goreng/fried-rice/${x.id}`
      }))} />}

    </Section>
  )
}