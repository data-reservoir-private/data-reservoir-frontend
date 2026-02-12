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
import { IPizzaFrenzyResponse } from '@/model/response/pizza-frenzy';
import Grid from '@mui/material/Grid';
import { getStaticParams } from '@/utilities/static';
import SimpleImage from '@/components/common/SimpleImage';

interface ToppingDetailProps {
  params: Promise<{ id: string }>
}

export const generateStaticParams = getStaticParams<IPizzaFrenzyResponse['topping']>(API_ROUTE.PIZZA_FRENZY.TOPPING);

const grabDetail = cache(async (id: string) => await grabData<IPizzaFrenzyResponse['topping-complete'] | null>(`${API_ROUTE.PIZZA_FRENZY.TOPPING}/${id}`));

export async function generateMetadata(props: ToppingDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Pizza Frenzy Topping - ${post.data.generalName} - Data Reservoir`
  }
}

export default async function ToppingDetail(props: ToppingDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.generalName} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['pizza-frenzy-topping-detail'], { label: data.generalName }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5'>
        <Box className='w-50 h-50 relative items-center object-center'>
          <SimpleImage src={data.image} alt={data.generalName} unoptimized />
        </Box>
      </Paper>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.generalName,
        }} />
      </Section>

      {/* Upgrades */}
      <Section variant='h6' name='Upgrades'>
        <Grid container columns={{ xs: 1, md: 2 }} spacing={2}>
          {
            data.toppingDetails.map(td => (
              <Grid size={1} key={td.id}>
                <Paper>
                  <TableDetail data={{
                    ID: td.id,
                    Name: td.name,
                    Level: td.level,
                    Description: td.description,
                    'Price*': td.price,
                  }} />
                </Paper>
              </Grid>
            ))
          }
        </Grid>
      </Section>
    </Section>
  )
}
