'use client'

import { VscJson } from "react-icons/vsc";
import { RiCodeSSlashFill } from "react-icons/ri";
import { FaFileCsv } from "react-icons/fa6";
import { SiYaml } from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiSqlite } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { SiApacheparquet } from "react-icons/si";
import { FaFileExcel } from "react-icons/fa";
import { useAppForm } from "@/utilities/form";
import z from "zod";
import { useState } from "react";
import Section from "@/components/common/paper/Section";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ExportType, IData } from "@/model/dto/export";
import Paper from "@/components/common/paper/Paper";
import SimpleImage from "@/components/common/SimpleImage";
import { BsBuildingFill } from "react-icons/bs";
import Link from "next/link";
import { Route } from "next";

const ALL_EXPORTS_COMPLETE: ExportType[] = ['json', 'ndjson', 'csv', 'tsv', 'xml', 'yaml', 'html', 'postgresql', 'sql_server', 'sqlite', 'parquet', 'xlsx'];
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

const schema = z.object({
  type: z.enum(ALL_EXPORTS_COMPLETE),
  query: z.string(),
  category: z.string(),
});
const DEFAULT_VALUE = {
  type: 'json',
  query: '',
  category: ''
} as z.infer<typeof schema>;

type IExtendData = IData['categories'][0] & {
  categoryKey: string,
  categoryName: string,
  total: number,
  owner: string
}

export default function ExportClient({ dataset, apiDataset }: { dataset: Readonly<Record<string, IData>>, apiDataset: Dataset[] }) {
  const [state, setState] = useState<z.infer<typeof schema>>(DEFAULT_VALUE);
  const form = useAppForm({
    defaultValues: DEFAULT_VALUE,
    validators: { onChange: schema },
    onSubmit: ({ value }) => { setState(value) }
  });

  // Note: React Compiler doesn't need useMemo anymore
  const realData = Object.entries(dataset)
    .reduce((acc, [categoryKey, categoryValue]) => {
      return [...acc, ...categoryValue
        .categories
        .map(x => ({
          ...x,
          categoryKey,
          categoryName: categoryValue.name,
          total: apiDataset.find(ds => `${categoryValue.name} ${x.name}` === ds.name)?.total ?? 0,
          owner: apiDataset.find(ds => `${categoryValue.name} ${x.name}` === ds.name)?.owner ?? "Unknown"
        }))
        .filter(x =>
          (state.category === '' || x.categoryKey === state.category) &&
          (state.query === '' || x.name.toLowerCase().includes(state.query.toLowerCase())) &&
          x.export !== undefined &&
          x.export?.exportType.includes(state.type)
        )
      ];
    }, [] as IExtendData[]);

  return (
    <Section name="Master Datasets" variant="h6">
      {/* Form */}
      <form.AppForm>
        <form.SimpleContainer className="flex gap-2 max-md:flex-col mb-4">
          <form.AppField name="type">
            {
              (field) => <field.SimpleSelect
                choices={ALL_EXPORTS_COMPLETE.map(x => ({ label: x.toUpperCase(), value: x }))}
                label='Export Type'
                renderOption={(option) =>
                  <Box className='flex gap-2 items-center'>
                    {getType(option.value)}
                    {option.label}
                  </Box>
                }
              />
            }
          </form.AppField>
          <form.AppField name="category">
            {
              (field) => <field.SimpleSelect
                choices={[{ label: 'All Categories', value: '' }, ...Object.entries(dataset).map(([key, value]) => ({ label: value.name, value: key }))]}
                label='Category'
              />
            }
          </form.AppField>
          <form.AppField name="query">
            {
              (field) => <field.SimpleTextbox label='Search' />
            }
          </form.AppField>
          <form.SimpleSubmitButton label="Search" />
        </form.SimpleContainer>
      </form.AppForm>

      {/* Result */}
      <Grid container columns={{ xs: 1, sm: 1, md: 2, lg: 3 }} spacing='1rem'>
        {
          realData.map(ds => (
            <Grid key={`${ds.categoryKey}-${ds.id}`} size={1}>
              <Paper className='flex grow flex-col justify-between items-center p-2 border rounded w-full gap-3'>
                {/* Image on left, followed by dataset name, category, and author */}
                <Box className='flex gap-2 items-center w-full'>
                  {/* Image */}
                  <Box className='h-20 w-20 flex justify-center items-center relative'>
                    {
                      (ds.image === 'building') ? <BsBuildingFill className="text-4xl" /> :
                        <SimpleImage src={ds.image} alt={ds.name} className='rounded-sm' unoptimized />
                    }
                  </Box>

                  {/* Dataset name author etc */}
                  <Box className='flex flex-col gap-1'>
                    <Typography variant='body1' className='font-bold text-lg'>{ds.name}</Typography>
                    <Box className='flex flex-col gap-0.5'>
                      <Typography variant='subtitle2' className='italic text-xs'>{ds.categoryName}</Typography>
                      <Typography variant='subtitle2' className='italic text-xs'>{ds.owner}</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Tags */}
                <Box className='flex gap-2 items-center h-full flex-wrap w-full mt-2'>
                  <Chip size="small" variant='outlined' color='primary' label={`${ds.total} entries`} />
                  {
                    ds.minedByMe &&
                    <Chip size="small" variant='outlined' color='success' label="Self-mined" />
                  }
                </Box>

                {/* Export button */}
                <Link passHref href={`/export/${ds.categoryKey}/${ds.id}/${state.type}` as Route} target='_blank' className="w-full">
                  <Button size='small' type='button' className="w-full" variant="contained" startIcon={getType(state.type)}>Export as {state.type}</Button>
                </Link>
              </Paper>
            </Grid>
          ))
        }
      </Grid>
    </Section>
  )
}