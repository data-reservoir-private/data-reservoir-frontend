import { API_ROUTE } from '@/constant/api-route';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import Paper from '@/components/common/paper/Paper';
import Section from '@/components/common/paper/Section';
import SimpleImage from '@/components/common/SimpleImage';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import { cache } from 'react';
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http';
import { notFound } from 'next/navigation';

interface ThreePCGroceryDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<ITheSimsResponse['three-pc-grocery'] | null>(API_ROUTE.THE_SIMS.THREE_PC_GROCERY.ID(id)));

export async function generateMetadata(props: ThreePCGroceryDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' };
  return { title: `The Sims Three PC Grocery - ${post.data.name} - Data Reservoir` };
}

export default async function ThreePCGroceryDetail(props: ThreePCGroceryDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['the-sims-three-pc-grocery-detail'], { label: data.name }]}>
      <Paper className='w-full flex justify-center py-5'>
        <Box className='w-50 h-50 relative items-center object-center'>
          <SimpleImage src={data.image} alt={data.name} />
        </Box>
      </Paper>

      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.name,
          Value: data.value
        }} />
      </Section>
    </Section>
  );
}