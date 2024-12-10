import { pgTable, varchar, uuid, text, integer, boolean, doublePrecision, index, uniqueIndex, time, date } from "drizzle-orm/pg-core";
  
export const efMigrationsHistory = pgTable("__EFMigrationsHistory", {
	migrationId: varchar("MigrationId", { length: 150 }).primaryKey().notNull(),
	productVersion: varchar("ProductVersion", { length: 32 }).notNull(),
});

export const farmFrenzyOneProduct = pgTable("farm_frenzy_one_product", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	image: text("image").notNull(),
	price: integer("price").notNull(),
});

export const farmFrenzyThreeProduct = pgTable("farm_frenzy_three_product", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	image: text("image").notNull(),
	price: integer("price").notNull(),
});

export const farmFrenzyTwoPizzaProduct = pgTable("farm_frenzy_two_pizza_product", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	image: text("image").notNull(),
	price: integer("price").notNull(),
});

export const farmFrenzyTwoProduct = pgTable("farm_frenzy_two_product", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	image: text("image").notNull(),
	price: integer("price").notNull(),
});

export const nasiGorengBurnedFood = pgTable("nasi_goreng_burned_food", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	image: text("image").notNull(),
	category: text("category").notNull(),
});

export const theSimsCastawayProduct = pgTable("the_sims_castaway_product", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	image: text("image").notNull(),
	eatenRaw: boolean("eaten_raw").notNull(),
	hunger: integer("hunger").notNull(),
	bladder: integer("bladder").notNull(),
	energy: integer("energy").notNull(),
	category: varchar("category", { length: 255 }).notNull(),
	description: varchar("description", { length: 4000 }).notNull(),
});

export const haydayProduct = pgTable("hayday_product", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	image: text("image").notNull(),
	category: varchar("category", { length: 255 }).notNull(),
	price: doublePrecision("price").notNull(),
	isRaw: boolean("is_raw").notNull(),
	time: integer("time").notNull(),
	level: integer("level").notNull(),
	xp: integer("xp").notNull(),
});

export const haydayIngredient = pgTable("hayday_ingredient", {
	id: uuid("id").primaryKey().notNull(),
	productId: uuid("product_id").notNull().references(() => haydayProduct.id, { onDelete: "restrict" } ),
	ingredientId: uuid("ingredient_id").notNull().references(() => haydayProduct.id, { onDelete: "restrict" } ),
	quantity: integer("quantity").notNull(),
},
(table) => {
	return {
		ixHaydayIngredientIngredientId: index("IX_hayday_ingredient_ingredient_id").using("btree", table.ingredientId),
		ixHaydayIngredientProductId: index("IX_hayday_ingredient_product_id").using("btree", table.productId),
	};
});

export const haydayBuilding = pgTable("hayday_building", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	image: text("image").notNull(),
	price: integer("price").notNull(),
	level: integer("level").notNull(),
	time: integer("time").notNull(),
	xp: integer("xp").notNull(),
});

export const haydayProducer = pgTable("hayday_producer", {
	id: uuid("id").primaryKey().notNull(),
	productId: uuid("product_id").notNull().references(() => haydayProduct.id, { onDelete: "restrict" } ),
	buildingId: uuid("building_id").notNull().references(() => haydayBuilding.id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		ixHaydayProducerBuildingId: index("IX_hayday_producer_building_id").using("btree", table.buildingId),
		ixHaydayProducerProductId: uniqueIndex("IX_hayday_producer_product_id").using("btree", table.productId),
	};
});

export const nasiGorengIngredient = pgTable("nasi_goreng_ingredient", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	image: text("image").notNull(),
	description: varchar("description", { length: 4000 }).notNull(),
	isProcessed: boolean("is_processed").notNull(),
	price: integer("price").notNull(),
	category: varchar("category", { length: 255 }).notNull(),
});

export const nasiGorengIngredientRecipe = pgTable("nasi_goreng_ingredient_recipe", {
	id: uuid("id").primaryKey().notNull(),
	resultId: uuid("result_id").notNull().references(() => nasiGorengIngredient.id, { onDelete: "restrict" } ),
	ingredientNeededId: uuid("ingredient_needed_id").notNull().references(() => nasiGorengIngredient.id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		ixNasiGorengIngredientRecipeIngredientNeededId: index("IX_nasi_goreng_ingredient_recipe_ingredient_needed_id").using("btree", table.ingredientNeededId),
		ixNasiGorengIngredientRecipeResultId: index("IX_nasi_goreng_ingredient_recipe_result_id").using("btree", table.resultId),
	};
});

