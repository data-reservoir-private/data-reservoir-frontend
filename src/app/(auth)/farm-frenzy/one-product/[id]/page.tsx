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

interface OneProductDetailProps {
  params: Promise<{ id: string }>
}

export const generateStaticParams = getStaticParams<IFarmFrenzyResponse['one']>(API_ROUTE.FARM_FRENZY.ONE_PRODUCT);

const grabDetail = cache(async (id: string) => await grabData<IFarmFrenzyResponse['one-detail'] | null>(`${API_ROUTE.FARM_FRENZY.ONE_PRODUCT}/${id}`));

export async function generateMetadata(props: OneProductDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Farm Frenzy One Product - ${post.data.name} - Data Reservoir`
  }
}

export default async function OneProductDetail(props: OneProductDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['farm-frenzy-one-product-detail'], { label: data.name }]}>
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
          Size: data.size
        }} />
      </Section>

      {/* Recipe */}
      {data.recipe && <DetailGrid name='Recipe' data={[{
        id: data.recipe.id,
        image: data.recipe.image,
        title: data.recipe.name,
        link: `/farm-frenzy/one-product/${data.recipe.id}`
      }]} />}

      {/* Used In */}
      {data.usage && <DetailGrid name='Usage' data={[{
        id: data.usage.id,
        image: data.usage.image,
        title: data.usage.name,
        link: `/farm-frenzy/one-product/${data.usage.id}`
      }]} />}
    </Section>
  )
}