CREATE TABLE users (
  "_id" serial NOT NULL PRIMARY KEY,
  "name" varchar NOT NULL,
  "email" varchar NOT NULL UNIQUE,
  "password" varchar NOT NULL
);


CREATE TABLE sessions (
  "_id" serial NOT NULL PRIMARY KEY,
  "user_id" bigint NOT NULL,
  "ssid" varchar NOT NULL,
  "created" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "sessions_fk0"
    FOREIGN KEY ("user_id")
      REFERENCES users("_id")
);


CREATE TABLE applications (
  "_id" serial NOT NULL PRIMARY KEY,
  "user_id" bigint NOT NULL,
  "title" varchar NOT NULL,
  "company_name" varchar NOT NULL,
  "location" varchar NOT NULL,
  "description" varchar NOT NULL,
  "link" varchar NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "archived" boolean NOT NULL DEFAULT FALSE,
  CONSTRAINT "applications_fk0"
    FOREIGN KEY ("user_id")
      REFERENCES users("_id")
);


CREATE TABLE notes (
  "_id" serial NOT NULL PRIMARY KEY,
  "user_id" bigint NOT NULL,
  "applications_id" bigint NOT NULL,
  "content" text NOT NULL,
  CONSTRAINT "notes_fk0"
    FOREIGN KEY ("user_id")
      REFERENCES users("_id"),
  CONSTRAINT "notes_fk1"
    FOREIGN KEY ("applications_id")
      REFERENCES applications("_id")
);


CREATE TABLE todos (
  "_id" serial NOT NULL PRIMARY KEY,
  "user_id" bigint NOT NULL,
  "applications_id" bigint NOT NULL,
  "content" text NOT NULL,
  "checked" boolean NOT NULL DEFAULT FALSE,
  CONSTRAINT "todos_fk0"
    FOREIGN KEY("user_id")
      REFERENCES users("_id"),
  CONSTRAINT "todos_fk1"
    FOREIGN KEY("applications_id")
      REFERENCES applications("_id")
);

-- Add a Test user
INSERT INTO users (name, email, password) VALUES ('TestUser', 'test@gmail.com', '12345');
