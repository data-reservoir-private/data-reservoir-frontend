import { transjakartaBusStop, transjakartaCorridor } from '@/database/schema';
import { InferSelectModel } from "drizzle-orm";

export type TransjakartaBusStopResponse = Omit<InferSelectModel<typeof transjakartaBusStop>,
  'link' | 'isDeleted' | 'effectiveDate'>

export type TransjakartaCorridorResponse = Omit<InferSelectModel<typeof transjakartaCorridor>,
  'link' | 'isDeleted' | 'effectiveDate' | 'image'> & {
    'color': string,
    
  }