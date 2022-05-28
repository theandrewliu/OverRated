--
-- PostgreSQL database dump
--

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

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: orservice
--

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

--
-- Name: profiles_id_seq; TYPE: SEQUENCE; Schema: public; Owner: orservice
--

-- CREATE SEQUENCE profiles_id_seq
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE 
--     CACHE 1;


--
-- Name: profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: orservice
--

-- ALTER SEQUENCE profiles_id_seq OWNED BY profiles.id;


--
-- Name: profiles id; Type: DEFAULT; Schema: public; Owner: orservice
--

-- ALTER TABLE ONLY public.profiles ALTER COLUMN id SET DEFAULT nextval('public.profiles_id_seq'::regclass);

-- INSERT INTO profiles (username, password, first_name, last_name, location)
--     VALUES ('user4', 'andrew', 'Andrew', 'Liu', 'Los Angeles');


INSERT INTO public.profiles (username, password, first_name, last_name, location, date_of_birth, photo, about, job, education, gender, sexual_orientation, religion, ethnicity, pronouns)
    VALUES('user4',	'andrew', 'Andrew', 'Liu', 'Los Angeles', '07-22-1994', NULL, 'cool guy', 'codemonkey', 'hack reactor', 'male', 'straight', 'none', 'Chinese', 'He');	

--
-- Name: public.profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: orservice
--

-- SELECT pg_catalog.setval('public.profiles_id_seq', 3, true);

--
-- Name: profiles public.profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: orservice
--

-- ALTER TABLE ONLY public.profiles
--     ADD CONSTRAINT public.profiles_pkey PRIMARY KEY (id);

--
-- Update sequences
--
-- SELECT SETVAL('public.profiles_id_seq', COALESCE(MAX(id), 1)) FROM public.profiles;