export const nasiGorengPlate = pgTable("nasi_goreng_plate", {
	id: uuid("id").primaryKey().notNull(),
	image: text("image").notNull(),
	index: integer("index").default(0).notNull(),
});

export const nasiGorengFriedRice = pgTable("nasi_goreng_fried_rice", {
	id: uuid("id").primaryKey().notNull(),
	plateId: uuid("plate_id").notNull().references(() => nasiGorengPlate.id, { onDelete: "restrict" } ),
	toolId: uuid("tool_id").notNull().references(() => nasiGorengTool.id, { onDelete: "restrict" } ),
	name: varchar("name", { length: 255 }).notNull(),
	rawImage: text("raw_image").notNull(),
	description: varchar("description", { length: 4000 }).notNull(),
	price: integer("price").notNull(),
	rawXCoordinate: integer("raw_x_coordinate").notNull(),
	rawYCoordinate: integer("raw_y_coordinate").notNull(),
	rawLayerNumber: integer("raw_layer_number").notNull(),
},
(table) => {
	return {
		ixNasiGorengFriedRicePlateId: index("IX_nasi_goreng_fried_rice_plate_id").using("btree", table.plateId),
		ixNasiGorengFriedRiceToolId: index("IX_nasi_goreng_fried_rice_tool_id").using("btree", table.toolId),
	};
});

export const nasiGorengTool = pgTable("nasi_goreng_tool", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	image: text("image").notNull(),
	longDescription: varchar("long_description", { length: 4000 }).notNull(),
	shortDescription: varchar("short_description", { length: 4000 }).notNull(),
	price: integer("price").notNull(),
});

export const nasiGorengIngredientTool = pgTable("nasi_goreng_ingredient_tool", {
	id: uuid("id").primaryKey().notNull(),
	resultId: uuid("result_id").notNull().references(() => nasiGorengIngredient.id, { onDelete: "restrict" } ),
	toolId: uuid("tool_id").notNull().references(() => nasiGorengTool.id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		ixNasiGorengIngredientToolResultId: uniqueIndex("IX_nasi_goreng_ingredient_tool_result_id").using("btree", table.resultId),
		ixNasiGorengIngredientToolToolId: index("IX_nasi_goreng_ingredient_tool_tool_id").using("btree", table.toolId),
	};
});

export const nasiGorengRelic = pgTable("nasi_goreng_relic", {
	id: uuid("id").primaryKey().notNull(),
	image: text("image").notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	toolId: uuid("tool_id").notNull().references(() => nasiGorengTool.id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		ixNasiGorengRelicToolId: index("IX_nasi_goreng_relic_tool_id").using("btree", table.toolId),
	};
});

export const pizzaFrenzyTopping = pgTable("pizza_frenzy_topping", {
	id: uuid("id").primaryKey().notNull(),
	generalName: varchar("general_name", { length: 255 }).notNull(),
	image: text("image").notNull(),
});

export const pizzaFrenzyToppingUpgrade = pgTable("pizza_frenzy_topping_upgrade", {
	id: uuid("id").primaryKey().notNull(),
	toppingId: uuid("topping_id").notNull().references(() => pizzaFrenzyTopping.id, { onDelete: "restrict" } ),
	name: varchar("name", { length: 255 }).notNull(),
	description: varchar("description", { length: 4000 }).notNull(),
	price: integer("price").notNull(),
	level: integer("level").notNull(),
},
(table) => {
	return {
		ixPizzaFrenzyToppingUpgradeToppingId: index("IX_pizza_frenzy_topping_upgrade_topping_id").using("btree", table.toppingId),
	};
});

export const nasiGorengFriedRiceLevel = pgTable("nasi_goreng_fried_rice_level", {
	id: uuid("id").primaryKey().notNull(),
	friedRiceId: uuid("fried_rice_id").notNull().references(() => nasiGorengFriedRice.id, { onDelete: "restrict" } ),
	level: integer("level").notNull(),
	image: text("image").notNull(),
	friedRicesNeeded: integer("fried_rices_needed").notNull(),
},
(table) => {
	return {
		ixNasiGorengFriedRiceLevelFriedRiceId: index("IX_nasi_goreng_fried_rice_level_fried_rice_id").using("btree", table.friedRiceId),
	};
});

