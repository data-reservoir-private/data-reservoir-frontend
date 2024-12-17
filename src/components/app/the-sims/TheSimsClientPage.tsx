'use client';

import BustinOutCareer from "@/components/app/the-sims/BustinOutCareer";
import CastawayProduct from "@/components/app/the-sims/CastawayProduct";
import FourPCHarvestable from "@/components/app/the-sims/FourPCHarvestable";
import TwoConsoleCareer from "@/components/app/the-sims/TwoConsoleCareer";
import TwoPetsConsoleCareer from "@/components/app/the-sims/TwoPetsConsoleCareer";
import TwoPetsConsoleProduct from "@/components/app/the-sims/TwoPetsConsoleProduct";
import { useState } from "react";
import Paper from "@/components/common/paper/Paper";
import SimpleListbox from "@/components/common/simple-listbox/SimpleListbox";
import { TheSimsTableType } from "@/constant/tables";

export default function TheSimsClientPage() {
  const [state, setTab] = useState<TheSimsTableType | null>('the_sims_bustin_out_career');

  const opt: {[key in TheSimsTableType]: string} = {
    'the_sims_castaway_product': 'Castaway Product',
    'the_sims_bustin_out_career': 'Bustin Out Career',
    'the_sims_four_pc_harvestable': 'Four PC Harvestable',
    'the_sims_two_console_career': 'Two Console Career',
    'the_sims_two_pets_console_career': 'Two Pets Console Career',
    'the_sims_two_pets_console_product': 'Two Pets Console Product'
  };

  return (
    <div className='flex flex-col flex-grow gap-4 text-white h-full'>
      <Paper className="p-2">
        <SimpleListbox onChange={e => setTab(e as TheSimsTableType)} options={opt} value={state} />
      </Paper>
      { state === "the_sims_castaway_product" && <CastawayProduct/> }
      { state === "the_sims_four_pc_harvestable" && <FourPCHarvestable/> }
      { state === "the_sims_bustin_out_career" && <BustinOutCareer/> }
      { state === "the_sims_two_console_career" && <TwoConsoleCareer/> }
      { state === "the_sims_two_pets_console_career" && <TwoPetsConsoleCareer/> }
      { state === "the_sims_two_pets_console_product" && <TwoPetsConsoleProduct/> }
    </div>
  );
}