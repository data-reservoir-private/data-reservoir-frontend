import { nasiGorengBurnedFood, nasiGorengFriedRice, nasiGorengIngredient, nasiGorengPlate, nasiGorengRelic, nasiGorengTool, nasiGorengUpgrade } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";

export type NasiGorengBurnedFoodResponse = InferSelectModel<typeof nasiGorengBurnedFood>;
export type NasiGorengIngredientResponse = InferSelectModel<typeof nasiGorengIngredient>;
export type NasiGorengPlateResponse = InferSelectModel<typeof nasiGorengPlate>;
export type NasiGorengRelicResponse = InferSelectModel<typeof nasiGorengRelic>;
export type NasiGorengToolResponse = InferSelectModel<typeof nasiGorengTool>;
export type NasiGorengUpgradeResponse = InferSelectModel<typeof nasiGorengUpgrade>;

export type NasiGorengFriedRiceResponse = InferSelectModel<typeof nasiGorengFriedRice> & {
  level1Image: string,
  level6Image: string
}