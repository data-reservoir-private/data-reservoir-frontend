import Loading from '@/components/common/loading/Loading';
import { API_ROUTE } from '@/constant/api-route';
import { ptSansBold } from '@/constant/font';
import { TransjakartaCorridorDetailResponse } from '@/model/response/transjakarta';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import React from 'react';
import TransjakartaScheduleIcon from '../TransjakartaScheduleIcon';
import { ticksToTime } from '@/utilities/general';

interface TransjakartaCorridorDetailProps {
  corridorCode: string;
}

export default function TransjakartaCorridorDetail(props: TransjakartaCorridorDetailProps) {
  const { isLoading, data } = useQuery({
    queryKey: ['transjakarta-corridor-detail', props.corridorCode],
    queryFn: async () => {
      const j = await request<TransjakartaCorridorDetailResponse, {}>({
        method: "GET",
        url: API_ROUTE.TRANSJAKARTA.CORRIDOR + `/${props.corridorCode}`,
      });
      return (j?.data ?? []);
    },
  });

  if (isLoading) return <Loading />;

  if (!data) return (
    <div className='flex justify-center w-full'>
      <p>Select a corridor first</p>
    </div>
  );

  return (
    <div className={classNames('m-2 w-full', ptSansBold.className)}>
      
      {/* Header */}
      <div className='flex w-full mb-5'>
        <div style={{ backgroundColor: data.color }} className='text-2xl px-4 py-3 flex justify-center items-center min-w-16'>{data.code}</div>
        <div className='flex items-center gap-5 bg-[#242732] px-6 flex-grow'>
          <span className={classNames(ptSansBold.className, 'text-white text-lg w-full')}>{data.name}</span>
        </div>
      </div>

      {/* Schedules */}
      <div className='flex flex-col w-full gap-3'>
        {
          data.schedule.map((s, idx) => (
            <div key={idx} className='bg-[#242732]'>
              <div className='flex gap-2 p-2'>
                { s.weekday && <TransjakartaScheduleIcon icon='weekday'/> }
                { s.weekend && <TransjakartaScheduleIcon icon='weekend'/> }
                { s.day && <TransjakartaScheduleIcon icon='day'/> }
                { s.night && <TransjakartaScheduleIcon icon='night'/> }
                { s.peak_day && <TransjakartaScheduleIcon icon='peakday'/> }
                { s.peak_evening && <TransjakartaScheduleIcon icon='peakevening'/> }
              </div>
              <div className='w-full'>
                <table className='w-full'> 
                  <thead>
                    <tr>
                      <th>First Bus</th>
                      <th>Last Bus</th>
                    </tr>
                  </thead>
                  <tbody>

                    {/* North */}
                    {
                      (s.start_north && s.end_north) &&
                      <tr>
                        <td>
                          <div>
                            <p>{ s.start_north ? ticksToTime(s.start_north) : "" }</p>
                            <p>{ s.start_north ? s.location_start_north : "" }</p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <p>{ s.end_north ? ticksToTime(s.end_north) : "" }</p>
                            <p>{ s.end_north ? s.location_end_north : "" }</p>
                          </div>
                        </td>
                      </tr>
                    }

                    {/* South */}
                    {
                      (s.start_south && s.end_south) &&
                      <tr>
                        <td>
                          <div>
                            <p>{ s.start_south ? ticksToTime(s.start_south) : "" }</p>
                            <p>{ s.start_south ? s.location_start_south : "" }</p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <p>{ s.end_south ? ticksToTime(s.end_south) : "" }</p>
                            <p>{ s.end_south ? s.location_end_south : "" }</p>
                          </div>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
