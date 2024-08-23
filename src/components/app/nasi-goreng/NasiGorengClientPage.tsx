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
import BurnedFood from './BurnedFood';
import TableSummary from '../shared/TableSummary';

export default function NasiGorengClientPage() {
  const [state, setState] = useState<NasiGorengTableType | null>('nasi_goreng_burned_food');
  return (
    <div className='flex flex-col gap-4 text-white'>
      <TableSummary
        category='nasi_goreng'
        hasPicker
        initialTab='nasi_goreng_burned_food'
        onPickCategory={e => setState(e)}
        pickerOption={NasiGorengTableLabel}
      />
    </div>
  )
}
