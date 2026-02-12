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
import { IFarmFrenzyResponse } from '@/model/response/farm-frenzy';
import SimpleImage from '@/components/common/SimpleImage';
import { getStaticParams } from '@/utilities/static';
import DetailGrid from '@/components/detail-grid';

interface HurricaneProductDetailProps {
  params: Promise<{ id: string }>
}

export const generateStaticParams = getStaticParams<IFarmFrenzyResponse['hurricane']>(API_ROUTE.FARM_FRENZY.HURRICANE);

const grabDetail = cache(async (id: string) => await grabData<IFarmFrenzyResponse['hurricane-detail'] | null>(`${API_ROUTE.FARM_FRENZY.HURRICANE}/${id}`));

export async function generateMetadata(props: HurricaneProductDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Farm Frenzy Hurricane Seasons Product - ${post.data.name} - Data Reservoir`
  }
}

export default async function HurricaneProductDetail(props: HurricaneProductDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['farm-frenzy-hurricane-product-detail'], { label: data.name }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5'>
        <Box className='w-50 h-50 relative items-center object-center'>
          <SimpleImage src={data.image} alt={data.name} unoptimized />
        </Box>
      </Paper>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.name,
          Price: data.price,
          "Buy Price": data.priceBuy,
          Size: data.size,
        }} />
      </Section>

      {/* Recipe */}
      {data.recipe.length > 0 && <DetailGrid name='Recipe' data={data.recipe.map(x => ({
        id: x.id,
        image: x.image,
        title: x.name,
        link: `/farm-frenzy/hurricane-product/${x.id}`
      }))} />}

      {/* Used In */}
      {data.usage && <DetailGrid name='Usage' data={[{
        id: data.usage.id,
        image: data.usage.image,
        title: data.usage.name,
        link: `/farm-frenzy/hurricane-product/${data.usage.id}`
      }]} />}
    </Section>
  )
}