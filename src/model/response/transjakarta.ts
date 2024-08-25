import { transjakartaBusStop, transjakartaCorridor, transjakartaScheduleDetail } from '@/database/schema';
import { InferSelectModel } from "drizzle-orm";

export type TransjakartaBusStopResponse = Omit<InferSelectModel<typeof transjakartaBusStop>,
  'link' | 'isDeleted' | 'effectiveDate'>

export type TransjakartaCorridorResponse = Omit<InferSelectModel<typeof transjakartaCorridor>,
  'link' | 'isDeleted' | 'effectiveDate' | 'image'> & {
    'color': string,
}

export type TransjakartaCorridorDetailResponse = {
  code: string,
  name: string,
  color: string,
  busStopCode: number[],
  northName: string,
  southName: string,
  schedule: Omit<InferSelectModel<typeof transjakartaScheduleDetail>, 'link' | 'isDeleted' | 'effectiveDate' | 'image' | 'id' | 'code'>[]
}