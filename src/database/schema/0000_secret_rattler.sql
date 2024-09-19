-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
	"MigrationId" varchar(150) PRIMARY KEY NOT NULL,
	"ProductVersion" varchar(32) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "farm_frenzy_one_product" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "farm_frenzy_three_product" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "farm_frenzy_two_pizza_product" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "farm_frenzy_two_product" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nasi_goreng_burned_food" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"category" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "the_sims_castaway_product" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"eaten_raw" boolean NOT NULL,
	"hunger" integer NOT NULL,
	"bladder" integer NOT NULL,
	"energy" integer NOT NULL,
	"category" varchar(255) NOT NULL,
	"description" varchar(4000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hayday_product" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"category" varchar(255) NOT NULL,
	"price" double precision NOT NULL,
	"is_raw" boolean NOT NULL,
	"time" integer NOT NULL,
	"level" integer NOT NULL,
	"xp" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hayday_ingredient" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_id" uuid NOT NULL,
	"ingredient_id" uuid NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hayday_building" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"price" integer NOT NULL,
	"level" integer NOT NULL,
	"time" integer NOT NULL,
	"xp" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hayday_producer" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_id" uuid NOT NULL,
	"building_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nasi_goreng_ingredient" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"description" varchar(4000) NOT NULL,
	"is_processed" boolean NOT NULL,
	"price" integer NOT NULL,
	"category" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nasi_goreng_ingredient_recipe" (
	"id" uuid PRIMARY KEY NOT NULL,
	"result_id" uuid NOT NULL,
	"ingredient_needed_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nasi_goreng_plate" (
	"id" uuid PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"index" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nasi_goreng_fried_rice" (
	"id" uuid PRIMARY KEY NOT NULL,
	"plate_id" uuid NOT NULL,
	"tool_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"raw_image" text NOT NULL,
	"description" varchar(4000) NOT NULL,
	"price" integer NOT NULL,
	"raw_x_coordinate" integer NOT NULL,
	"raw_y_coordinate" integer NOT NULL,
	"raw_layer_number" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nasi_goreng_tool" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"long_description" varchar(4000) NOT NULL,
	"short_description" varchar(4000) NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nasi_goreng_ingredient_tool" (
	"id" uuid PRIMARY KEY NOT NULL,
	"result_id" uuid NOT NULL,
	"tool_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nasi_goreng_relic" (
	"id" uuid PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"name" varchar(255) NOT NULL,
	"tool_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pizza_frenzy_topping" (
	"id" uuid PRIMARY KEY NOT NULL,
	"general_name" varchar(255) NOT NULL,
	"image" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pizza_frenzy_topping_upgrade" (
	"id" uuid PRIMARY KEY NOT NULL,
	"topping_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(4000) NOT NULL,
	"price" integer NOT NULL,
	"level" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nasi_goreng_fried_rice_level" (
	"id" uuid PRIMARY KEY NOT NULL,
	"fried_rice_id" uuid NOT NULL,
	"level" integer NOT NULL,
	"image" text NOT NULL,
	"fried_rices_needed" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nasi_goreng_fried_rice_level_detail" (
	"id" uuid PRIMARY KEY NOT NULL,
	"fried_rice_level_id" uuid NOT NULL,
	"upgrade_id" uuid NOT NULL,
	"x_coordinate" integer NOT NULL,
	"y_coordinate" integer NOT NULL,
	"layer_number" integer NOT NULL,
	"flip_image_type" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nasi_goreng_upgrade" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nasi_goreng_fried_rice_level_recipe" (
	"id" uuid PRIMARY KEY NOT NULL,
	"fried_rice_level_id" uuid NOT NULL,
	"ingredient_id" uuid NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nasi_goreng_fried_rice_recipe" (
	"id" uuid PRIMARY KEY NOT NULL,
	"fried_rice_id" uuid NOT NULL,
	"ingredient_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "the_sims_bustin_out_career" (
	"id" uuid PRIMARY KEY NOT NULL,
	"career" varchar(255) NOT NULL,
	"level" integer NOT NULL,
	"job" varchar(255) NOT NULL,
	"description" varchar(4000) NOT NULL,
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
CREATE TABLE IF NOT EXISTS "the_sims_two_console_career" (
	"id" uuid PRIMARY KEY NOT NULL,
	"career" varchar(255) NOT NULL,
	"level" integer NOT NULL,
	"job" varchar(255) NOT NULL,
	"description" varchar(4000) NOT NULL,
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
CREATE TABLE IF NOT EXISTS "the_sims_two_pets_console_career" (
	"id" uuid PRIMARY KEY NOT NULL,
	"career" varchar(255) NOT NULL,
	"level" integer NOT NULL,
	"job" varchar(255) NOT NULL,
	"description" varchar(4000) NOT NULL,
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
CREATE TABLE IF NOT EXISTS "the_sims_four_pc_harvestable" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" varchar(4000) NOT NULL,
	"rarity" integer NOT NULL,
	"base_value" integer NOT NULL,
	"perfect_value" integer NOT NULL,
	"growth_rate" double precision NOT NULL,
	"form" varchar(255) NOT NULL,
	"vertical_garden" boolean NOT NULL,
	"description" varchar(4000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "the_sims_two_pets_console_product" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"category" varchar(255) NOT NULL,
	"energy" integer NOT NULL,
	"hunger" integer NOT NULL,
	"bladder" integer NOT NULL,
	"description" varchar(4000) NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "master_table_category" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"prefix" varchar(255) NOT NULL,
	"owner" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transjakarta_bus_route" (
	"id" uuid PRIMARY KEY NOT NULL,
	"corridor_code" text NOT NULL,
	"bus_stop_code" integer NOT NULL,
	"direction" varchar(2) NOT NULL,
	"order" integer NOT NULL,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transjakarta_bus_route_history" (
	"id" uuid PRIMARY KEY NOT NULL,
	"corridor_code" text NOT NULL,
	"bus_stop_code" integer NOT NULL,
	"direction" varchar(2) NOT NULL,
	"order" integer NOT NULL,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transjakarta_corridor_history" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" varchar(32) NOT NULL,
	"category" varchar(255) NOT NULL,
	"name" varchar(4000) NOT NULL,
	"image" text NOT NULL,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transjakarta_corridor_style" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" varchar(32) NOT NULL,
	"hex_color" varchar(6) NOT NULL,
	"font_size" integer NOT NULL,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transjakarta_corridor_style_history" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" varchar(32) NOT NULL,
	"hex_color" varchar(6) NOT NULL,
	"font_size" integer NOT NULL,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transjakarta_schedule_detail" (
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
CREATE TABLE IF NOT EXISTS "transjakarta_schedule_detail_history" (
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
CREATE TABLE IF NOT EXISTS "transjakarta_schedule_header" (
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
CREATE TABLE IF NOT EXISTS "transjakarta_corridor" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" varchar(32) NOT NULL,
	"category" varchar(255) NOT NULL,
	"name" varchar(4000) NOT NULL,
	"image" text NOT NULL,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL,
	"picture_effective_date" date DEFAULT '-infinity' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transjakarta_bus_stop" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" integer NOT NULL,
	"name" varchar(4000) NOT NULL,
	"brt" boolean NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"link" text NOT NULL,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL,
	"permanently_closed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transjakarta_bus_stop_history" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" integer NOT NULL,
	"name" varchar(4000) NOT NULL,
	"brt" boolean NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"link" text NOT NULL,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL,
	"permanently_closed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transjakarta_schedule_header_history" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" varchar(32) NOT NULL,
	"weekday" boolean NOT NULL,
	"weekend" boolean NOT NULL,
	"day" boolean NOT NULL,
	"night" boolean NOT NULL,
	"peak_day" boolean NOT NULL,
	"peak_evening" boolean NOT NULL,
	"day_start" date NOT NULL,
	"day_end" date NOT NULL,
	"effective_date" date NOT NULL,
	"is_deleted" boolean NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hayday_ingredient" ADD CONSTRAINT "FK_hayday_ingredient_hayday_product_ingredient_id" FOREIGN KEY ("ingredient_id") REFERENCES "public"."hayday_product"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hayday_ingredient" ADD CONSTRAINT "FK_hayday_ingredient_hayday_product_product_id" FOREIGN KEY ("product_id") REFERENCES "public"."hayday_product"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hayday_producer" ADD CONSTRAINT "FK_hayday_producer_hayday_building_building_id" FOREIGN KEY ("building_id") REFERENCES "public"."hayday_building"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hayday_producer" ADD CONSTRAINT "FK_hayday_producer_hayday_product_product_id" FOREIGN KEY ("product_id") REFERENCES "public"."hayday_product"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nasi_goreng_ingredient_recipe" ADD CONSTRAINT "FK_nasi_goreng_ingredient_recipe_nasi_goreng_ingredient_ingred~" FOREIGN KEY ("ingredient_needed_id") REFERENCES "public"."nasi_goreng_ingredient"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nasi_goreng_ingredient_recipe" ADD CONSTRAINT "FK_nasi_goreng_ingredient_recipe_nasi_goreng_ingredient_result~" FOREIGN KEY ("result_id") REFERENCES "public"."nasi_goreng_ingredient"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nasi_goreng_fried_rice" ADD CONSTRAINT "FK_nasi_goreng_fried_rice_nasi_goreng_plate_plate_id" FOREIGN KEY ("plate_id") REFERENCES "public"."nasi_goreng_plate"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nasi_goreng_fried_rice" ADD CONSTRAINT "FK_nasi_goreng_fried_rice_nasi_goreng_tool_tool_id" FOREIGN KEY ("tool_id") REFERENCES "public"."nasi_goreng_tool"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nasi_goreng_ingredient_tool" ADD CONSTRAINT "FK_nasi_goreng_ingredient_tool_nasi_goreng_ingredient_result_id" FOREIGN KEY ("result_id") REFERENCES "public"."nasi_goreng_ingredient"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nasi_goreng_ingredient_tool" ADD CONSTRAINT "FK_nasi_goreng_ingredient_tool_nasi_goreng_tool_tool_id" FOREIGN KEY ("tool_id") REFERENCES "public"."nasi_goreng_tool"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nasi_goreng_relic" ADD CONSTRAINT "FK_nasi_goreng_relic_nasi_goreng_tool_tool_id" FOREIGN KEY ("tool_id") REFERENCES "public"."nasi_goreng_tool"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pizza_frenzy_topping_upgrade" ADD CONSTRAINT "FK_pizza_frenzy_topping_upgrade_pizza_frenzy_topping_topping_id" FOREIGN KEY ("topping_id") REFERENCES "public"."pizza_frenzy_topping"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nasi_goreng_fried_rice_level" ADD CONSTRAINT "FK_nasi_goreng_fried_rice_level_nasi_goreng_fried_rice_fried_r~" FOREIGN KEY ("fried_rice_id") REFERENCES "public"."nasi_goreng_fried_rice"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nasi_goreng_fried_rice_level_detail" ADD CONSTRAINT "FK_nasi_goreng_fried_rice_level_detail_nasi_goreng_fried_rice_~" FOREIGN KEY ("fried_rice_level_id") REFERENCES "public"."nasi_goreng_fried_rice_level"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nasi_goreng_fried_rice_level_detail" ADD CONSTRAINT "FK_nasi_goreng_fried_rice_level_detail_nasi_goreng_upgrade_upg~" FOREIGN KEY ("upgrade_id") REFERENCES "public"."nasi_goreng_upgrade"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nasi_goreng_fried_rice_level_recipe" ADD CONSTRAINT "FK_nasi_goreng_fried_rice_level_recipe_nasi_goreng_fried_rice_~" FOREIGN KEY ("fried_rice_level_id") REFERENCES "public"."nasi_goreng_fried_rice_level"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nasi_goreng_fried_rice_level_recipe" ADD CONSTRAINT "FK_nasi_goreng_fried_rice_level_recipe_nasi_goreng_ingredient_~" FOREIGN KEY ("ingredient_id") REFERENCES "public"."nasi_goreng_ingredient"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nasi_goreng_fried_rice_recipe" ADD CONSTRAINT "FK_nasi_goreng_fried_rice_recipe_nasi_goreng_fried_rice_fried_~" FOREIGN KEY ("fried_rice_id") REFERENCES "public"."nasi_goreng_fried_rice"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nasi_goreng_fried_rice_recipe" ADD CONSTRAINT "FK_nasi_goreng_fried_rice_recipe_nasi_goreng_ingredient_ingred~" FOREIGN KEY ("ingredient_id") REFERENCES "public"."nasi_goreng_ingredient"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_hayday_ingredient_ingredient_id" ON "hayday_ingredient" USING btree ("ingredient_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_hayday_ingredient_product_id" ON "hayday_ingredient" USING btree ("product_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_hayday_producer_building_id" ON "hayday_producer" USING btree ("building_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "IX_hayday_producer_product_id" ON "hayday_producer" USING btree ("product_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_nasi_goreng_ingredient_recipe_ingredient_needed_id" ON "nasi_goreng_ingredient_recipe" USING btree ("ingredient_needed_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_nasi_goreng_ingredient_recipe_result_id" ON "nasi_goreng_ingredient_recipe" USING btree ("result_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_nasi_goreng_fried_rice_plate_id" ON "nasi_goreng_fried_rice" USING btree ("plate_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_nasi_goreng_fried_rice_tool_id" ON "nasi_goreng_fried_rice" USING btree ("tool_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "IX_nasi_goreng_ingredient_tool_result_id" ON "nasi_goreng_ingredient_tool" USING btree ("result_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_nasi_goreng_ingredient_tool_tool_id" ON "nasi_goreng_ingredient_tool" USING btree ("tool_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_nasi_goreng_relic_tool_id" ON "nasi_goreng_relic" USING btree ("tool_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_pizza_frenzy_topping_upgrade_topping_id" ON "pizza_frenzy_topping_upgrade" USING btree ("topping_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_nasi_goreng_fried_rice_level_fried_rice_id" ON "nasi_goreng_fried_rice_level" USING btree ("fried_rice_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_nasi_goreng_fried_rice_level_detail_fried_rice_level_id" ON "nasi_goreng_fried_rice_level_detail" USING btree ("fried_rice_level_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_nasi_goreng_fried_rice_level_detail_upgrade_id" ON "nasi_goreng_fried_rice_level_detail" USING btree ("upgrade_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_nasi_goreng_fried_rice_level_recipe_fried_rice_level_id" ON "nasi_goreng_fried_rice_level_recipe" USING btree ("fried_rice_level_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_nasi_goreng_fried_rice_level_recipe_ingredient_id" ON "nasi_goreng_fried_rice_level_recipe" USING btree ("ingredient_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_nasi_goreng_fried_rice_recipe_fried_rice_id" ON "nasi_goreng_fried_rice_recipe" USING btree ("fried_rice_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_nasi_goreng_fried_rice_recipe_ingredient_id" ON "nasi_goreng_fried_rice_recipe" USING btree ("ingredient_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "IX_transjakarta_corridor_style_code" ON "transjakarta_corridor_style" USING btree ("code" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IX_transjakarta_schedule_detail_code" ON "transjakarta_schedule_detail" USING btree ("code" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "IX_transjakarta_schedule_header_code" ON "transjakarta_schedule_header" USING btree ("code" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "IX_transjakarta_corridor_code" ON "transjakarta_corridor" USING btree ("code" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "IX_transjakarta_bus_stop_code" ON "transjakarta_bus_stop" USING btree ("code" int4_ops);
*/