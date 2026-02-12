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

interface TwoProductDetailProps {
  params: Promise<{ id: string }>
}

export const generateStaticParams = getStaticParams<IFarmFrenzyResponse['two']>(API_ROUTE.FARM_FRENZY.TWO_PRODUCT);

const grabDetail = cache(async (id: string) => await grabData<IFarmFrenzyResponse['two-detail'] | null>(`${API_ROUTE.FARM_FRENZY.TWO_PRODUCT}/${id}`));

export async function generateMetadata(props: TwoProductDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Farm Frenzy Two Product - ${post.data.name} - Data Reservoir`
  }
}

export default async function TwoProductDetail(props: TwoProductDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['farm-frenzy-two-product-detail'], { label: data.name }]}>
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
          Size: data.size,
        }} />
      </Section>

      {/* Recipe */}
      {data.recipe.length > 0 && <DetailGrid name='Recipe' data={data.recipe.map(x => ({
        id: x.id,
        image: x.image,
        title: x.name,
        link: `/farm-frenzy/two-product/${x.id}`
      }))} />}

      {/* Used In */}
      {data.usage && <DetailGrid name='Usage' data={[{
        id: data.usage.id,
        image: data.usage.image,
        title: data.usage.name,
        link: `/farm-frenzy/two-product/${data.usage.id}`
      }]} />}
    </Section>
  )
}