export const nasiGorengFriedRiceLevelDetail = pgTable("nasi_goreng_fried_rice_level_detail", {
	id: uuid("id").primaryKey().notNull(),
	friedRiceLevelId: uuid("fried_rice_level_id").notNull().references(() => nasiGorengFriedRiceLevel.id, { onDelete: "restrict" } ),
	upgradeId: uuid("upgrade_id").notNull().references(() => nasiGorengUpgrade.id, { onDelete: "restrict" } ),
	xCoordinate: integer("x_coordinate").notNull(),
	yCoordinate: integer("y_coordinate").notNull(),
	layerNumber: integer("layer_number").notNull(),
	flipImageType: integer("flip_image_type").notNull(),
},
(table) => {
	return {
		ixNasiGorengFriedRiceLevelDetailFriedRiceLevelId: index("IX_nasi_goreng_fried_rice_level_detail_fried_rice_level_id").using("btree", table.friedRiceLevelId),
		ixNasiGorengFriedRiceLevelDetailUpgradeId: index("IX_nasi_goreng_fried_rice_level_detail_upgrade_id").using("btree", table.upgradeId),
	};
});

export const nasiGorengUpgrade = pgTable("nasi_goreng_upgrade", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	image: text("image").notNull(),
});

export const nasiGorengFriedRiceLevelRecipe = pgTable("nasi_goreng_fried_rice_level_recipe", {
	id: uuid("id").primaryKey().notNull(),
	friedRiceLevelId: uuid("fried_rice_level_id").notNull().references(() => nasiGorengFriedRiceLevel.id, { onDelete: "restrict" } ),
	ingredientId: uuid("ingredient_id").notNull().references(() => nasiGorengIngredient.id, { onDelete: "restrict" } ),
	quantity: integer("quantity").notNull(),
},
(table) => {
	return {
		ixNasiGorengFriedRiceLevelRecipeFriedRiceLevelId: index("IX_nasi_goreng_fried_rice_level_recipe_fried_rice_level_id").using("btree", table.friedRiceLevelId),
		ixNasiGorengFriedRiceLevelRecipeIngredientId: index("IX_nasi_goreng_fried_rice_level_recipe_ingredient_id").using("btree", table.ingredientId),
	};
});

export const nasiGorengFriedRiceRecipe = pgTable("nasi_goreng_fried_rice_recipe", {
	id: uuid("id").primaryKey().notNull(),
	friedRiceId: uuid("fried_rice_id").notNull().references(() => nasiGorengFriedRice.id, { onDelete: "restrict" } ),
	ingredientId: uuid("ingredient_id").notNull().references(() => nasiGorengIngredient.id, { onDelete: "restrict" } ),
},
(table) => {
	return {
		ixNasiGorengFriedRiceRecipeFriedRiceId: index("IX_nasi_goreng_fried_rice_recipe_fried_rice_id").using("btree", table.friedRiceId),
		ixNasiGorengFriedRiceRecipeIngredientId: index("IX_nasi_goreng_fried_rice_recipe_ingredient_id").using("btree", table.ingredientId),
	};
});

export const theSimsBustinOutCareer = pgTable("the_sims_bustin_out_career", {
	id: uuid("id").primaryKey().notNull(),
	career: varchar("career", { length: 255 }).notNull(),
	level: integer("level").notNull(),
	job: varchar("job", { length: 255 }).notNull(),
	description: varchar("description", { length: 4000 }).notNull(),
	workStart: time("work_start").notNull(),
	workEnd: time("work_end").notNull(),
	friends: integer("friends").notNull(),
	salary: integer("salary").notNull(),
	promotion: integer("promotion").notNull(),
	cooking: integer("cooking").notNull(),
	mechanical: integer("mechanical").notNull(),
	charisma: integer("charisma").notNull(),
	body: integer("body").notNull(),
	logic: integer("logic").notNull(),
	creativity: integer("creativity").notNull(),
});

export const theSimsTwoConsoleCareer = pgTable("the_sims_two_console_career", {
	id: uuid("id").primaryKey().notNull(),
	career: varchar("career", { length: 255 }).notNull(),
	level: integer("level").notNull(),
	job: varchar("job", { length: 255 }).notNull(),
	description: varchar("description", { length: 4000 }).notNull(),
	workStart: time("work_start").notNull(),
	workEnd: time("work_end").notNull(),
	friends: integer("friends").notNull(),
	salary: integer("salary").notNull(),
	promotion: integer("promotion").notNull(),
	cooking: integer("cooking").notNull(),
	mechanical: integer("mechanical").notNull(),
	charisma: integer("charisma").notNull(),
	body: integer("body").notNull(),
	logic: integer("logic").notNull(),
	creativity: integer("creativity").notNull(),
	cleanliness: integer("cleanliness").notNull(),
});

