import Paper from '@/components/common/paper/Paper'
import Section from '@/components/common/paper/Section'
import SimpleImage from '@/components/common/SimpleImage'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import React from 'react'
import { VscJson } from "react-icons/vsc";
import { RiCodeSSlashFill } from "react-icons/ri";
import { FaFileCsv, FaTruck } from "react-icons/fa6";
import { SiYaml } from "react-icons/si";
import { Metadata } from 'next'
import { DATA_AVAILABLE, ExportType } from '@/constant/data'

export const metadata: Metadata = {
  title: 'Export Data - Data Reservoir'
}

function getType(exportType: ExportType) {
  switch (exportType) {
    // case 'postgres': return <DiPostgresql/>
    case 'json': return <VscJson />
    case 'xml': return <RiCodeSSlashFill />
    case 'csv': return <FaFileCsv />
    case 'yaml': return <SiYaml />
    default: return <></>
  }
}

export default function ExportPage() {
  return (
    <Section name='Export Data' variant='h4'>
      <Typography>Please note that your data might be incomplete and some of data provided by this export utility might be cached, resulting in delayed updates.</Typography>
      <Typography>I suggest you to keep looking at indicator on the top right. Those might indicate your chance of success of getting these data.</Typography>
      <Typography>The structure of the data is similar to the one you usually found inside detail endpoint (endpoint that ends with GUID like <code>00000000-0000-0000-0000-000000000000</code>)</Typography>

      <Section name='Data Store' variant='h5'>
        <Typography>You can start to download this without any additional obstacle.</Typography>
        <Typography>Do not forget to check your data received. If you need to insert these into your database, make a use of an online converter</Typography>
        {
          Object.entries(DATA_AVAILABLE).filter(([_, value]) => value.categories.some(y => y.export)).map(([categoryKey, categoryValue]) => (
            <Section name={categoryValue.name} key={categoryKey} variant='h6'>
              {
                categoryValue.categories.filter(x => x.export).map(l => (
                  <Paper className='flex flex-col gap-2 p-1' key={l.id}>
                    <Box className='flex gap-2'>
                      <Box>
                        <Box className='h-[80px] w-[80px] flex items-center relative'>
                          {
                            (l.image && typeof (l.image) === 'string') ? <SimpleImage src={l.image} alt={l.name} className='rounded-sm' />
                              : (l.image && typeof (l.image) !== 'string') ? l.image() :
                                <FaTruck className='text-[60px] text-gray-500' />
                          }
                        </Box>
                      </Box>
                      <Box className='flex grow flex-col'>
                        <Typography variant='body1' className='font-bold'>{l.name}</Typography>
                        <Typography variant='subtitle2'>{l.description}</Typography>
                      </Box>
                    </Box>

                    <Box className="flex justify-end gap-2">
                      {
                        l.export!.exportType.map(et => (
                          <Link passHref href={`/export/${categoryKey}/${l.id}/${et}`} key={et} target='_blank'>
                            <Button size='small' type='button' variant="contained" startIcon={getType(et)}>{et}</Button>
                          </Link>
                        ))
                      }
                    </Box>
                  </Paper>
                ))
              }
            </Section>
          ))
        }
      </Section>
    </Section>
  )
}
