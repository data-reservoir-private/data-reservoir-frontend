'use client'

import HaydayProduct from "@/components/app/hayday/HaydayProduct";
import { HaydayMenu, HaydayTab } from "@/constant/tables";
import { useState } from "react";
import HaydayBuilding from "./HaydayBuilding";
import TableSummary from "../shared/TableSummary";

export default function HaydayClientPage() {
  const [tab, setTab] = useState<HaydayMenu | null>(null);
  return (
    <div className='flex flex-col gap-4 text-white'>
      <TableSummary<HaydayMenu> hasPicker
        onPickCategory={(e) => { setTab(e) }}
        category="hayday"
        pickerOption={HaydayTab}
        initialTab="building"
      />

      <div className='min-h-[100vh]'>
        { tab === 'product' && <HaydayProduct/> }
        { tab === 'building' && <HaydayBuilding/> }
      </div>
    </div>
  )
}