export const theSimsTwoPetsConsoleCareer = pgTable("the_sims_two_pets_console_career", {
	id: uuid("id").primaryKey().notNull(),
	career: varchar("career", { length: 255 }).notNull(),
	level: integer("level").notNull(),
	job: varchar("job", { length: 255 }).notNull(),
	description: varchar("description", { length: 4000 }).notNull(),
	workStart: time("work_start").notNull(),
	workEnd: time("work_end").notNull(),
	friends: integer("friends").notNull(),
	salary: integer("salary").notNull(),
	promotion: integer("promotion").notNull(),
	cooking: integer("cooking").notNull(),
	mechanical: integer("mechanical").notNull(),
	charisma: integer("charisma").notNull(),
	body: integer("body").notNull(),
	logic: integer("logic").notNull(),
	creativity: integer("creativity").notNull(),
	cleanliness: integer("cleanliness").notNull(),
});

export const theSimsFourPcHarvestable = pgTable("the_sims_four_pc_harvestable", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	image: varchar("image", { length: 4000 }).notNull(),
	rarity: integer("rarity").notNull(),
	baseValue: integer("base_value").notNull(),
	perfectValue: integer("perfect_value").notNull(),
	growthRate: doublePrecision("growth_rate").notNull(),
	form: varchar("form", { length: 255 }).notNull(),
	verticalGarden: boolean("vertical_garden").notNull(),
	description: varchar("description", { length: 4000 }).notNull(),
});

export const theSimsTwoPetsConsoleProduct = pgTable("the_sims_two_pets_console_product", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	image: text("image").notNull(),
	category: varchar("category", { length: 255 }).notNull(),
	energy: integer("energy").notNull(),
	hunger: integer("hunger").notNull(),
	bladder: integer("bladder").notNull(),
	description: varchar("description", { length: 4000 }).notNull(),
	price: integer("price").notNull(),
});

export const masterTableCategory = pgTable("master_table_category", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	prefix: varchar("prefix", { length: 255 }).notNull(),
	owner: text("owner").notNull(),
});

export const transjakartaBusRoute = pgTable("transjakarta_bus_route", {
	id: uuid("id").primaryKey().notNull(),
	corridorCode: text("corridor_code").notNull(),
	busStopCode: integer("bus_stop_code").notNull(),
	direction: varchar("direction", { length: 2 }).notNull(),
	order: integer("order").notNull(),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
});

export const transjakartaBusRouteHistory = pgTable("transjakarta_bus_route_history", {
	id: uuid("id").primaryKey().notNull(),
	corridorCode: text("corridor_code").notNull(),
	busStopCode: integer("bus_stop_code").notNull(),
	direction: varchar("direction", { length: 2 }).notNull(),
	order: integer("order").notNull(),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
});

export const transjakartaCorridorHistory = pgTable("transjakarta_corridor_history", {
	id: uuid("id").primaryKey().notNull(),
	code: varchar("code", { length: 32 }).notNull(),
	category: varchar("category", { length: 255 }).notNull(),
	name: varchar("name", { length: 4000 }).notNull(),
	image: text("image").notNull(),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
});

export const transjakartaCorridorStyle = pgTable("transjakarta_corridor_style", {
	id: uuid("id").primaryKey().notNull(),
	code: varchar("code", { length: 32 }).notNull(),
	hexColor: varchar("hex_color", { length: 6 }).notNull(),
	fontSize: integer("font_size").notNull(),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
},
(table) => {
	return {
		ixTransjakartaCorridorStyleCode: uniqueIndex("IX_transjakarta_corridor_style_code").using("btree", table.code),
	};
});

export const transjakartaCorridorStyleHistory = pgTable("transjakarta_corridor_style_history", {
	id: uuid("id").primaryKey().notNull(),
	code: varchar("code", { length: 32 }).notNull(),
	hexColor: varchar("hex_color", { length: 6 }).notNull(),
	fontSize: integer("font_size").notNull(),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
});

