import { pgTable, pgSchema, uuid, text, integer, index, varchar, date, boolean, uniqueIndex, doublePrecision, time, jsonb, timestamp, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const cygnus = pgSchema("cygnus");
export const hayday = pgSchema("hayday");
export const nasiGoreng = pgSchema("nasi_goreng");
export const transjakarta = pgSchema("transjakarta");
export const theSims = pgSchema("the_sims");
export const transaction = pgSchema("transaction");
export const farmFrenzy = pgSchema("farm_frenzy");
export const quartz = pgSchema("quartz");
export const master = pgSchema("master");
export const pizzaFrenzy = pgSchema("pizza_frenzy");


export const artifactInCygnus = cygnus.table("artifact", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	description: text().notNull(),
	price: integer().notNull(),
});

export const burnedFoodInNasiGoreng = nasiGoreng.table("burned_food", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	category: text().notNull(),
});

export const busRouteInTransjakarta = transjakarta.table("bus_route", {
	id: uuid().primaryKey().notNull(),
	corridorCode: text("corridor_code").notNull(),
	busStopCode: integer("bus_stop_code").notNull(),
	direction: varchar({ length: 2 }).notNull(),
	order: integer().notNull(),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
}, (table) => [
	index("IX_bus_route_bus_stop_code").using("btree", table.busStopCode.asc().nullsLast().op("int4_ops")),
	index("IX_bus_route_corridor_code").using("btree", table.corridorCode.asc().nullsLast().op("text_ops")),
]);

export const busRouteHistoryInTransjakarta = transjakarta.table("bus_route_history", {
	id: uuid().primaryKey().notNull(),
	corridorCode: text("corridor_code").notNull(),
	busStopCode: integer("bus_stop_code").notNull(),
	direction: varchar({ length: 2 }).notNull(),
	order: integer().notNull(),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
});

export const busStopInTransjakarta = transjakarta.table("bus_stop", {
	id: uuid().primaryKey().notNull(),
	code: integer().notNull(),
	name: text().notNull(),
	brt: boolean().notNull(),
	latitude: doublePrecision().notNull(),
	longitude: doublePrecision().notNull(),
	link: text().notNull(),
	permanentlyClosed: boolean("permanently_closed").notNull(),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
}, (table) => [
	uniqueIndex("IX_bus_stop_code").using("btree", table.code.asc().nullsLast().op("int4_ops")),
	index("IX_bus_stop_name").using("btree", table.name.asc().nullsLast().op("text_ops")),
]);

export const busStopHistoryInTransjakarta = transjakarta.table("bus_stop_history", {
	id: uuid().primaryKey().notNull(),
	code: integer().notNull(),
	name: text().notNull(),
	brt: boolean().notNull(),
	latitude: doublePrecision().notNull(),
	longitude: doublePrecision().notNull(),
	link: text().notNull(),
	permanentlyClosed: boolean("permanently_closed").notNull(),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
});

export const bustinOutCareerInTheSims = theSims.table("bustin_out_career", {
	id: uuid().primaryKey().notNull(),
	career: text().notNull(),
	level: integer().notNull(),
	job: text().notNull(),
	description: text().notNull(),
	workStart: time("work_start").notNull(),
	workEnd: time("work_end").notNull(),
	friends: integer().notNull(),
	salary: integer().notNull(),
	promotion: integer().notNull(),
	cooking: integer().notNull(),
	mechanical: integer().notNull(),
	charisma: integer().notNull(),
	body: integer().notNull(),
	logic: integer().notNull(),
	creativity: integer().notNull(),
});

export const castawayProductInTheSims = theSims.table("castaway_product", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	eatenRaw: boolean("eaten_raw").notNull(),
	hunger: integer().notNull(),
	bladder: integer().notNull(),
	energy: integer().notNull(),
	category: text().notNull(),
	description: text().notNull(),
});

