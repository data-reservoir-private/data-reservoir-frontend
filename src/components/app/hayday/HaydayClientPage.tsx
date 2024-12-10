'use client'

import { HaydayMenu } from "@/constant/tables";
import { useState } from "react";
import HaydayProduct from "./HaydayProduct";
import SimpleListbox from "@/components/common/simple-listbox/SimpleListbox";
import Paper from "@/components/common/paper/Paper";
import HaydayBuilding from "./HaydayBuilding";

export default function HaydayClientPage() {
  const [tab, setTab] = useState<HaydayMenu | null>('building');

  const opt = {
    'product': 'Hayday Product',
    'building': 'Hayday Building'
  };

  return (
    <div className='flex flex-col flex-grow gap-4 text-white h-full'>
      <Paper className="p-2">
        <SimpleListbox onChange={e => setTab(e as HaydayMenu)} options={opt} value={tab} />
      </Paper>

      { tab === 'product' && <HaydayProduct/> }
      { tab === 'building' && <HaydayBuilding/> }
    </div>
  )
}