export const transjakartaScheduleDetail = pgTable("transjakarta_schedule_detail", {
	id: uuid("id").primaryKey().notNull(),
	code: varchar("code", { length: 32 }).notNull(),
	weekday: boolean("weekday").notNull(),
	weekend: boolean("weekend").notNull(),
	day: boolean("day").notNull(),
	night: boolean("night").notNull(),
	peakDay: boolean("peak_day").notNull(),
	peakEvening: boolean("peak_evening").notNull(),
	startNorth: time("start_north"),
	startSouth: time("start_south"),
	endNorth: time("end_north"),
	endSouth: time("end_south"),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
},
(table) => {
	return {
		ixTransjakartaScheduleDetailCode: index("IX_transjakarta_schedule_detail_code").using("btree", table.code),
	};
});

export const transjakartaScheduleDetailHistory = pgTable("transjakarta_schedule_detail_history", {
	id: uuid("id").primaryKey().notNull(),
	code: varchar("code", { length: 32 }).notNull(),
	weekday: boolean("weekday").notNull(),
	weekend: boolean("weekend").notNull(),
	day: boolean("day").notNull(),
	night: boolean("night").notNull(),
	peakDay: boolean("peak_day").notNull(),
	peakEvening: boolean("peak_evening").notNull(),
	startNorth: time("start_north"),
	startSouth: time("start_south"),
	endNorth: time("end_north"),
	endSouth: time("end_south"),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
});

export const transjakartaScheduleHeader = pgTable("transjakarta_schedule_header", {
	id: uuid("id").primaryKey().notNull(),
	code: varchar("code", { length: 32 }).notNull(),
	weekday: boolean("weekday").notNull(),
	weekend: boolean("weekend").notNull(),
	day: boolean("day").notNull(),
	night: boolean("night").notNull(),
	peakDay: boolean("peak_day").notNull(),
	peakEvening: boolean("peak_evening").notNull(),
	dateStart: date("date_start"),
	dateEnd: date("date_end"),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
},
(table) => {
	return {
		ixTransjakartaScheduleHeaderCode: uniqueIndex("IX_transjakarta_schedule_header_code").using("btree", table.code),
	};
});

export const transjakartaCorridor = pgTable("transjakarta_corridor", {
	id: uuid("id").primaryKey().notNull(),
	code: varchar("code", { length: 32 }).notNull(),
	category: varchar("category", { length: 255 }).notNull(),
	name: varchar("name", { length: 4000 }).notNull(),
	image: text("image").notNull(),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
	pictureEffectiveDate: date("picture_effective_date").default('-infinity').notNull(),
},
(table) => {
	return {
		ixTransjakartaCorridorCode: uniqueIndex("IX_transjakarta_corridor_code").using("btree", table.code),
	};
});

export const transjakartaBusStop = pgTable("transjakarta_bus_stop", {
	id: uuid("id").primaryKey().notNull(),
	code: integer("code").notNull(),
	name: varchar("name", { length: 4000 }).notNull(),
	brt: boolean("brt").notNull(),
	latitude: doublePrecision("latitude").notNull(),
	longitude: doublePrecision("longitude").notNull(),
	link: text("link").notNull(),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
	permanentlyClosed: boolean("permanently_closed").default(false).notNull(),
},
(table) => {
	return {
		ixTransjakartaBusStopCode: uniqueIndex("IX_transjakarta_bus_stop_code").using("btree", table.code),
	};
});

export const transjakartaBusStopHistory = pgTable("transjakarta_bus_stop_history", {
	id: uuid("id").primaryKey().notNull(),
	code: integer("code").notNull(),
	name: varchar("name", { length: 4000 }).notNull(),
	brt: boolean("brt").notNull(),
	latitude: doublePrecision("latitude").notNull(),
	longitude: doublePrecision("longitude").notNull(),
	link: text("link").notNull(),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
	permanentlyClosed: boolean("permanently_closed").default(false).notNull(),
});

export const transjakartaScheduleHeaderHistory = pgTable("transjakarta_schedule_header_history", {
	id: uuid("id").primaryKey().notNull(),
	code: varchar("code", { length: 32 }).notNull(),
	weekday: boolean("weekday").notNull(),
	weekend: boolean("weekend").notNull(),
	day: boolean("day").notNull(),
	night: boolean("night").notNull(),
	peakDay: boolean("peak_day").notNull(),
	peakEvening: boolean("peak_evening").notNull(),
	dayStart: date("day_start").notNull(),
	dayEnd: date("day_end").notNull(),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
});