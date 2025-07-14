import React from 'react';

interface GridDetailProps {
  data: { [key: string]: React.ReactNode }
}

export default function GridDetail(props: GridDetailProps) {
  return (
    <table className='text-sm w-full'>
      <tbody>
        {
          Object.entries(props.data).map(([key, value]) => (
            <tr key={key} className='text-sm'>
              <td className='text-sm bg-slate-500 w-[40%]'>{key}</td>
              <td className='text-sm overflow-clip'>{value}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
