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
import DetailGrid from '@/components/common/detail-grid/DetailGrid';

interface NasiGorengFriedRiceDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = cache(async (id: string) => await grabData<INasiGorengResponse['fried-rice-complete'] | null>(`${API_ROUTE.NASI_GORENG.FRIED_RICE}/${id}`));

export async function generateMetadata(props: NasiGorengFriedRiceDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Nasi Goreng Fried Rice - ${post.data.name} - Data Reservoir`
  }
}

export default async function NasiGorengFriedRiceDetail(props: NasiGorengFriedRiceDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['nasi-goreng-fried-rice-detail'], { label: data.name }]}>
      {/* Image */}
      <Paper className='w-full flex justify-center py-5'>
        <Box className='w-50 h-50 relative items-center object-center'>
          <SimpleImage src={data.imageLevel6} alt={data.name} />
        </Box>
      </Paper>

      {/* Information */}
      <Section variant='h6' name='Information'>
        <TableDetail data={{
          ID: data.id,
          Name: data.name,
          Price: data.price,
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
                  <Typography className=''>{data.tool.name}</Typography>
                </Box>
              </Box>
            </Paper>
          </Section>
        )
      }

      {/* Recipe */}
      {data.recipe.length > 0 && <DetailGrid name='Recipe' data={data.recipe.map(x => ({
        id: x.id,
        image: x.image,
        title: x.name,
        link: `/nasi-goreng/ingredient/${x.id}`
      }))} />}

      {/* Levels */}
      {data.recipe.length > 0 && <Levels level={data.level} />}
    </Section>
  )
}

function Levels({ level }: { level: INasiGorengResponse['fried-rice-complete']['level'] }) {
  return (
    <Section name='Levels' variant='h6' className='flex flex-col gap-2'>
      {
        level.map(l => (
          <Paper className='flex p-1 max-md:flex-col' key={l.id}>
            <Box className='flex flex-col gap-5 max-md:justify-center max-md:items-center'>
              <Box className='w-40 h-40 relative flex flex-col'>
                <SimpleImage src={l.image} alt={l.id} />
              </Box>
              <Typography className='w-full text-lg text-center'>Level {l.level}</Typography>
            </Box>
            <Box className='grow flex flex-col gap-2'>
              <TableDetail data={{
                ID: l.id,
                Level: l.level,
                "Amount Needed": l.amountNeeded
              }} />
              {
                l.upgrades && l.upgrades.length > 0 &&
                (
                  <Section name='Upgrades' variant='body1'>
                    <Grid container columns={{ xs: 1, md: 2 }} spacing='1rem'>
                      {
                        l.upgrades.map(up => (
                          <Grid size={1} key={up.id}>
                            <Paper className="flex overflow-hidden">
                              <Link passHref href={`/nasi-goreng/upgrade/${up.id}`}>
                                <Box className="w-10 h-full min-h-10 relative bg-gray-500/20 hover:bg-gray-600/20 hover:transition-colors">
                                  <SimpleImage quality={50} src={up.image} alt={up.name} />
                                </Box>
                              </Link>
                              <Box className="grow flex">
                                <Box className="grow p-3">
                                  <Typography className=''>{up.name}</Typography>
                                </Box>
                              </Box>
                            </Paper>
                          </Grid>
                        ))
                      }
                    </Grid>
                  </Section>
                )
              }
              {
                l.recipe && l.recipe.length > 0 &&
                (
                  <Section name='Recipe' variant='body1'>
                    <Grid container columns={{ xs: 1, md: 2 }} spacing='1rem'>
                      {
                        l.recipe.map(ing => (
                          <Grid size={1} key={ing.id}>
                            <Paper className="flex overflow-hidden">
                              <Link passHref href={`/nasi-goreng/ingredient/${ing.id}`}>
                                <Box className="w-10 h-full min-h-10 relative bg-gray-500/20 hover:bg-gray-600/20 hover:transition-colors">
                                  <SimpleImage quality={50} src={ing.image} alt={ing.name} />
                                </Box>
                              </Link>
                              <Box className="grow flex">
                                <Box className="grow p-3">
                                  <Typography className=''>{ing.name}</Typography>
                                </Box>
                              </Box>
                              <Box className="p-3 flex items-center text-lg font-bold bg-secondary-dark">
                                <Typography>{ing.quantity}</Typography>
                              </Box>
                            </Paper>
                          </Grid>
                        ))
                      }
                    </Grid>
                  </Section>
                )
              }
            </Box>
          </Paper>
        ))
      }
    </Section>
  )
}