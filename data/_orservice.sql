

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;


CREATE TABLE public.profiles (
    id integer NOT NULL PRIMARY KEY,
    username character varying(100) NOT NULL UNIQUE,
    password character varying(50) NOT NULL

);



CREATE SEQUENCE public.profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE 
    CACHE 1;



ALTER SEQUENCE public.profiles_id_seq OWNED BY public.profiles.id;



ALTER TABLE ONLY public.profiles ALTER COLUMN id SET DEFAULT nextval('public.profiles_id_seq'::regclass);


COPY public.profiles (id, username, password) FROM stdin;
1	"!"	"t"
2	"&"	"t"
3	"$"	"t"
\.


SELECT pg_catalog.setval('public.profiles_id_seq', 3, true);


ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


SELECT SETVAL('public.profiles_id_seq', COALESCE(MAX(id), 1)) FROM public.profiles;