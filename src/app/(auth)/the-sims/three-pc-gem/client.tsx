'use client'

import { useAppForm } from '@/utilities/form';
import Box from '@mui/material/Box'
import { z } from 'zod'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { useState } from 'react';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';

const schema = z.object({
  name: z.union([z.string().length(0), z.string().min(3)], "Must be empty or min 3 chars").optional()
});

type ThreePCGemFormSchema = z.infer<typeof schema>;
const defaultValue: ThreePCGemFormSchema = { name: "" };

export default function ThreePCGemClient({ data }: { data: ITheSimsResponse['three-pc-gem'][] }) {
  const [state, setState] = useState<ThreePCGemFormSchema>(defaultValue);

  const form = useAppForm({
    defaultValues: defaultValue,
    validators: {
      onChange: schema
    },
    onSubmit: ({ value }) => setState(value)
  });

  const realData = data.filter(x => (
    ((state.name?.length ?? 0) === 0 || x.gemCut.name.toLowerCase().includes(state.name?.toLowerCase() ?? "") || x.rawGem.name.toLowerCase().includes(state.name?.toLowerCase() ?? ""))
  ));

  return (
    <form.AppForm>
      <form.SimpleContainer className="flex flex-col grow gap-2">
        <Box className="gap-2 flex grow">
          <form.AppField name='name' children={(field) => (
            <field.SimpleTextbox label='Name'/>
          )} />
          <form.AppForm>
            <form.SimpleSubmitButton label='Search'/>
          </form.AppForm>
        </Box>
      </form.SimpleContainer>
      <SimpleGrid data={realData.map(x => ({ id: x.id, name: `${x.rawGem.name} (${x.gemCut.name})`, image: x.image }))} link='/the-sims/three-pc-gem'/>
    </form.AppForm>
  )
}
