'use client'

import Paper from '@/components/common/paper/Paper';
import React, { useState } from 'react'
import SimpleListbox from '@/components/common/simple-listbox/SimpleListbox';
import { QuartzTableLabel, QuartzTableType } from '@/constant/tables';
import QuartzShippable from './QuartzShippable';
import QuartzRecipe from './QuartzRecipe';
import QuartzUtensil from './QuartzUtensil';

interface QuartzClientPageState {
  pickedTable: QuartzTableType | null
}

export default function QuartzClientPage() {
  const [state, setState] = useState<QuartzClientPageState>({
    pickedTable: 'shippable'
  });
  return (
    <div className='flex flex-col gap-4 text-white w-full h-full'>
      <Paper className='p-2'>
        <SimpleListbox onChange={e => setState({ pickedTable: e as QuartzTableType })} options={QuartzTableLabel} value={state.pickedTable} />
      </Paper>
      {state.pickedTable === "shippable" && <QuartzShippable/>}
      {state.pickedTable === "recipe" && <QuartzRecipe/>}
      {state.pickedTable === "utensil" && <QuartzUtensil/>}
    </div>
  );
}