import { transjakartaBusStop, transjakartaCorridor, transjakartaScheduleDetail } from '@/database/schema';
import { InferSelectModel } from "drizzle-orm";

export type TransjakartaBusStopResponse = Omit<InferSelectModel<typeof transjakartaBusStop>,
  'link' | 'isDeleted' | 'effectiveDate'> & {
    corridors: string[]
  }

export type TransjakartaCorridorResponse = Omit<InferSelectModel<typeof transjakartaCorridor>,
  'link' | 'isDeleted' | 'effectiveDate' | 'image' | 'pictureEffectiveDate'> & {
  'color': string,
  'problem': number
}

export type TransjakartaCorridorDetailResponse = {
  code: string,
  name: string,
  color: string,
  busStopCode: number[],
  northName: string,
  southName: string,
  problem: number,
  schedule: Omit<InferSelectModel<typeof transjakartaScheduleDetail>, 'link' | 'isDeleted' | 'effectiveDate' | 'image' | 'id' | 'code'>[]
}