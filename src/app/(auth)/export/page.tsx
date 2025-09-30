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
import { Metadata, Route } from 'next'
import { DiMsqlServer } from "react-icons/di";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiSqlite } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { SiApacheparquet } from "react-icons/si";
import { DATASETS_AVAILABLE, ExportType } from '@/constant/data'
import { FaFileExcel } from "react-icons/fa";
import { grabData } from '@/utilities/http'
import { IDashboardResponse } from '@/model/response/dashboard'
import { API_ROUTE } from '@/constant/api-route'
import Chip from '@mui/material/Chip'

export const metadata: Metadata = {
  title: 'Export Data - Data Reservoir'
}

function getType(exportType: ExportType) {
  switch (exportType) {
    case 'json': return <VscJson />
    case 'ndjson': return <VscJson />
    case 'xml': return <RiCodeSSlashFill />
    case 'csv': return <FaFileCsv />
    case 'tsv': return <FaFileCsv />
    case 'yaml': return <SiYaml />
    case 'postgresql': return <BiLogoPostgresql />
    case 'sql_server': return <DiMsqlServer />
    case 'sqlite': return <SiSqlite />
    case 'html': return <FaHtml5 />
    case 'parquet': return <SiApacheparquet />
    case 'xlsx': return <FaFileExcel />
    default: return <></>
  }
}

interface Dataset {
  name: string,
  total: number,
  owner: string
}

export default async function ExportPage() {

  const { data } = await grabData<IDashboardResponse[]>(`${API_ROUTE.DASHBOARD}`);
  const datasets = data.reduce((acc, curr) =>
    [...acc, ...curr.datasets.map(x => ({ name: `${curr.category} ${x.name}`, total: x.total, owner: curr.owner }))]
    , [] as Dataset[]);

  return (
    <Section name='Export Data' variant='h4'>
      <Typography textAlign='justify'>Please note that your data might be incomplete and some of data provided by this export utility might be cached, resulting in delayed updates.</Typography>
      <Typography textAlign='justify'>Exported data might be simpler than your detail menu (might just be its ID, image, and name). If you need more data (relations for example), please contact me personally and I will query it all for you.</Typography>
      <Typography textAlign='justify'>Not every data that you can view can be exported due to complexity of those data. I will try my best to support it all, but for now, you just have to wait :(</Typography>
      <Typography textAlign='justify'>I suggest you to keep looking at indicator on the top right. Those might indicate your chance of success of getting these data.</Typography>
      <Typography textAlign='justify'>The structure of the data is similar to the one you usually found inside detail endpoint (endpoint that ends with GUID like <code>00000000-0000-0000-0000-000000000000</code>).</Typography>

      <Section name='Data Store' variant='h5'>
        {
          Object.entries(DATASETS_AVAILABLE).filter(([_, value]) => value.categories.some(y => y.export)).map(([categoryKey, categoryValue]) => (
            <Section name={categoryValue.displayName ?? categoryValue.name} key={categoryKey} variant='h6'>
              {
                categoryValue.categories.filter(x => x.export).map(l => (
                  <Paper className='flex flex-col gap-2 p-1' key={l.id}>
                    <Box className='flex gap-2'>
                      <Box>
                        <Box className='h-[80px] w-[80px] flex justify-center items-center relative'>
                          {
                            (l.image && typeof (l.image) === 'string') ? <SimpleImage src={l.image} alt={l.name} className='rounded-sm' unoptimized />
                              : (l.image && typeof (l.image) !== 'string') ? l.image() :
                                <FaTruck className='text-[60px] text-gray-500' />
                          }
                        </Box>
                      </Box>
                      <Box className='flex grow flex-col gap-2'>
                        <Box className='flex justify-between items-center'>
                          <Typography variant='body1' className='font-bold text-lg'>{l.name}</Typography>
                          <Box className='flex gap-2 items-center h-full flex-wrap justify-end'>
                            <Chip variant='outlined' size='small' label={`Entries: ${datasets.find(x => `${categoryValue.name} ${l.name}` === x.name)?.total ?? 0}`}/>
                            <Chip variant='outlined' size='small' label={`Owner: ${datasets.find(x => `${categoryValue.name} ${l.name}` === x.name)?.owner ?? ""}`} />
                            {
                              l.minedByMe &&
                              <Chip variant='outlined' size='small' label="Mined by the (sole) dev"/>
                            }
                          </Box>
                        </Box>
                        <Typography variant='subtitle2'>{l.description}</Typography>
                      </Box>
                    </Box>

                    <Box className="flex justify-end gap-2 flex-wrap">
                      {
                        l.export!.exportType.map(et => (
                          <Link passHref href={`/export/${categoryKey}/${l.id}/${et}` as Route} key={et} target='_blank'>
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
