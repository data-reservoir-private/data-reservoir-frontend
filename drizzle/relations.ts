import { relations } from "drizzle-orm/relations";
import { cropInCygnus, cropGradeInCygnus, expenseHeaderInTransaction, expenseDetailInTransaction, forageInCygnus, forageGradeInCygnus, ingredientInNasiGoreng, ingredientRecipeInNasiGoreng, productInHayday, ingredientInHayday, buildingInHayday, producerInHayday, plateInNasiGoreng, friedRiceInNasiGoreng, toolInNasiGoreng, ingredientToolInNasiGoreng, relicInNasiGoreng, toppingInPizzaFrenzy, toppingUpgradeInPizzaFrenzy, truckOrderDetailInHayday, truckOrderHeaderInHayday, friedRiceLevelInNasiGoreng, friedRiceRecipeInNasiGoreng, friedRiceLevelDetailInNasiGoreng, upgradeInNasiGoreng, friedRiceLevelRecipeInNasiGoreng } from "./schema";

export const cropGradeInCygnusRelations = relations(cropGradeInCygnus, ({one}) => ({
	cropInCygnus: one(cropInCygnus, {
		fields: [cropGradeInCygnus.cropId],
		references: [cropInCygnus.id]
	}),
}));

export const cropInCygnusRelations = relations(cropInCygnus, ({many}) => ({
	cropGradeInCygnuses: many(cropGradeInCygnus),
}));

export const expenseDetailInTransactionRelations = relations(expenseDetailInTransaction, ({one}) => ({
	expenseHeaderInTransaction: one(expenseHeaderInTransaction, {
		fields: [expenseDetailInTransaction.expenseHeaderId],
		references: [expenseHeaderInTransaction.id]
	}),
}));

export const expenseHeaderInTransactionRelations = relations(expenseHeaderInTransaction, ({many}) => ({
	expenseDetailInTransactions: many(expenseDetailInTransaction),
}));

export const forageGradeInCygnusRelations = relations(forageGradeInCygnus, ({one}) => ({
	forageInCygnus: one(forageInCygnus, {
		fields: [forageGradeInCygnus.forageId],
		references: [forageInCygnus.id]
	}),
}));

export const forageInCygnusRelations = relations(forageInCygnus, ({many}) => ({
	forageGradeInCygnuses: many(forageGradeInCygnus),
}));

export const ingredientRecipeInNasiGorengRelations = relations(ingredientRecipeInNasiGoreng, ({one}) => ({
	ingredientInNasiGoreng_ingredientNeededId: one(ingredientInNasiGoreng, {
		fields: [ingredientRecipeInNasiGoreng.ingredientNeededId],
		references: [ingredientInNasiGoreng.id],
		relationName: "ingredientRecipeInNasiGoreng_ingredientNeededId_ingredientInNasiGoreng_id"
	}),
	ingredientInNasiGoreng_resultId: one(ingredientInNasiGoreng, {
		fields: [ingredientRecipeInNasiGoreng.resultId],
		references: [ingredientInNasiGoreng.id],
		relationName: "ingredientRecipeInNasiGoreng_resultId_ingredientInNasiGoreng_id"
	}),
}));

export const ingredientInNasiGorengRelations = relations(ingredientInNasiGoreng, ({many}) => ({
	ingredientRecipeInNasiGorengs_ingredientNeededId: many(ingredientRecipeInNasiGoreng, {
		relationName: "ingredientRecipeInNasiGoreng_ingredientNeededId_ingredientInNasiGoreng_id"
	}),
	ingredientRecipeInNasiGorengs_resultId: many(ingredientRecipeInNasiGoreng, {
		relationName: "ingredientRecipeInNasiGoreng_resultId_ingredientInNasiGoreng_id"
	}),
	ingredientToolInNasiGorengs: many(ingredientToolInNasiGoreng),
	friedRiceRecipeInNasiGorengs: many(friedRiceRecipeInNasiGoreng),
	friedRiceLevelRecipeInNasiGorengs: many(friedRiceLevelRecipeInNasiGoreng),
}));

export const ingredientInHaydayRelations = relations(ingredientInHayday, ({one}) => ({
	productInHayday_ingredientId: one(productInHayday, {
		fields: [ingredientInHayday.ingredientId],
		references: [productInHayday.id],
		relationName: "ingredientInHayday_ingredientId_productInHayday_id"
	}),
	productInHayday_productId: one(productInHayday, {
		fields: [ingredientInHayday.productId],
		references: [productInHayday.id],
		relationName: "ingredientInHayday_productId_productInHayday_id"
	}),
}));

export const productInHaydayRelations = relations(productInHayday, ({many}) => ({
	ingredientInHaydays_ingredientId: many(ingredientInHayday, {
		relationName: "ingredientInHayday_ingredientId_productInHayday_id"
	}),
	ingredientInHaydays_productId: many(ingredientInHayday, {
		relationName: "ingredientInHayday_productId_productInHayday_id"
	}),
	producerInHaydays: many(producerInHayday),
	truckOrderDetailInHaydays: many(truckOrderDetailInHayday),
}));

export const producerInHaydayRelations = relations(producerInHayday, ({one}) => ({
	buildingInHayday: one(buildingInHayday, {
		fields: [producerInHayday.buildingId],
		references: [buildingInHayday.id]
	}),
	productInHayday: one(productInHayday, {
		fields: [producerInHayday.productId],
		references: [productInHayday.id]
	}),
}));

export const buildingInHaydayRelations = relations(buildingInHayday, ({many}) => ({
	producerInHaydays: many(producerInHayday),
}));

