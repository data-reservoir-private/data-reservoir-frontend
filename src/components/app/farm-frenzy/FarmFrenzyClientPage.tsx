'use client';

import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route';
import { FarmFrenzyTableType, FarmFrenzyTableTypeOptions } from '@/constant/tables';
import React, { useState } from 'react';
import FarmFrenzyProduct from './FarmFrenzyProduct';
import SimpleListbox from '@/components/common/simple-listbox/SimpleListbox';

interface FarmFrenzyClientPageState {
  pickedTable: FarmFrenzyTableType | null
}

export default function FarmFrenzyClientPage() {
  const [state, setState] = useState<FarmFrenzyClientPageState>({
    pickedTable: 'farm_frenzy_three_product'
  });

  const keyLabels = FarmFrenzyTableTypeOptions.reduce((obj, currValue) => ({ ...obj, [currValue]: currValue }), {});
  return (
    <div className='flex flex-col gap-4 text-white w-full h-full'>
      <Paper className='p-2'>
        <SimpleListbox onChange={e => setState({ pickedTable: e as FarmFrenzyTableType })} options={keyLabels} value={state.pickedTable}/>
      </Paper>
      <div>
      { state.pickedTable === "farm_frenzy_one_product" && <FarmFrenzyProduct queryKey={state.pickedTable.replaceAll('_', '-')} url={API_ROUTE.FARM_FRENZY.ONE_PRODUCT}/> }
      { state.pickedTable === "farm_frenzy_two_product" && <FarmFrenzyProduct queryKey={state.pickedTable.replaceAll('_', '-')} url={API_ROUTE.FARM_FRENZY.TWO_PRODUCT}/> }
      { state.pickedTable === "farm_frenzy_two_pizza_product" && <FarmFrenzyProduct queryKey={state.pickedTable.replaceAll('_', '-')} url={API_ROUTE.FARM_FRENZY.TWO_PIZZA_PRODUCT}/> }
      { state.pickedTable === "farm_frenzy_three_product" && <FarmFrenzyProduct queryKey={state.pickedTable.replaceAll('_', '-')} url={API_ROUTE.FARM_FRENZY.THREE_PRODUCT}/> }
      </div>
    </div>
  );
}