export const corridorInTransjakarta = transjakarta.table("corridor", {
	id: uuid().primaryKey().notNull(),
	code: varchar({ length: 32 }).notNull(),
	category: text().notNull(),
	name: text().notNull(),
	pictureEffectiveDate: date("picture_effective_date").notNull(),
	image: text().notNull(),
	archivedImage: text("archived_image").notNull(),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
}, (table) => [
	index("IX_corridor_category").using("btree", table.category.asc().nullsLast().op("text_ops")),
	uniqueIndex("IX_corridor_code").using("btree", table.code.asc().nullsLast().op("text_ops")),
	index("IX_corridor_name").using("btree", table.name.asc().nullsLast().op("text_ops")),
]);

export const corridorHistoryInTransjakarta = transjakarta.table("corridor_history", {
	id: uuid().primaryKey().notNull(),
	code: varchar({ length: 32 }).notNull(),
	category: text().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
});

export const corridorStyleInTransjakarta = transjakarta.table("corridor_style", {
	id: uuid().primaryKey().notNull(),
	code: varchar({ length: 32 }).notNull(),
	hexColor: varchar("hex_color", { length: 6 }).notNull(),
	fontSize: integer("font_size").notNull(),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
}, (table) => [
	uniqueIndex("IX_corridor_style_code").using("btree", table.code.asc().nullsLast().op("text_ops")),
]);

export const corridorStyleHistoryInTransjakarta = transjakarta.table("corridor_style_history", {
	id: uuid().primaryKey().notNull(),
	code: varchar({ length: 32 }).notNull(),
	hexColor: varchar("hex_color", { length: 6 }).notNull(),
	fontSize: integer("font_size").notNull(),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
});

export const dishInCygnus = cygnus.table("dish", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	description: text().notNull(),
	ingredients: jsonb().notNull(),
	energy: integer().notNull(),
	health: integer().notNull(),
	price: integer().notNull(),
});

export const fourPcHarvestableInTheSims = theSims.table("four_pc_harvestable", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	rarity: integer().notNull(),
	baseValue: integer("base_value").notNull(),
	perfectValue: integer("perfect_value").notNull(),
	growthRate: doublePrecision("growth_rate").notNull(),
	form: text().notNull(),
	verticalGarden: boolean("vertical_garden").notNull(),
	description: text().notNull(),
});

export const incomeInTransaction = transaction.table("income", {
	id: uuid().primaryKey().notNull(),
	date: date().notNull(),
	source: text().notNull(),
	category: text().notNull(),
	currency: text().notNull(),
	income: doublePrecision().notNull(),
	notes: text(),
});

export const mineralInCygnus = cygnus.table("mineral", {
	id: uuid().primaryKey().notNull(),
	category: text().notNull(),
	image: text().notNull(),
	name: text().notNull(),
	description: text().notNull(),
	price: integer().notNull(),
});

export const nodeInCygnus = cygnus.table("node", {
	id: uuid().primaryKey().notNull(),
	image: text().array().notNull(),
	name: text().notNull(),
	contains: text().notNull(),
	locationMines: text("location_mines").notNull(),
	locationOther: text("location_other").notNull(),
});

export const oneProductInFarmFrenzy = farmFrenzy.table("one_product", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	price: integer().notNull(),
});

export const recipeInQuartz = quartz.table("recipe", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	recipe: text().array().notNull(),
});

export const scheduleDetailInTransjakarta = transjakarta.table("schedule_detail", {
	id: uuid().primaryKey().notNull(),
	code: varchar({ length: 32 }).notNull(),
	weekday: boolean().notNull(),
	weekend: boolean().notNull(),
	day: boolean().notNull(),
	night: boolean().notNull(),
	peakDay: boolean("peak_day").notNull(),
	peakEvening: boolean("peak_evening").notNull(),
	locationStartNorth: text("location_start_north"),
	locationStartSouth: text("location_start_south"),
	locationEndNorth: text("location_end_north"),
	locationEndSouth: text("location_end_south"),
	startNorth: time("start_north"),
	startSouth: time("start_south"),
	endNorth: time("end_north"),
	endSouth: time("end_south"),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
}, (table) => [
	index("IX_schedule_detail_code").using("btree", table.code.asc().nullsLast().op("text_ops")),
]);

