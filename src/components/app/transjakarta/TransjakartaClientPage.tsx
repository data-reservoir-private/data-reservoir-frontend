'use client';

import React from 'react';
export default function TransjakartaClientPage() {

  // const { isLoading } = useQuery({
  //   queryKey: ['PERSIST'],
  //   queryFn: async () => {
  //     const j = await request<TransjakartaCorridorStyleResponse[], {}>({
  //       method: "GET",
  //       url: API_ROUTE.TRANSJAKARTA.STYLE,
  //     });
  //     setCorridorColors(j.data.map(x => ({
  //       code: x.corridorCode,
  //       color: x.corridorHexColor
  //     })));
  //     return j.data;
  //   }
  // });
  // if (isLoading || Object.keys(corridorColors).length === 0) return <Loading/>;

  return (
    <div className='flex flex-col gap-4'>

    </div>
  );
  // return (
  //   <div className='flex flex-col gap-4 text-white'>
  //     {
  //       (code && code.length > 0) && <Paper className='!p-0 overflow-hidden'>
  //         <TransjakartaCorridorDetail/>
  //       </Paper>
  //     }
  //     <div className='min-h-[600px] grid grid-cols-2 max-lg:grid-cols-1 gap-4'>
  //       <Paper className='h-full'>
  //         <TransjakartaCorridorTable/>
  //       </Paper>
  //       <Paper className='p-4 h-full'>
  //         <TransjakartaBusStopMap/>
  //         {/* <MyAwesomeMap/> */}
  //       </Paper>
  //     </div>
  //   </div>
  // )
}
