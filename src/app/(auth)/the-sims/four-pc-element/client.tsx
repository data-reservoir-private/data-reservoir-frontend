'use client'

import { useAppForm } from '@/utilities/form';
import Box from '@mui/material/Box'
import { z } from 'zod'
import { CATEGORIES } from '@/constant/categories';
import { ITheSimsResponse } from '@/model/response/the-sims';
import { useState } from 'react';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { THE_SIMS_RARITY } from '@/constant/enums';

const schema = z.object({
  name: z.union([z.string().length(0), z.string().min(3)], "Must be empty or min 3 chars").optional(),
  rarity: z.enum(THE_SIMS_RARITY).optional()
});

type FourPCElementFormSchema = z.infer<typeof schema>;
const defaultValue: FourPCElementFormSchema = { name: "", rarity: undefined };

export default function FourPCElementClient({ data }: { data: ITheSimsResponse['four-pc-element'][] }) {
  const [state, setState] = useState<FourPCElementFormSchema>(defaultValue);

  const form = useAppForm({
    defaultValues: defaultValue,
    validators: {
      onChange: schema
    },
    onSubmit: ({ value }) => setState(value)
  });

  const realData = data.filter(x => (
    ((state.name?.length ?? 0) === 0 || x.name.toLowerCase().includes(state.name?.toLowerCase() ?? "")) &&
    (!(state.rarity) || x.rarity === state.rarity)
  ));

  return (
    <form.AppForm>
      <form.SimpleContainer className="flex flex-col grow gap-2">
        <Box className="gap-2 flex grow">
          <form.AppField name='name' children={(field) => (
            <field.SimpleTextbox label='Name'/>
          )} />
          <form.AppField name='rarity' children={(field) => (
            <field.SimpleSelect label='Rarity' choices={CATEGORIES['the-sims-rarity']}/>
          )} />
          <form.AppForm>
            <form.SimpleSubmitButton label='Search'/>
          </form.AppForm>
        </Box>
      </form.SimpleContainer>
      <SimpleGrid data={realData} link='/the-sims/four-pc-element'/>
    </form.AppForm>
  )
}