export const scheduleDetailHistoryInTransjakarta = transjakarta.table("schedule_detail_history", {
	id: uuid().primaryKey().notNull(),
	code: varchar({ length: 32 }).notNull(),
	weekday: boolean().notNull(),
	weekend: boolean().notNull(),
	day: boolean().notNull(),
	night: boolean().notNull(),
	peakDay: boolean("peak_day").notNull(),
	peakEvening: boolean("peak_evening").notNull(),
	startNorth: time("start_north"),
	startSouth: time("start_south"),
	endNorth: time("end_north"),
	endSouth: time("end_south"),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
});

export const scheduleHeaderInTransjakarta = transjakarta.table("schedule_header", {
	id: uuid().primaryKey().notNull(),
	code: varchar({ length: 32 }).notNull(),
	weekday: boolean().notNull(),
	weekend: boolean().notNull(),
	day: boolean().notNull(),
	night: boolean().notNull(),
	peakDay: boolean("peak_day").notNull(),
	peakEvening: boolean("peak_evening").notNull(),
	dateStart: date("date_start"),
	dateEnd: date("date_end"),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
}, (table) => [
	uniqueIndex("IX_schedule_header_code").using("btree", table.code.asc().nullsLast().op("text_ops")),
]);

export const scheduleHeaderHistoryInTransjakarta = transjakarta.table("schedule_header_history", {
	id: uuid().primaryKey().notNull(),
	code: varchar({ length: 32 }).notNull(),
	weekday: boolean().notNull(),
	weekend: boolean().notNull(),
	day: boolean().notNull(),
	night: boolean().notNull(),
	peakDay: boolean("peak_day").notNull(),
	peakEvening: boolean("peak_evening").notNull(),
	dateStart: date("date_start"),
	dateEnd: date("date_end"),
	effectiveDate: date("effective_date").notNull(),
	isDeleted: boolean("is_deleted").notNull(),
});

export const shippableInQuartz = quartz.table("shippable", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	season: text().notNull(),
	location: text().notNull(),
	price: integer().notNull(),
});

export const tableCategoryInMaster = master.table("table_category", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	prefix: text().notNull(),
	owner: text().notNull(),
});

export const threeProductInFarmFrenzy = farmFrenzy.table("three_product", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	price: integer().notNull(),
});

export const transportInTransaction = transaction.table("transport", {
	id: uuid().primaryKey().notNull(),
	company: text().notNull(),
	type: text().notNull(),
	subtype: text(),
	notes: text(),
	positionStart: text("position_start").notNull(),
	positionEnd: text("position_end").notNull(),
	dateStart: timestamp("date_start", { withTimezone: true, mode: 'string' }).notNull(),
	dateEnd: timestamp("date_end", { withTimezone: true, mode: 'string' }).notNull(),
	price: doublePrecision().notNull(),
	currency: text().notNull(),
	exchangeRate: doublePrecision("exchange_rate").notNull(),
	ticketOrder: timestamp("ticket_order", { withTimezone: true, mode: 'string' }),
	passengers: integer(),
});

export const twoConsoleCareerInTheSims = theSims.table("two_console_career", {
	id: uuid().primaryKey().notNull(),
	career: text().notNull(),
	level: integer().notNull(),
	job: text().notNull(),
	description: text().notNull(),
	workStart: time("work_start").notNull(),
	workEnd: time("work_end").notNull(),
	friends: integer().notNull(),
	salary: integer().notNull(),
	promotion: integer().notNull(),
	cooking: integer().notNull(),
	mechanical: integer().notNull(),
	charisma: integer().notNull(),
	body: integer().notNull(),
	logic: integer().notNull(),
	creativity: integer().notNull(),
	cleanliness: integer().notNull(),
});

export const twoPetsConsoleCareerInTheSims = theSims.table("two_pets_console_career", {
	id: uuid().primaryKey().notNull(),
	career: text().notNull(),
	level: integer().notNull(),
	job: text().notNull(),
	description: text().notNull(),
	workStart: time("work_start").notNull(),
	workEnd: time("work_end").notNull(),
	friends: integer().notNull(),
	salary: integer().notNull(),
	promotion: integer().notNull(),
	cooking: integer().notNull(),
	mechanical: integer().notNull(),
	charisma: integer().notNull(),
	body: integer().notNull(),
	logic: integer().notNull(),
	creativity: integer().notNull(),
	cleanliness: integer().notNull(),
});

