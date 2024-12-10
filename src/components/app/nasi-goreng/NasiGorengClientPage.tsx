'use client'

import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper';
import Picker from '@/components/common/picker/Picker';
import { API_ROUTE } from '@/constant/api-route';
import { NasiGorengTableLabel, NasiGorengTableType } from '@/constant/tables';
import { DashboardRequest } from '@/model/request/dashboard';
import { DashboardResponse } from '@/model/response/dashboard';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { produce } from 'immer';
import React, { useState } from 'react'
import NasiGorengBurnedFood from './NasiGorengBurnedFood';
import TableSummary from '../shared/TableSummary';
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
  )
}
