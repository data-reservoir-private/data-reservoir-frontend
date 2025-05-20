-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE SCHEMA "cygnus";
--> statement-breakpoint
CREATE SCHEMA "hayday";
--> statement-breakpoint
CREATE SCHEMA "nasi_goreng";
--> statement-breakpoint
CREATE SCHEMA "transjakarta";
--> statement-breakpoint
CREATE SCHEMA "the_sims";
--> statement-breakpoint
CREATE SCHEMA "transaction";
--> statement-breakpoint
CREATE SCHEMA "farm_frenzy";
--> statement-breakpoint
CREATE SCHEMA "quartz";
--> statement-breakpoint
CREATE SCHEMA "master";
--> statement-breakpoint
CREATE SCHEMA "pizza_frenzy";
--> statement-breakpoint
CREATE TABLE "cygnus"."artifact" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nasi_goreng"."burned_food" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"category" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transjakarta"."bus_route" (
	"id" uuid PRIMARY KEY NOT NULL,
	"corridor_code" text NOT NULL,
	"bus_stop_code" integer NOT NULL,
	"direction" varchar(2) NOT NULL,
	"order" integer NOT NULL,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transjakarta"."bus_route_history" (
	"id" uuid PRIMARY KEY NOT NULL,
	"corridor_code" text NOT NULL,
	"bus_stop_code" integer NOT NULL,
	"direction" varchar(2) NOT NULL,
	"order" integer NOT NULL,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transjakarta"."bus_stop" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" integer NOT NULL,
	"name" text NOT NULL,
	"brt" boolean NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"link" text NOT NULL,
	"permanently_closed" boolean NOT NULL,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transjakarta"."bus_stop_history" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" integer NOT NULL,
	"name" text NOT NULL,
	"brt" boolean NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"link" text NOT NULL,
	"permanently_closed" boolean NOT NULL,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "the_sims"."bustin_out_career" (
	"id" uuid PRIMARY KEY NOT NULL,
	"career" text NOT NULL,
	"level" integer NOT NULL,
	"job" text NOT NULL,
	"description" text NOT NULL,
	"work_start" time NOT NULL,
	"work_end" time NOT NULL,
	"friends" integer NOT NULL,
	"salary" integer NOT NULL,
	"promotion" integer NOT NULL,
	"cooking" integer NOT NULL,
	"mechanical" integer NOT NULL,
	"charisma" integer NOT NULL,
	"body" integer NOT NULL,
	"logic" integer NOT NULL,
	"creativity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "the_sims"."castaway_product" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"eaten_raw" boolean NOT NULL,
	"hunger" integer NOT NULL,
	"bladder" integer NOT NULL,
	"energy" integer NOT NULL,
	"category" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transjakarta"."corridor" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" varchar(32) NOT NULL,
	"category" text NOT NULL,
	"name" text NOT NULL,
	"picture_effective_date" date NOT NULL,
	"image" text NOT NULL,
	"archived_image" text NOT NULL,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transjakarta"."corridor_history" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" varchar(32) NOT NULL,
	"category" text NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transjakarta"."corridor_style" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" varchar(32) NOT NULL,
	"hex_color" varchar(6) NOT NULL,
	"font_size" integer NOT NULL,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transjakarta"."corridor_style_history" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" varchar(32) NOT NULL,
	"hex_color" varchar(6) NOT NULL,
	"font_size" integer NOT NULL,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cygnus"."dish" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"description" text NOT NULL,
	"ingredients" jsonb NOT NULL,
	"energy" integer NOT NULL,
	"health" integer NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "the_sims"."four_pc_harvestable" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"rarity" integer NOT NULL,
	"base_value" integer NOT NULL,
	"perfect_value" integer NOT NULL,
	"growth_rate" double precision NOT NULL,
	"form" text NOT NULL,
	"vertical_garden" boolean NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transaction"."income" (
	"id" uuid PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"source" text NOT NULL,
	"category" text NOT NULL,
	"currency" text NOT NULL,
	"income" double precision NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "cygnus"."mineral" (
	"id" uuid PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"image" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cygnus"."node" (
	"id" uuid PRIMARY KEY NOT NULL,
	"image" text[] NOT NULL,
	"name" text NOT NULL,
	"contains" text NOT NULL,
	"location_mines" text NOT NULL,
	"location_other" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "farm_frenzy"."one_product" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quartz"."recipe" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"recipe" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transjakarta"."schedule_detail" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" varchar(32) NOT NULL,
	"weekday" boolean NOT NULL,
	"weekend" boolean NOT NULL,
	"day" boolean NOT NULL,
	"night" boolean NOT NULL,
	"peak_day" boolean NOT NULL,
	"peak_evening" boolean NOT NULL,
	"location_start_north" text,
	"location_start_south" text,
	"location_end_north" text,
	"location_end_south" text,
	"start_north" time,
	"start_south" time,
	"end_north" time,
	"end_south" time,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transjakarta"."schedule_detail_history" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" varchar(32) NOT NULL,
	"weekday" boolean NOT NULL,
	"weekend" boolean NOT NULL,
	"day" boolean NOT NULL,
	"night" boolean NOT NULL,
	"peak_day" boolean NOT NULL,
	"peak_evening" boolean NOT NULL,
	"start_north" time,
	"start_south" time,
	"end_north" time,
	"end_south" time,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transjakarta"."schedule_header" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" varchar(32) NOT NULL,
	"weekday" boolean NOT NULL,
	"weekend" boolean NOT NULL,
	"day" boolean NOT NULL,
	"night" boolean NOT NULL,
	"peak_day" boolean NOT NULL,
	"peak_evening" boolean NOT NULL,
	"date_start" date,
	"date_end" date,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transjakarta"."schedule_header_history" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" varchar(32) NOT NULL,
	"weekday" boolean NOT NULL,
	"weekend" boolean NOT NULL,
	"day" boolean NOT NULL,
	"night" boolean NOT NULL,
	"peak_day" boolean NOT NULL,
	"peak_evening" boolean NOT NULL,
	"date_start" date,
	"date_end" date,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quartz"."shippable" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"season" text NOT NULL,
	"location" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "master"."table_category" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"prefix" text NOT NULL,
	"owner" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "farm_frenzy"."three_product" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transaction"."transport" (
	"id" uuid PRIMARY KEY NOT NULL,
	"company" text NOT NULL,
	"type" text NOT NULL,
	"subtype" text,
	"notes" text,
	"position_start" text NOT NULL,
	"position_end" text NOT NULL,
	"date_start" timestamp with time zone NOT NULL,
	"date_end" timestamp with time zone NOT NULL,
	"price" double precision NOT NULL,
	"currency" text NOT NULL,
	"exchange_rate" double precision NOT NULL,
	"ticket_order" timestamp with time zone,
	"passengers" integer
);
--> statement-breakpoint
CREATE TABLE "the_sims"."two_console_career" (
	"id" uuid PRIMARY KEY NOT NULL,
	"career" text NOT NULL,
	"level" integer NOT NULL,
	"job" text NOT NULL,
	"description" text NOT NULL,
	"work_start" time NOT NULL,
	"work_end" time NOT NULL,
	"friends" integer NOT NULL,
	"salary" integer NOT NULL,
	"promotion" integer NOT NULL,
	"cooking" integer NOT NULL,
	"mechanical" integer NOT NULL,
	"charisma" integer NOT NULL,
	"body" integer NOT NULL,
	"logic" integer NOT NULL,
	"creativity" integer NOT NULL,
	"cleanliness" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "the_sims"."two_pets_console_career" (
	"id" uuid PRIMARY KEY NOT NULL,
	"career" text NOT NULL,
	"level" integer NOT NULL,
	"job" text NOT NULL,
	"description" text NOT NULL,
	"work_start" time NOT NULL,
	"work_end" time NOT NULL,
	"friends" integer NOT NULL,
	"salary" integer NOT NULL,
	"promotion" integer NOT NULL,
	"cooking" integer NOT NULL,
	"mechanical" integer NOT NULL,
	"charisma" integer NOT NULL,
	"body" integer NOT NULL,
	"logic" integer NOT NULL,
	"creativity" integer NOT NULL,
	"cleanliness" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "the_sims"."two_pets_console_product" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"category" text NOT NULL,
	"energy" integer NOT NULL,
	"hunger" integer NOT NULL,
	"bladder" integer NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "farm_frenzy"."two_pizza_product" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "farm_frenzy"."two_product" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quartz"."utensil" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cygnus"."crop" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"description" text NOT NULL,
	"season" text[] NOT NULL,
	"seeds" jsonb NOT NULL,
	"special" jsonb,
	"stages" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cygnus"."crop_grade" (
	"id" uuid PRIMARY KEY NOT NULL,
	"grade_id" integer NOT NULL,
	"crop_id" uuid NOT NULL,
	"grade" text NOT NULL,
	"price" integer,
	"energy" integer,
	"health" integer
);
--> statement-breakpoint
CREATE TABLE "transaction"."expense_header" (
	"id" uuid PRIMARY KEY NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"tenant" text NOT NULL,
	"tax_discount" double precision NOT NULL,
	"service" double precision NOT NULL,
	"adjustment" double precision NOT NULL,
	"service_tax" integer NOT NULL,
	"restaurant_tax" integer NOT NULL,
	"currency" text NOT NULL,
	"exchange_rate" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transaction"."expense_detail" (
	"id" uuid PRIMARY KEY NOT NULL,
	"expense_header_id" uuid NOT NULL,
	"category" text NOT NULL,
	"order" text NOT NULL,
	"quantity" integer NOT NULL,
	"price" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cygnus"."forage" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"description" text NOT NULL,
	"season" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cygnus"."forage_grade" (
	"id" uuid PRIMARY KEY NOT NULL,
	"grade_id" integer NOT NULL,
	"forage_id" uuid NOT NULL,
	"grade" text NOT NULL,
	"price" integer,
	"energy" integer,
	"health" integer
);
--> statement-breakpoint
CREATE TABLE "nasi_goreng"."ingredient" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"description" text NOT NULL,
	"is_processed" boolean NOT NULL,
	"price" integer NOT NULL,
	"category" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nasi_goreng"."ingredient_recipe" (
	"id" uuid PRIMARY KEY NOT NULL,
	"result_id" uuid NOT NULL,
	"ingredient_needed_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hayday"."product" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"category" text NOT NULL,
	"price" double precision NOT NULL,
	"is_raw" boolean NOT NULL,
	"time" integer NOT NULL,
	"level" integer NOT NULL,
	"xp" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hayday"."ingredient" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_id" uuid NOT NULL,
	"ingredient_id" uuid NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hayday"."building" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"price" integer NOT NULL,
	"level" integer NOT NULL,
	"time" integer NOT NULL,
	"xp" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hayday"."producer" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_id" uuid NOT NULL,
	"building_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hayday"."truck_order_header" (
	"id" uuid PRIMARY KEY NOT NULL,
	"date_completed" timestamp with time zone,
	"hash" text NOT NULL,
	"header_ordering_id" integer NOT NULL,
	"client_name" text NOT NULL,
	"coin" integer NOT NULL,
	"xp" integer NOT NULL,
	"special" integer,
	"level" integer NOT NULL,
	"voucher" integer NOT NULL,
	"event" integer NOT NULL,
	"revenue_ad" boolean NOT NULL,
	"notes" text,
	"order_status" integer NOT NULL,
	"position" integer NOT NULL,
	"bonus_product_id" uuid,
	"bonus_product_quantity" integer,
	"bonus_booster" text
);
--> statement-breakpoint
CREATE TABLE "nasi_goreng"."plate" (
	"id" uuid PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"index" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nasi_goreng"."fried_rice" (
	"id" uuid PRIMARY KEY NOT NULL,
	"plate_id" uuid NOT NULL,
	"tool_id" uuid NOT NULL,
	"name" text NOT NULL,
	"raw_image" text NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL,
	"raw_x_coordinate" integer NOT NULL,
	"raw_y_coordinate" integer NOT NULL,
	"raw_layer_number" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nasi_goreng"."tool" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"long_description" text NOT NULL,
	"short_description" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nasi_goreng"."ingredient_tool" (
	"id" uuid PRIMARY KEY NOT NULL,
	"result_id" uuid NOT NULL,
	"tool_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nasi_goreng"."relic" (
	"id" uuid PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"name" text NOT NULL,
	"tool_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pizza_frenzy"."topping" (
	"id" uuid PRIMARY KEY NOT NULL,
	"general_name" text NOT NULL,
	"image" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pizza_frenzy"."topping_upgrade" (
	"id" uuid PRIMARY KEY NOT NULL,
	"topping_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL,
	"level" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hayday"."truck_order_detail" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_id" uuid NOT NULL,
	"truck_order_header_id" uuid NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nasi_goreng"."fried_rice_level" (
	"id" uuid PRIMARY KEY NOT NULL,
	"fried_rice_id" uuid NOT NULL,
	"level" integer NOT NULL,
	"image" text NOT NULL,
	"fried_rices_needed" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nasi_goreng"."fried_rice_recipe" (
	"id" uuid PRIMARY KEY NOT NULL,
	"fried_rice_id" uuid NOT NULL,
	"ingredient_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nasi_goreng"."fried_rice_level_detail" (
	"id" uuid PRIMARY KEY NOT NULL,
	"fried_rice_level_id" uuid NOT NULL,
	"upgrade_id" uuid NOT NULL,
	"x_coordinate" integer NOT NULL,
	"y_coordinate" integer NOT NULL,
	"layer_number" integer NOT NULL,
	"flip_image_type" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nasi_goreng"."upgrade" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nasi_goreng"."fried_rice_level_recipe" (
	"id" uuid PRIMARY KEY NOT NULL,
	"fried_rice_level_id" uuid NOT NULL,
	"ingredient_id" uuid NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cygnus"."crop_grade" ADD CONSTRAINT "FK_crop_grade_crop_crop_id" FOREIGN KEY ("crop_id") REFERENCES "cygnus"."crop"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction"."expense_detail" ADD CONSTRAINT "FK_expense_detail_expense_header_expense_header_id" FOREIGN KEY ("expense_header_id") REFERENCES "transaction"."expense_header"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cygnus"."forage_grade" ADD CONSTRAINT "FK_forage_grade_forage_forage_id" FOREIGN KEY ("forage_id") REFERENCES "cygnus"."forage"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nasi_goreng"."ingredient_recipe" ADD CONSTRAINT "FK_ingredient_recipe_ingredient_ingredient_needed_id" FOREIGN KEY ("ingredient_needed_id") REFERENCES "nasi_goreng"."ingredient"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nasi_goreng"."ingredient_recipe" ADD CONSTRAINT "FK_ingredient_recipe_ingredient_result_id" FOREIGN KEY ("result_id") REFERENCES "nasi_goreng"."ingredient"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hayday"."ingredient" ADD CONSTRAINT "FK_ingredient_product_ingredient_id" FOREIGN KEY ("ingredient_id") REFERENCES "hayday"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hayday"."ingredient" ADD CONSTRAINT "FK_ingredient_product_product_id" FOREIGN KEY ("product_id") REFERENCES "hayday"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hayday"."producer" ADD CONSTRAINT "FK_producer_building_building_id" FOREIGN KEY ("building_id") REFERENCES "hayday"."building"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hayday"."producer" ADD CONSTRAINT "FK_producer_product_product_id" FOREIGN KEY ("product_id") REFERENCES "hayday"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hayday"."truck_order_header" ADD CONSTRAINT "FK_truck_order_header_product_bonus_product_id" FOREIGN KEY ("bonus_product_id") REFERENCES "hayday"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nasi_goreng"."fried_rice" ADD CONSTRAINT "FK_fried_rice_plate_plate_id" FOREIGN KEY ("plate_id") REFERENCES "nasi_goreng"."plate"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nasi_goreng"."fried_rice" ADD CONSTRAINT "FK_fried_rice_tool_tool_id" FOREIGN KEY ("tool_id") REFERENCES "nasi_goreng"."tool"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nasi_goreng"."ingredient_tool" ADD CONSTRAINT "FK_ingredient_tool_ingredient_result_id" FOREIGN KEY ("result_id") REFERENCES "nasi_goreng"."ingredient"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nasi_goreng"."ingredient_tool" ADD CONSTRAINT "FK_ingredient_tool_tool_tool_id" FOREIGN KEY ("tool_id") REFERENCES "nasi_goreng"."tool"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nasi_goreng"."relic" ADD CONSTRAINT "FK_relic_tool_tool_id" FOREIGN KEY ("tool_id") REFERENCES "nasi_goreng"."tool"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pizza_frenzy"."topping_upgrade" ADD CONSTRAINT "FK_topping_upgrade_topping_topping_id" FOREIGN KEY ("topping_id") REFERENCES "pizza_frenzy"."topping"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hayday"."truck_order_detail" ADD CONSTRAINT "FK_truck_order_detail_product_product_id" FOREIGN KEY ("product_id") REFERENCES "hayday"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hayday"."truck_order_detail" ADD CONSTRAINT "FK_truck_order_detail_truck_order_header_truck_order_header_id" FOREIGN KEY ("truck_order_header_id") REFERENCES "hayday"."truck_order_header"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nasi_goreng"."fried_rice_level" ADD CONSTRAINT "FK_fried_rice_level_fried_rice_fried_rice_id" FOREIGN KEY ("fried_rice_id") REFERENCES "nasi_goreng"."fried_rice"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nasi_goreng"."fried_rice_recipe" ADD CONSTRAINT "FK_fried_rice_recipe_fried_rice_fried_rice_id" FOREIGN KEY ("fried_rice_id") REFERENCES "nasi_goreng"."fried_rice"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nasi_goreng"."fried_rice_recipe" ADD CONSTRAINT "FK_fried_rice_recipe_ingredient_ingredient_id" FOREIGN KEY ("ingredient_id") REFERENCES "nasi_goreng"."ingredient"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nasi_goreng"."fried_rice_level_detail" ADD CONSTRAINT "FK_fried_rice_level_detail_fried_rice_level_fried_rice_level_id" FOREIGN KEY ("fried_rice_level_id") REFERENCES "nasi_goreng"."fried_rice_level"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nasi_goreng"."fried_rice_level_detail" ADD CONSTRAINT "FK_fried_rice_level_detail_upgrade_upgrade_id" FOREIGN KEY ("upgrade_id") REFERENCES "nasi_goreng"."upgrade"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nasi_goreng"."fried_rice_level_recipe" ADD CONSTRAINT "FK_fried_rice_level_recipe_fried_rice_level_fried_rice_level_id" FOREIGN KEY ("fried_rice_level_id") REFERENCES "nasi_goreng"."fried_rice_level"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nasi_goreng"."fried_rice_level_recipe" ADD CONSTRAINT "FK_fried_rice_level_recipe_ingredient_ingredient_id" FOREIGN KEY ("ingredient_id") REFERENCES "nasi_goreng"."ingredient"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "IX_bus_route_bus_stop_code" ON "transjakarta"."bus_route" USING btree ("bus_stop_code" int4_ops);--> statement-breakpoint
CREATE INDEX "IX_bus_route_corridor_code" ON "transjakarta"."bus_route" USING btree ("corridor_code" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "IX_bus_stop_code" ON "transjakarta"."bus_stop" USING btree ("code" int4_ops);--> statement-breakpoint
CREATE INDEX "IX_bus_stop_name" ON "transjakarta"."bus_stop" USING btree ("name" text_ops);--> statement-breakpoint
CREATE INDEX "IX_corridor_category" ON "transjakarta"."corridor" USING btree ("category" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "IX_corridor_code" ON "transjakarta"."corridor" USING btree ("code" text_ops);--> statement-breakpoint
CREATE INDEX "IX_corridor_name" ON "transjakarta"."corridor" USING btree ("name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "IX_corridor_style_code" ON "transjakarta"."corridor_style" USING btree ("code" text_ops);--> statement-breakpoint
CREATE INDEX "IX_schedule_detail_code" ON "transjakarta"."schedule_detail" USING btree ("code" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "IX_schedule_header_code" ON "transjakarta"."schedule_header" USING btree ("code" text_ops);--> statement-breakpoint
CREATE INDEX "IX_crop_grade_crop_id" ON "cygnus"."crop_grade" USING btree ("crop_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_expense_detail_expense_header_id" ON "transaction"."expense_detail" USING btree ("expense_header_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_forage_grade_forage_id" ON "cygnus"."forage_grade" USING btree ("forage_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_ingredient_recipe_ingredient_needed_id" ON "nasi_goreng"."ingredient_recipe" USING btree ("ingredient_needed_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_ingredient_recipe_result_id" ON "nasi_goreng"."ingredient_recipe" USING btree ("result_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_product_category" ON "hayday"."product" USING btree ("category" text_ops);--> statement-breakpoint
CREATE INDEX "IX_product_is_raw" ON "hayday"."product" USING btree ("is_raw" bool_ops);--> statement-breakpoint
CREATE INDEX "IX_product_level" ON "hayday"."product" USING btree ("level" int4_ops);--> statement-breakpoint
CREATE INDEX "IX_product_name" ON "hayday"."product" USING gin ("name" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX "IX_product_price" ON "hayday"."product" USING btree ("price" float8_ops);--> statement-breakpoint
CREATE INDEX "IX_product_time" ON "hayday"."product" USING btree ("time" int4_ops);--> statement-breakpoint
CREATE INDEX "IX_product_xp" ON "hayday"."product" USING btree ("xp" int4_ops);--> statement-breakpoint
CREATE INDEX "IX_ingredient_ingredient_id" ON "hayday"."ingredient" USING btree ("ingredient_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_ingredient_product_id" ON "hayday"."ingredient" USING btree ("product_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_producer_building_id" ON "hayday"."producer" USING btree ("building_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "IX_producer_product_id" ON "hayday"."producer" USING btree ("product_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_truck_order_header_bonus_product_id" ON "hayday"."truck_order_header" USING btree ("bonus_product_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_truck_order_header_client_name" ON "hayday"."truck_order_header" USING btree ("client_name" text_ops);--> statement-breakpoint
CREATE INDEX "IX_truck_order_header_order_status" ON "hayday"."truck_order_header" USING btree ("order_status" int4_ops);--> statement-breakpoint
CREATE INDEX "IX_truck_order_header_voucher" ON "hayday"."truck_order_header" USING btree ("voucher" int4_ops);--> statement-breakpoint
CREATE INDEX "IX_fried_rice_plate_id" ON "nasi_goreng"."fried_rice" USING btree ("plate_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_fried_rice_tool_id" ON "nasi_goreng"."fried_rice" USING btree ("tool_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "IX_ingredient_tool_result_id" ON "nasi_goreng"."ingredient_tool" USING btree ("result_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_ingredient_tool_tool_id" ON "nasi_goreng"."ingredient_tool" USING btree ("tool_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_relic_tool_id" ON "nasi_goreng"."relic" USING btree ("tool_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_topping_upgrade_topping_id" ON "pizza_frenzy"."topping_upgrade" USING btree ("topping_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_truck_order_detail_product_id" ON "hayday"."truck_order_detail" USING btree ("product_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_truck_order_detail_truck_order_header_id" ON "hayday"."truck_order_detail" USING btree ("truck_order_header_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_fried_rice_level_fried_rice_id" ON "nasi_goreng"."fried_rice_level" USING btree ("fried_rice_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_fried_rice_recipe_fried_rice_id" ON "nasi_goreng"."fried_rice_recipe" USING btree ("fried_rice_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_fried_rice_recipe_ingredient_id" ON "nasi_goreng"."fried_rice_recipe" USING btree ("ingredient_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_fried_rice_level_detail_fried_rice_level_id" ON "nasi_goreng"."fried_rice_level_detail" USING btree ("fried_rice_level_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_fried_rice_level_detail_upgrade_id" ON "nasi_goreng"."fried_rice_level_detail" USING btree ("upgrade_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_fried_rice_level_recipe_fried_rice_level_id" ON "nasi_goreng"."fried_rice_level_recipe" USING btree ("fried_rice_level_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "IX_fried_rice_level_recipe_ingredient_id" ON "nasi_goreng"."fried_rice_level_recipe" USING btree ("ingredient_id" uuid_ops);
*/