export const twoPetsConsoleProductInTheSims = theSims.table("two_pets_console_product", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	category: text().notNull(),
	energy: integer().notNull(),
	hunger: integer().notNull(),
	bladder: integer().notNull(),
	description: text().notNull(),
	price: integer().notNull(),
});

export const twoPizzaProductInFarmFrenzy = farmFrenzy.table("two_pizza_product", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	price: integer().notNull(),
});

export const twoProductInFarmFrenzy = farmFrenzy.table("two_product", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	price: integer().notNull(),
});

export const utensilInQuartz = quartz.table("utensil", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	price: integer().notNull(),
});

export const cropInCygnus = cygnus.table("crop", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	description: text().notNull(),
	season: text().array().notNull(),
	seeds: jsonb().notNull(),
	special: jsonb(),
	stages: jsonb().notNull(),
});

export const cropGradeInCygnus = cygnus.table("crop_grade", {
	id: uuid().primaryKey().notNull(),
	gradeId: integer("grade_id").notNull(),
	cropId: uuid("crop_id").notNull(),
	grade: text().notNull(),
	price: integer(),
	energy: integer(),
	health: integer(),
}, (table) => [
	index("IX_crop_grade_crop_id").using("btree", table.cropId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.cropId],
			foreignColumns: [cropInCygnus.id],
			name: "FK_crop_grade_crop_crop_id"
		}).onDelete("cascade"),
]);

export const expenseHeaderInTransaction = transaction.table("expense_header", {
	id: uuid().primaryKey().notNull(),
	date: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
	tenant: text().notNull(),
	taxDiscount: doublePrecision("tax_discount").notNull(),
	service: doublePrecision().notNull(),
	adjustment: doublePrecision().notNull(),
	serviceTax: integer("service_tax").notNull(),
	restaurantTax: integer("restaurant_tax").notNull(),
	currency: text().notNull(),
	exchangeRate: doublePrecision("exchange_rate").notNull(),
});

export const expenseDetailInTransaction = transaction.table("expense_detail", {
	id: uuid().primaryKey().notNull(),
	expenseHeaderId: uuid("expense_header_id").notNull(),
	category: text().notNull(),
	order: text().notNull(),
	quantity: integer().notNull(),
	price: doublePrecision().notNull(),
}, (table) => [
	index("IX_expense_detail_expense_header_id").using("btree", table.expenseHeaderId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.expenseHeaderId],
			foreignColumns: [expenseHeaderInTransaction.id],
			name: "FK_expense_detail_expense_header_expense_header_id"
		}).onDelete("cascade"),
]);

export const forageInCygnus = cygnus.table("forage", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	description: text().notNull(),
	season: text().array().notNull(),
});

export const forageGradeInCygnus = cygnus.table("forage_grade", {
	id: uuid().primaryKey().notNull(),
	gradeId: integer("grade_id").notNull(),
	forageId: uuid("forage_id").notNull(),
	grade: text().notNull(),
	price: integer(),
	energy: integer(),
	health: integer(),
}, (table) => [
	index("IX_forage_grade_forage_id").using("btree", table.forageId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.forageId],
			foreignColumns: [forageInCygnus.id],
			name: "FK_forage_grade_forage_forage_id"
		}).onDelete("cascade"),
]);

export const ingredientInNasiGoreng = nasiGoreng.table("ingredient", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	description: text().notNull(),
	isProcessed: boolean("is_processed").notNull(),
	price: integer().notNull(),
	category: text().notNull(),
});

