CREATE TABLE IF NOT EXISTS "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"plaid_id" text,
	"name" text NOT NULL,
	"phone" varchar(256),
	"email" text,
	"password" text,
	"user_id" text NOT NULL
);
