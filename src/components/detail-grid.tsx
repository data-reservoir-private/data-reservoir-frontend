import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Paper from '@/components/common/paper/Paper';
import Section from '@/components/common/paper/Section';
import SimpleImage from '@/components/common/SimpleImage';
import { Route } from 'next';
import { ReactNode } from 'react';

export interface DetailGridItem {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  quantity?: number;
  link: string;
  content?: ReactNode;
}

interface DetailGridProps {
  name: string;
  data: DetailGridItem[];
  className?: string;
  noGrid?: boolean;
  pixelated?: boolean;
}

export default function DetailGrid({ name, data, className, noGrid, pixelated }: DetailGridProps) {
  return (
    <Section name={name} variant='h6' className={className}>
      <Grid container columns={noGrid ? 1 : { md: 3, xs: 1 }} spacing={'.5rem'}>
        {
          data.map(item => (
            <Grid size={1} key={item.id}>
              <Paper className="flex overflow-hidden h-full">
                <Link passHref href={item.link as Route}>
                  <Box className="w-20 h-full min-h-20 relative bg-gray-500/20 hover:bg-gray-600/20 hover:transition-colors">
                    <SimpleImage quality={50} src={item.image} alt={item.title} pixelated={pixelated} />
                  </Box>
                </Link>
                <Box className="grow flex items-center">
                  <Box className="grow p-3 flex flex-col gap-2">
                    <Box>
                      <Typography fontWeight={500}>{item.title}</Typography>
                      {item.subtitle && (
                        <Typography className='italic text-gray-400' variant='body2'>{item.subtitle}</Typography>
                      )}
                    </Box>
                    {item.content && (
                      <Box>{item.content}</Box>
                    )}
                  </Box>
                  {item.quantity !== undefined && (
                    <Box className="mr-3 px-2.5 py-1 rounded-full bg-gray-700/50 border border-gray-600/50">
                      <Typography variant='body2' className="font-semibold text-gray-300">
                        {item.quantity}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
          ))
        }
      </Grid>
    </Section>
  );
}
