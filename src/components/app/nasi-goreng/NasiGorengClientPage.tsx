'use client';

import Paper from '@/components/common/paper/Paper';
import { NasiGorengTableLabel, NasiGorengTableType } from '@/constant/tables';
import React, { useState } from 'react';
import NasiGorengBurnedFood from './NasiGorengBurnedFood';
import NasiGorengIngredient from './NasiGorengIngredient';
import NasiGorengPlate from './NasiGorengPlate';
import NasiGorengTool from './NasiGorengTool';
import NasiGorengRelic from './NasiGorengRelic';
import NasiGorengFriedRice from './NasiGorengFriedRice';
import NasiGorengUpgrade from './NasiGorengUpgrade';
import SimpleListbox from '@/components/common/simple-listbox/SimpleListbox';

export default function NasiGorengClientPage() {
  const [state, setState] = useState<NasiGorengTableType | null>('nasi_goreng_burned_food');
  return (
    <div className='flex flex-col gap-4 text-white h-full'>
      <Paper className="p-2">
        <SimpleListbox onChange={e => setState(e as NasiGorengTableType)} options={NasiGorengTableLabel} value={state} />
      </Paper>
      { state === 'nasi_goreng_burned_food' && <NasiGorengBurnedFood/> }
      { state === 'nasi_goreng_ingredient' && <NasiGorengIngredient/> }
      { state === 'nasi_goreng_plate' && <NasiGorengPlate/> }
      { state === 'nasi_goreng_tool' && <NasiGorengTool/> }
      { state === 'nasi_goreng_relic' && <NasiGorengRelic/> }
      { state === 'nasi_goreng_fried_rice' && <NasiGorengFriedRice/> }
      { state === 'nasi_goreng_upgrade' && <NasiGorengUpgrade/> }
    </div>
  );
}