export const ingredientRecipeInNasiGoreng = nasiGoreng.table("ingredient_recipe", {
	id: uuid().primaryKey().notNull(),
	resultId: uuid("result_id").notNull(),
	ingredientNeededId: uuid("ingredient_needed_id").notNull(),
}, (table) => [
	index("IX_ingredient_recipe_ingredient_needed_id").using("btree", table.ingredientNeededId.asc().nullsLast().op("uuid_ops")),
	index("IX_ingredient_recipe_result_id").using("btree", table.resultId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.ingredientNeededId],
			foreignColumns: [ingredientInNasiGoreng.id],
			name: "FK_ingredient_recipe_ingredient_ingredient_needed_id"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.resultId],
			foreignColumns: [ingredientInNasiGoreng.id],
			name: "FK_ingredient_recipe_ingredient_result_id"
		}).onDelete("cascade"),
]);

export const productInHayday = hayday.table("product", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	category: text().notNull(),
	price: doublePrecision().notNull(),
	isRaw: boolean("is_raw").notNull(),
	time: integer().notNull(),
	level: integer().notNull(),
	xp: integer().notNull(),
}, (table) => [
	index("IX_product_category").using("btree", table.category.asc().nullsLast().op("text_ops")),
	index("IX_product_is_raw").using("btree", table.isRaw.asc().nullsLast().op("bool_ops")),
	index("IX_product_level").using("btree", table.level.asc().nullsLast().op("int4_ops")),
	index("IX_product_name").using("gin", table.name.asc().nullsLast().op("gin_trgm_ops")),
	index("IX_product_price").using("btree", table.price.asc().nullsLast().op("float8_ops")),
	index("IX_product_time").using("btree", table.time.asc().nullsLast().op("int4_ops")),
	index("IX_product_xp").using("btree", table.xp.asc().nullsLast().op("int4_ops")),
]);

export const ingredientInHayday = hayday.table("ingredient", {
	id: uuid().primaryKey().notNull(),
	productId: uuid("product_id").notNull(),
	ingredientId: uuid("ingredient_id").notNull(),
	quantity: integer().notNull(),
}, (table) => [
	index("IX_ingredient_ingredient_id").using("btree", table.ingredientId.asc().nullsLast().op("uuid_ops")),
	index("IX_ingredient_product_id").using("btree", table.productId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.ingredientId],
			foreignColumns: [productInHayday.id],
			name: "FK_ingredient_product_ingredient_id"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.productId],
			foreignColumns: [productInHayday.id],
			name: "FK_ingredient_product_product_id"
		}).onDelete("cascade"),
]);

export const buildingInHayday = hayday.table("building", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	price: integer().notNull(),
	level: integer().notNull(),
	time: integer().notNull(),
	xp: integer().notNull(),
});

export const producerInHayday = hayday.table("producer", {
	id: uuid().primaryKey().notNull(),
	productId: uuid("product_id").notNull(),
	buildingId: uuid("building_id").notNull(),
}, (table) => [
	index("IX_producer_building_id").using("btree", table.buildingId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("IX_producer_product_id").using("btree", table.productId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.buildingId],
			foreignColumns: [buildingInHayday.id],
			name: "FK_producer_building_building_id"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.productId],
			foreignColumns: [productInHayday.id],
			name: "FK_producer_product_product_id"
		}).onDelete("cascade"),
]);

export const plateInNasiGoreng = nasiGoreng.table("plate", {
	id: uuid().primaryKey().notNull(),
	image: text().notNull(),
	index: integer().notNull(),
});

export const friedRiceInNasiGoreng = nasiGoreng.table("fried_rice", {
	id: uuid().primaryKey().notNull(),
	plateId: uuid("plate_id").notNull(),
	toolId: uuid("tool_id").notNull(),
	name: text().notNull(),
	rawImage: text("raw_image").notNull(),
	description: text().notNull(),
	price: integer().notNull(),
	rawXCoordinate: integer("raw_x_coordinate").notNull(),
	rawYCoordinate: integer("raw_y_coordinate").notNull(),
	rawLayerNumber: integer("raw_layer_number").notNull(),
}, (table) => [
	index("IX_fried_rice_plate_id").using("btree", table.plateId.asc().nullsLast().op("uuid_ops")),
	index("IX_fried_rice_tool_id").using("btree", table.toolId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.plateId],
			foreignColumns: [plateInNasiGoreng.id],
			name: "FK_fried_rice_plate_plate_id"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.toolId],
			foreignColumns: [toolInNasiGoreng.id],
			name: "FK_fried_rice_tool_tool_id"
		}).onDelete("cascade"),
]);

