import { API_ROUTE } from '@/constant/api-route';
import { grabData } from '@/utilities/http';
import Paper from '@/components/common/paper/Paper';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Section from '@/components/common/paper/Section';
import SimpleImage from '@/components/common/SimpleImage';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { notFound } from 'next/navigation';
import { INasiGorengResponse } from '@/model/response/nasi-goreng';
import { Route } from 'next';
import { cacheLife, cacheTag } from 'next/cache';

interface NasiGorengUpgradeDetailProps {
  params: Promise<{ id: string }>
}

const grabDetail = async (id: string) => {
  return await grabData<INasiGorengResponse['upgrade-complete'] | null>(`${API_ROUTE.NASI_GORENG.UPGRADE}/${id}`);
};

export async function generateMetadata(props: NasiGorengUpgradeDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' }
  return {
    title: `Nasi Goreng Upgrade - ${post.data.name} - Data Reservoir`
  }
}

export default async function NasiGorengUpgradeDetail(props: NasiGorengUpgradeDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();

  return (
    <Section name={data.name} variant='h4' className='flex flex-col gap-3' breadcrumbs={[...BREADCRUMBS['nasi-goreng-upgrade-detail'], { label: data.name }]}>
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
          Name: data.name
        }} />

      </Section>

      {/* Fried Rice */}
      {data.friedRice.length > 0 && <Grids name='Fried Rice Usage' data={data.friedRice} link='/nasi-goreng/fried-rice' />}

    </Section>
  )
}

function Grids({ name, data, link }: { name: string, link: string, data: { name: string, image: string, id: string }[] }) {
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