import { API_ROUTE } from '@/constant/api-route';
import { grabData } from '@/utilities/http';
import Paper from '@/components/common/paper/Paper';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import { cache } from 'react';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { notFound } from 'next/navigation';
import { ISeasonsResponse } from '@/model/response/seasons';
import SimpleImage from '@/components/common/SimpleImage';

interface DSTwoTownsFishingCatchDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<ISeasonsResponse['ds-two-towns-fishing-catch'] | null>(`${API_ROUTE.SEASONS.DS_TWO_TOWNS_FISHING_CATCH}/${id}`));

export async function generateMetadata(props: DSTwoTownsFishingCatchDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' };
  return {
    title: `Seasons DS Two Towns Fishing Catch - ${post.data.name} - Data Reservoir`
  };
}

export default async function DSTwoTownsFishingCatchDetail(props: DSTwoTownsFishingCatchDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['seasons-ds-two-towns-fishing-catch-detail'], { label: data.name }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5'>
        <Box className='w-50 h-50 relative items-center object-center'>
          <SimpleImage src={data.image} alt={data.name} unoptimized pixelated/>
        </Box>
      </Paper>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.name,
          Type: data.type,
          Category: data.category,
          Seasons: data.seasons,
          Time: data.time ?? '-',
          Rod: data.rod ?? '-',
          Notes: data.notes ?? '-',
          "Max Size": data.maxSize ?? '-',
          "Price 1": data.price1 ?? '-',
          "Price 2": data.price2 ?? '-',
          "Price 3": data.price3 ?? '-',
          "Price 4": data.price4 ?? '-',
          "Price 5": data.price5 ?? '-'
        }} />
      </Section>
    </Section>
  );
}