export const toolInNasiGoreng = nasiGoreng.table("tool", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
	longDescription: text("long_description").notNull(),
	shortDescription: text("short_description").notNull(),
	price: integer().notNull(),
});

export const ingredientToolInNasiGoreng = nasiGoreng.table("ingredient_tool", {
	id: uuid().primaryKey().notNull(),
	resultId: uuid("result_id").notNull(),
	toolId: uuid("tool_id").notNull(),
}, (table) => [
	uniqueIndex("IX_ingredient_tool_result_id").using("btree", table.resultId.asc().nullsLast().op("uuid_ops")),
	index("IX_ingredient_tool_tool_id").using("btree", table.toolId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.resultId],
			foreignColumns: [ingredientInNasiGoreng.id],
			name: "FK_ingredient_tool_ingredient_result_id"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.toolId],
			foreignColumns: [toolInNasiGoreng.id],
			name: "FK_ingredient_tool_tool_tool_id"
		}).onDelete("cascade"),
]);

export const relicInNasiGoreng = nasiGoreng.table("relic", {
	id: uuid().primaryKey().notNull(),
	image: text().notNull(),
	name: text().notNull(),
	toolId: uuid("tool_id").notNull(),
}, (table) => [
	index("IX_relic_tool_id").using("btree", table.toolId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.toolId],
			foreignColumns: [toolInNasiGoreng.id],
			name: "FK_relic_tool_tool_id"
		}).onDelete("cascade"),
]);

export const toppingInPizzaFrenzy = pizzaFrenzy.table("topping", {
	id: uuid().primaryKey().notNull(),
	generalName: text("general_name").notNull(),
	image: text().notNull(),
});

export const toppingUpgradeInPizzaFrenzy = pizzaFrenzy.table("topping_upgrade", {
	id: uuid().primaryKey().notNull(),
	toppingId: uuid("topping_id").notNull(),
	name: text().notNull(),
	description: text().notNull(),
	price: integer().notNull(),
	level: integer().notNull(),
}, (table) => [
	index("IX_topping_upgrade_topping_id").using("btree", table.toppingId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.toppingId],
			foreignColumns: [toppingInPizzaFrenzy.id],
			name: "FK_topping_upgrade_topping_topping_id"
		}).onDelete("cascade"),
]);

export const truckOrderDetailInHayday = hayday.table("truck_order_detail", {
	id: uuid().primaryKey().notNull(),
	productId: uuid("product_id").notNull(),
	truckOrderHeaderId: uuid("truck_order_header_id").notNull(),
	quantity: integer().notNull(),
}, (table) => [
	index("IX_truck_order_detail_product_id").using("btree", table.productId.asc().nullsLast().op("uuid_ops")),
	index("IX_truck_order_detail_truck_order_header_id").using("btree", table.truckOrderHeaderId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.productId],
			foreignColumns: [productInHayday.id],
			name: "FK_truck_order_detail_product_product_id"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.truckOrderHeaderId],
			foreignColumns: [truckOrderHeaderInHayday.id],
			name: "FK_truck_order_detail_truck_order_header_truck_order_header_id"
		}).onDelete("cascade"),
]);

export const truckOrderHeaderInHayday = hayday.table("truck_order_header", {
	id: uuid().primaryKey().notNull(),
	dateCompleted: timestamp("date_completed", { withTimezone: true, mode: 'string' }),
	hash: text().notNull(),
	headerOrderingId: integer("header_ordering_id").notNull(),
	clientName: text("client_name").notNull(),
	coin: integer().notNull(),
	xp: integer().notNull(),
	special: integer(),
	level: integer().notNull(),
	voucher: integer().notNull(),
	event: integer().notNull(),
	revenueAd: boolean("revenue_ad").notNull(),
	notes: text(),
	orderStatus: integer("order_status").notNull(),
	position: integer().notNull(),
	bonusProductId: uuid("bonus_product_id"),
	bonusProductQuantity: integer("bonus_product_quantity"),
	bonusBooster: text("bonus_booster"),
});

