import { IDashboardResponse } from '@/model/response/dashboard'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import { FaThList } from 'react-icons/fa'
import Paper from '../paper/Paper'

interface SimpleRecordTableCardsProps {
  response: IDashboardResponse
}

export default function SimpleRecordTableCards(props: SimpleRecordTableCardsProps) {
  return (
    <Grid container spacing='1rem' columns={{ xs: 1, md: 2 }}>
      <Grid size={1}>
        <Paper className='flex h-full justify-between px-5 py-3 bg-linear-to-r from-orange-700 to-orange-400 border-none gap-2'>
          <Box flexDirection='column'>
            <Typography variant='h4' fontWeight='bold'>{props.response.dataTotal}</Typography>
            <Typography variant='subtitle2' component='h5'>Entries</Typography>
          </Box>
          <Box component='div' className='h-full flex items-center justify-center text-5xl'>
            <FaThList />
          </Box>
        </Paper>
      </Grid>
      <Grid size={1}>
        <Paper className='flex h-full justify-between px-5 py-3 bg-linear-to-r from-green-700 to-green-400 border-none'>
          <Box flexDirection='column'>
            <Typography variant='h4' fontWeight='bold'>{props.response.datasets.length}</Typography>
            <Typography variant='subtitle2'>Datasets</Typography>
          </Box>
          <Box component='div' className='h-full flex items-center justify-center text-5xl'>
            <BsFillGrid3X3GapFill />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}
