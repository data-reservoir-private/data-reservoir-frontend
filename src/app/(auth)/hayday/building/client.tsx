'use client'

import { useAppForm } from '@/utilities/form';
import { z } from 'zod'
import { IHaydayResponse } from '@/model/response/hayday';
import { useState } from 'react';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';

const schema = z.object({
  name: z.union([z.string().length(0), z.string().min(3)], "Must be empty or min 3 chars").optional(),
  level: z.number().gte(0).optional(),
});
type HaydayBuildingFormSchema = z.infer<typeof schema>;
const defaultValue: HaydayBuildingFormSchema = { name: '', level: 0 };

export default function HaydayBuildingClient({ data }: { data: IHaydayResponse['hayday-building'][] }) {
  const [state, setState] = useState<HaydayBuildingFormSchema>(defaultValue);

  const realData = data.filter(x => (
    ((state.name?.length ?? 0) === 0 || x.name.toLowerCase().includes(state.name?.toLowerCase() ?? "")) &&
    ((state.level ?? 0) === 0 || x.level <= (state.level ?? 0))
  ));

  const form = useAppForm({
    defaultValues: defaultValue,
    validators: {
      onChange: schema
    },
    onSubmit: ({ value }) => setState(value)
  });

  return (
    <form.AppForm>
      <form.SimpleContainer className="flex max-md:flex-col grow gap-2">
        <form.AppField name='level' children={(field) => (
          <field.SimpleNumberbox label='Level' />
        )} />
        <form.AppField name='name' children={(field) => (
          <field.SimpleTextbox label='Name' />
        )} />
        <form.AppForm>
          <form.SimpleSubmitButton label='Search' />
        </form.AppForm>
      </form.SimpleContainer>
      <SimpleGrid boxClassName='w-40 h-40 max-md:w-24 max-md:h-24' columns={6} data={realData} link='/hayday/building' />
    </form.AppForm>
  )
}