export const friedRiceLevelInNasiGoreng = nasiGoreng.table("fried_rice_level", {
	id: uuid().primaryKey().notNull(),
	friedRiceId: uuid("fried_rice_id").notNull(),
	level: integer().notNull(),
	image: text().notNull(),
	friedRicesNeeded: integer("fried_rices_needed").notNull(),
}, (table) => [
	index("IX_fried_rice_level_fried_rice_id").using("btree", table.friedRiceId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.friedRiceId],
			foreignColumns: [friedRiceInNasiGoreng.id],
			name: "FK_fried_rice_level_fried_rice_fried_rice_id"
		}).onDelete("cascade"),
]);

export const friedRiceRecipeInNasiGoreng = nasiGoreng.table("fried_rice_recipe", {
	id: uuid().primaryKey().notNull(),
	friedRiceId: uuid("fried_rice_id").notNull(),
	ingredientId: uuid("ingredient_id").notNull(),
}, (table) => [
	index("IX_fried_rice_recipe_fried_rice_id").using("btree", table.friedRiceId.asc().nullsLast().op("uuid_ops")),
	index("IX_fried_rice_recipe_ingredient_id").using("btree", table.ingredientId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.friedRiceId],
			foreignColumns: [friedRiceInNasiGoreng.id],
			name: "FK_fried_rice_recipe_fried_rice_fried_rice_id"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.ingredientId],
			foreignColumns: [ingredientInNasiGoreng.id],
			name: "FK_fried_rice_recipe_ingredient_ingredient_id"
		}).onDelete("cascade"),
]);

export const friedRiceLevelDetailInNasiGoreng = nasiGoreng.table("fried_rice_level_detail", {
	id: uuid().primaryKey().notNull(),
	friedRiceLevelId: uuid("fried_rice_level_id").notNull(),
	upgradeId: uuid("upgrade_id").notNull(),
	xCoordinate: integer("x_coordinate").notNull(),
	yCoordinate: integer("y_coordinate").notNull(),
	layerNumber: integer("layer_number").notNull(),
	flipImageType: integer("flip_image_type").notNull(),
}, (table) => [
	index("IX_fried_rice_level_detail_fried_rice_level_id").using("btree", table.friedRiceLevelId.asc().nullsLast().op("uuid_ops")),
	index("IX_fried_rice_level_detail_upgrade_id").using("btree", table.upgradeId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.friedRiceLevelId],
			foreignColumns: [friedRiceLevelInNasiGoreng.id],
			name: "FK_fried_rice_level_detail_fried_rice_level_fried_rice_level_id"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.upgradeId],
			foreignColumns: [upgradeInNasiGoreng.id],
			name: "FK_fried_rice_level_detail_upgrade_upgrade_id"
		}).onDelete("cascade"),
]);

export const upgradeInNasiGoreng = nasiGoreng.table("upgrade", {
	id: uuid().primaryKey().notNull(),
	name: text().notNull(),
	image: text().notNull(),
});

export const friedRiceLevelRecipeInNasiGoreng = nasiGoreng.table("fried_rice_level_recipe", {
	id: uuid().primaryKey().notNull(),
	friedRiceLevelId: uuid("fried_rice_level_id").notNull(),
	ingredientId: uuid("ingredient_id").notNull(),
	quantity: integer().notNull(),
}, (table) => [
	index("IX_fried_rice_level_recipe_fried_rice_level_id").using("btree", table.friedRiceLevelId.asc().nullsLast().op("uuid_ops")),
	index("IX_fried_rice_level_recipe_ingredient_id").using("btree", table.ingredientId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.friedRiceLevelId],
			foreignColumns: [friedRiceLevelInNasiGoreng.id],
			name: "FK_fried_rice_level_recipe_fried_rice_level_fried_rice_level_id"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.ingredientId],
			foreignColumns: [ingredientInNasiGoreng.id],
			name: "FK_fried_rice_level_recipe_ingredient_ingredient_id"
		}).onDelete("cascade"),
]);
