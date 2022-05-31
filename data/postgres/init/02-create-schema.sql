\connect overrated

---
--- Create the tables in the database
---

DROP TABLE if exists public.profiles;

CREATE TABLE public.profiles (
    id serial NOT NULL PRIMARY KEY,
    username character varying(100) NOT NULL UNIQUE,
    password character varying(50) NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    location character varying(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    photo text,
    about text,
    job character varying(50),
    education character varying(100),
    gender character varying(50),
    sexual_orientation character varying(50),
    religion character varying(50),
    ethnicity character varying(50),
    pronouns character varying(50)
);
