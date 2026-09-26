import { API_ROUTE } from '@/constant/api-route';
import { grabData } from '@/utilities/http';
import Paper from '@/components/common/paper/Paper';
import TableDetail from '@/components/common/table-detail/TableDetail';
import Box from '@mui/material/Box';
import { cache } from 'react';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { notFound } from 'next/navigation';
import { IPizzaFrenzyResponse } from '@/model/response/pizza-frenzy';
import { getStaticParams } from '@/utilities/static';
import SimpleImage from '@/components/common/SimpleImage';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CopyButton from '@/components/common/CopyButton';

interface ToppingDetailProps {
  params: Promise<{ id: string }>
}

export const generateStaticParams = getStaticParams<IPizzaFrenzyResponse['topping']>(API_ROUTE.PIZZA_FRENZY.TOPPING.BASE);

const grabDetail = cache(async (id: string) => await grabData<IPizzaFrenzyResponse['topping-complete'] | null>(API_ROUTE.PIZZA_FRENZY.TOPPING.ID(id)));

export async function generateMetadata(props: ToppingDetailProps) {
  const post = await grabDetail((await props.params).id);
  if (!post.data) return { title: 'Not Found - Data Reservoir' };
  return {
    title: `Pizza Frenzy Topping - ${post.data.generalName} - Data Reservoir`
  };
}

export default async function ToppingDetail(props: ToppingDetailProps) {
  const { id } = await props.params;
  const { data } = await grabDetail(id);
  if (!data) return notFound();
  const toppingDetails = [...data.toppingDetails].sort((a, b) => a.level - b.level);

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
        <Paper>
          <TableContainer>
            <Table size='small' className='text-sm min-w-150'>
              <TableHead>
                <TableRow>
                  <TableCell className='w-[20%]' />
                  {toppingDetails.map(td => (
                    <TableCell key={td.id} align='center' className='font-bold'>Level {td.level}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component='th' scope='row' className='bg-white/5 w-[20%] font-bold'>ID</TableCell>
                  {toppingDetails.map(td => (
                    <TableCell key={td.id}>
                      <Box className='flex flex-col justify-between items-center gap-2 h-full'>
                        <Typography className='text-xs break-all' fontFamily='Consolas'>{td.id}</Typography>
                        <CopyButton className="w-full" value={td.id} />
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row' className='bg-white/5 w-[20%] font-bold'>Name</TableCell>
                  {toppingDetails.map(td => <TableCell key={td.id}>{td.name}</TableCell>)}
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row' className='bg-white/5 w-[20%] font-bold'>Description</TableCell>
                  {toppingDetails.map(td => <TableCell key={td.id}>{td.description}</TableCell>)}
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row' className='bg-white/5 w-[20%] font-bold italic text-gray-500'>
                    <Tooltip title='Non-Canonical Data'><span>Price</span></Tooltip>
                  </TableCell>
                  {toppingDetails.map(td => (
                    <TableCell key={td.id} className='italic text-gray-500'>{td.price}</TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Section>
    </Section>
  );
}
