'use client';

import Paper from '@/components/common/paper/Paper';
import React, { useState } from 'react';
import SimpleListbox from '@/components/common/simple-listbox/SimpleListbox';
import { CygnusTableLabel, CygnusTableType } from '@/constant/tables';
import CygnusMineral from './CygnusMineral';
import CygnusArtifact from './CygnusArtifact';
import CygnusCrop from './CygnusCrop';
import CygnusDish from './CygnusDish';
import CygnusNode from './CygnusNode';

interface CygnusClientPageState {
  pickedTable: CygnusTableType | null
}

export default function CygnusClientPage() {
  const [state, setState] = useState<CygnusClientPageState>({
    pickedTable: 'artifact'
  });
  return (
    <div className='flex flex-col gap-4 text-white w-full h-full'>
      <Paper className='p-2'>
        <SimpleListbox onChange={e => setState({ pickedTable: e as CygnusTableType })} options={CygnusTableLabel} value={state.pickedTable} />
      </Paper>
      {state.pickedTable === "mineral" && <CygnusMineral/>}
      {state.pickedTable === "artifact" && <CygnusArtifact/>}
      {state.pickedTable === "crop" && <CygnusCrop/>}
      {state.pickedTable === "dish" && <CygnusDish/>}
      {state.pickedTable === "node" && <CygnusNode/>}
      {/* {state.pickedTable === "recipe" && <CygnusRecipe/>} */}
    </div>
  );
}