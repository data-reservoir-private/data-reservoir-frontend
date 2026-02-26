'use client'

import { useAppForm } from '@/utilities/form';
import { z } from 'zod'
import { ISeasonsResponse } from '@/model/response/seasons';
import { useState } from 'react';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';

const schema = z.object({
  name: z.union([z.string().length(0), z.string().min(3)], "Must be empty or min 3 chars").optional()
});

type DSTwoTownsRecipeFormSchema = z.infer<typeof schema>;
const defaultValue: DSTwoTownsRecipeFormSchema = { name: "" };

export default function DSTwoTownsRecipeClient({ data }: { data: ISeasonsResponse['ds-two-towns-recipe'][] }) {
  const [state, setState] = useState<DSTwoTownsRecipeFormSchema>(defaultValue);

  const form = useAppForm({
    defaultValues: defaultValue,
    validators: {
      onChange: schema
    },
    onSubmit: ({ value }) => setState(value)
  });

  const realData = data.filter(x => (
    ((state.name?.length ?? 0) === 0 || x.name.toLowerCase().includes(state.name?.toLowerCase() ?? ""))
  ));

  return (
    <form.AppForm>
      <form.SimpleContainer className="flex max-md:flex-col grow gap-2">
        <form.AppField name='name' children={(field) => (
          <field.SimpleTextbox label='Name' />
        )} />
        <form.AppForm>
          <form.SimpleSubmitButton label='Search' />
        </form.AppForm>
      </form.SimpleContainer>
      <SimpleGrid data={realData} link='/seasons/ds-two-towns-recipe' unoptimizedImage pixelated />
    </form.AppForm>
  )
}
