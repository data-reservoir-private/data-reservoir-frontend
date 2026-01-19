import { IData } from '@/constant/data'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { BsTable } from 'react-icons/bs'
import Section from '../paper/Section'
import Paper from '../paper/Paper'
import { Breakpoint } from '@mui/material/styles'
import { Link } from '@tanstack/react-router'

interface SimpleQuickLinkProps {
  quickLink: IData;
  columns?: { [key in Breakpoint]?: number } | number;
  pixelated?: boolean;
}

export default function SimpleQuickLink({ quickLink, columns, pixelated }: SimpleQuickLinkProps) {
  return (
    <Section variant='h6' name='Quick Link'>
      <Grid container spacing='1rem' columns={columns ?? { xs: 1, sm: 2, md: 3, lg: 4 }}>
        {
          quickLink.categories.map((nav) => (
            <Grid size={1} key={nav.name}>
              <Link preload='intent' to={nav.link}>
                <Paper className='p-2 cursor-pointer hover:bg-background-paper/50 flex flex-col gap-3 items-center justify-center'>
                  {
                    nav.image &&
                    (
                      <Box className='h-20 w-auto min-w-20 flex items-center relative justify-center'>
                        {
                          (typeof (nav.image) === 'string') ? <img src={nav.image} className='h-20'/> : nav.image()
                        }
                      </Box>
                    )
                  }
                  {
                    !nav.image && (
                      <Box className='h-20 w-20 flex items-center justify-center' sx={{ imageRendering: pixelated ? 'pixelated' : 'auto' }}>
                        <BsTable className='text-[60px] text-gray-500 w-full' />
                      </Box>
                    )
                  }
                  <Typography className='font-bold'>{nav.name}</Typography>
                </Paper>
              </Link>
            </Grid>
          ))
        }
      </Grid>
    </Section>
  )
}
