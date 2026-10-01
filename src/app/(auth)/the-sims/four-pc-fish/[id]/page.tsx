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
import { convertTheSimsRarity } from '@/utilities/general';
import { notFound } from 'next/navigation';

interface FourPCFishDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<ITheSimsResponse['four-pc-fish'] | null>(API_ROUTE.THE_SIMS.FOUR_PC_FISH.ID(id)));

export async function generateMetadata(props: FourPCFishDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' };
  return { title: `The Sims Four PC Fish - ${post.data.name} - Data Reservoir` };
}

export default async function FourPCFishDetail(props: FourPCFishDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['the-sims-four-pc-fish-detail'], { label: data.name }]}>
      <Paper className='w-full flex justify-center py-5'>
        <Box className='w-50 h-50 relative items-center object-center'>
          <SimpleImage src={data.image} alt={data.name} />
        </Box>
      </Paper>

      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.name,
          Skill: data.skill,
          Description: data.description,
          Size: data.size,
          Rarity: convertTheSimsRarity(data.rarity),
          Value: data.value,
          'Min Value': data.minValue,
          'Max Value': data.maxValue,
          'Fertilizer Strength': data.fertilizerStrength
        }} />
      </Section>
    </Section>
  );
}