export const friedRiceInNasiGorengRelations = relations(friedRiceInNasiGoreng, ({one, many}) => ({
	plateInNasiGoreng: one(plateInNasiGoreng, {
		fields: [friedRiceInNasiGoreng.plateId],
		references: [plateInNasiGoreng.id]
	}),
	toolInNasiGoreng: one(toolInNasiGoreng, {
		fields: [friedRiceInNasiGoreng.toolId],
		references: [toolInNasiGoreng.id]
	}),
	friedRiceLevelInNasiGorengs: many(friedRiceLevelInNasiGoreng),
	friedRiceRecipeInNasiGorengs: many(friedRiceRecipeInNasiGoreng),
}));

export const plateInNasiGorengRelations = relations(plateInNasiGoreng, ({many}) => ({
	friedRiceInNasiGorengs: many(friedRiceInNasiGoreng),
}));

export const toolInNasiGorengRelations = relations(toolInNasiGoreng, ({many}) => ({
	friedRiceInNasiGorengs: many(friedRiceInNasiGoreng),
	ingredientToolInNasiGorengs: many(ingredientToolInNasiGoreng),
	relicInNasiGorengs: many(relicInNasiGoreng),
}));

export const ingredientToolInNasiGorengRelations = relations(ingredientToolInNasiGoreng, ({one}) => ({
	ingredientInNasiGoreng: one(ingredientInNasiGoreng, {
		fields: [ingredientToolInNasiGoreng.resultId],
		references: [ingredientInNasiGoreng.id]
	}),
	toolInNasiGoreng: one(toolInNasiGoreng, {
		fields: [ingredientToolInNasiGoreng.toolId],
		references: [toolInNasiGoreng.id]
	}),
}));

export const relicInNasiGorengRelations = relations(relicInNasiGoreng, ({one}) => ({
	toolInNasiGoreng: one(toolInNasiGoreng, {
		fields: [relicInNasiGoreng.toolId],
		references: [toolInNasiGoreng.id]
	}),
}));

export const toppingUpgradeInPizzaFrenzyRelations = relations(toppingUpgradeInPizzaFrenzy, ({one}) => ({
	toppingInPizzaFrenzy: one(toppingInPizzaFrenzy, {
		fields: [toppingUpgradeInPizzaFrenzy.toppingId],
		references: [toppingInPizzaFrenzy.id]
	}),
}));

export const toppingInPizzaFrenzyRelations = relations(toppingInPizzaFrenzy, ({many}) => ({
	toppingUpgradeInPizzaFrenzies: many(toppingUpgradeInPizzaFrenzy),
}));

export const truckOrderDetailInHaydayRelations = relations(truckOrderDetailInHayday, ({one}) => ({
	productInHayday: one(productInHayday, {
		fields: [truckOrderDetailInHayday.productId],
		references: [productInHayday.id]
	}),
	truckOrderHeaderInHayday: one(truckOrderHeaderInHayday, {
		fields: [truckOrderDetailInHayday.truckOrderHeaderId],
		references: [truckOrderHeaderInHayday.id]
	}),
}));

export const truckOrderHeaderInHaydayRelations = relations(truckOrderHeaderInHayday, ({many}) => ({
	truckOrderDetailInHaydays: many(truckOrderDetailInHayday),
}));

export const friedRiceLevelInNasiGorengRelations = relations(friedRiceLevelInNasiGoreng, ({one, many}) => ({
	friedRiceInNasiGoreng: one(friedRiceInNasiGoreng, {
		fields: [friedRiceLevelInNasiGoreng.friedRiceId],
		references: [friedRiceInNasiGoreng.id]
	}),
	friedRiceLevelDetailInNasiGorengs: many(friedRiceLevelDetailInNasiGoreng),
	friedRiceLevelRecipeInNasiGorengs: many(friedRiceLevelRecipeInNasiGoreng),
}));

export const friedRiceRecipeInNasiGorengRelations = relations(friedRiceRecipeInNasiGoreng, ({one}) => ({
	friedRiceInNasiGoreng: one(friedRiceInNasiGoreng, {
		fields: [friedRiceRecipeInNasiGoreng.friedRiceId],
		references: [friedRiceInNasiGoreng.id]
	}),
	ingredientInNasiGoreng: one(ingredientInNasiGoreng, {
		fields: [friedRiceRecipeInNasiGoreng.ingredientId],
		references: [ingredientInNasiGoreng.id]
	}),
}));

export const friedRiceLevelDetailInNasiGorengRelations = relations(friedRiceLevelDetailInNasiGoreng, ({one}) => ({
	friedRiceLevelInNasiGoreng: one(friedRiceLevelInNasiGoreng, {
		fields: [friedRiceLevelDetailInNasiGoreng.friedRiceLevelId],
		references: [friedRiceLevelInNasiGoreng.id]
	}),
	upgradeInNasiGoreng: one(upgradeInNasiGoreng, {
		fields: [friedRiceLevelDetailInNasiGoreng.upgradeId],
		references: [upgradeInNasiGoreng.id]
	}),
}));

export const upgradeInNasiGorengRelations = relations(upgradeInNasiGoreng, ({many}) => ({
	friedRiceLevelDetailInNasiGorengs: many(friedRiceLevelDetailInNasiGoreng),
}));

export const friedRiceLevelRecipeInNasiGorengRelations = relations(friedRiceLevelRecipeInNasiGoreng, ({one}) => ({
	friedRiceLevelInNasiGoreng: one(friedRiceLevelInNasiGoreng, {
		fields: [friedRiceLevelRecipeInNasiGoreng.friedRiceLevelId],
		references: [friedRiceLevelInNasiGoreng.id]
	}),
	ingredientInNasiGoreng: one(ingredientInNasiGoreng, {
		fields: [friedRiceLevelRecipeInNasiGoreng.ingredientId],
		references: [ingredientInNasiGoreng.id]
	}),
}));