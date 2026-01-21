import { API_ROUTE } from '@/constant/api-route';
import { grabData } from '@/utilities/http';
import Paper from '@/components/common/paper/Paper';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React, { cache } from 'react'
import Section from '@/components/common/paper/Section';
import SimpleImage from '@/components/common/SimpleImage';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { notFound } from 'next/navigation';
import { INasiGorengResponse } from '@/model/response/nasi-goreng';
import { Route } from 'next';

interface NasiGorengIngredientDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<INasiGorengResponse['ingredient-complete'] | null>(`${API_ROUTE.NASI_GORENG.INGREDIENT}/${id}`));

export async function generateMetadata(props: NasiGorengIngredientDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Nasi Goreng Ingredient - ${post.data.name} - Data Reservoir`
  }
}

export default async function NasiGorengIngredientDetail(props: NasiGorengIngredientDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['nasi-goreng-ingredient-detail'], { label: data.name }]}>
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
          Name: data.name,
          Category: data.category,
          Price: data.price,
          "Is Processed": data.isProcessed,
          Description: data.description,
        }} />

      </Section>

      {/* Tool */}
      {
        data.tool && (
          <Section name='Made In' variant='h6'>
            <Paper className="flex overflow-hidden">
              <Link passHref href={`/nasi-goreng/tool/${data.tool.id}`}>
                <Box className="w-20 h-full min-h-20 relative bg-gray-500/20 hover:bg-gray-600/20 hover:transition-colors">
                  <SimpleImage src={data.tool.image} alt={data.tool.name} />
                </Box>
              </Link>
              <Box className="grow flex">
                <Box className="grow p-3">
                  <Typography>{data.tool.name}</Typography>
                </Box>
              </Box>
            </Paper>
          </Section>
        )
      }

      {/* Recipe */}
      {data.recipe.length > 0 && <Grids name='Recipe' data={data.recipe} link='/nasi-goreng/ingredient' />}

      {/* Usage */}
      {data.usage.length > 0 && <Grids name='Usage' data={data.usage} link='/nasi-goreng/ingredient' />}

      {/* Fried Rice */}
      {data.friedRice.length > 0 && <Grids name='Fried Rice Usage' data={data.friedRice} link='/nasi-goreng/fried-rice' />}

      {/* Fried Rice Level */}
      {data.friedRiceLevel.length > 0 && <GridLevel name='Fried Rice Level Usage' data={data.friedRiceLevel} link='/nasi-goreng/fried-rice' />}
    </Section>
  )
}

function Grids<T extends string>({ name, data, link }: { name: string, link: Route<T> | URL, data: { name: string, image: string, id: string }[] }) {
  return (
    <Section name={name} variant='h6' className="flex flex-col gap-2">
      <Grid container columns={{ md: 3, xs: 1 }} spacing={'.5rem'}>
        {
          data.map(ing => (
            <Grid size={1} key={ing.id}>
              <Paper className="flex overflow-hidden">
                <Link passHref href={`${link}/${ing.id}` as Route}>
                  <Box className="w-20 h-full min-h-20 relative bg-gray-500/20 hover:bg-gray-600/20 hover:transition-colors">
                    <SimpleImage quality={50} src={ing.image} alt={ing.name} />
                  </Box>
                </Link>
                <Box className="grow flex">
                  <Box className="grow p-3">
                    <Typography>{ing.name}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))
        }
      </Grid>
    </Section>
  );
}

function GridLevel({ name, data, link }: { name: string, link: string, data: INasiGorengResponse['ingredient-complete']['friedRiceLevel'] }) {
  return (
    <Section name={name} variant='h6' className="flex flex-col gap-2">
      <Grid container columns={{ md: 3, xs: 1 }} spacing={'.5rem'}>
        {
          data.map(ing => (
            <Grid size={1} key={ing.id}>
              <Paper className="flex overflow-hidden">
                <Link passHref href={`${link}/${ing.friedRiceID}` as Route}>
                  <Box className="w-20 h-full min-h-20 relative bg-gray-500/20 hover:bg-gray-600/20 hover:transition-colors">
                    <SimpleImage quality={50} src={ing.image} alt={ing.name} />
                  </Box>
                </Link>
                <Box className="grow flex">
                  <Box className="grow p-3">
                    <Typography>{ing.name}</Typography>
                    <Typography className='italic' variant='subtitle1'>Level {ing.level}</Typography>
                  </Box>
                </Box>
                <Box className="p-3 flex items-center text-lg font-bold bg-secondary-dark min-w-16">
                  <Typography>{ing.quantity}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))
        }
      </Grid>
    </Section>
  );
}