import { API_ROUTE } from '@/constant/api-route';
import { grabData } from '@/utilities/http';
import Paper from '@/components/common/paper/Paper';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React, { cache } from 'react'
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { notFound } from 'next/navigation';
import { ICygnusResponse } from '@/model/response/cygnus';
import Typography from '@mui/material/Typography';
import SimpleImage from '@/components/common/SimpleImage';

interface ArtifactDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<ICygnusResponse['artifact'] | null>(`${API_ROUTE.CYGNUS.ARTIFACT}/${id}`));

export async function generateMetadata(props: ArtifactDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Cygnus Artifact - ${post.data.name} - Data Reservoir`
  }
}

export default async function ArtifactDetail(props: ArtifactDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['cygnus-artifact-detail'], { label: data.name, link: undefined }]}>
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
          Description: data.description,
          Price: data.price,
        }} />
      </Section>
    </Section>
  )
}
