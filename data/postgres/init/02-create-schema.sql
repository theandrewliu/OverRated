\connect overrated

---
--- Create the tables in the database
---

DROP TABLE if exists public.profiles;

CREATE TABLE public.profiles (
    id serial NOT NULL PRIMARY KEY,
    username character varying(100) NOT NULL UNIQUE,
    email character varying(50) NOT NULL UNIQUE,
    password character varying(60) NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    location character varying(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    photo text,
    about text,
    height int,
    job character varying(50),
    education character varying(100),
    gender character varying(50),
    sexual_orientation character varying(50),
    religion character varying(50),
    ethnicity character varying(50),
    pronouns character varying(50)
);

-- education [0:highschool, 1:Associates, 2:Bachelors, 3:Masters, 4: PhD]
-- gender [0:Male, 1:Female, 2:Other]
-- sexual orientation [0:Straight, 1:Gay, 2:Bi, 3:Pansexual]
-- interested in [0:Male, 1:Female, 2:Other]
-- [M4M, M4F, M4O, F4M, F4F, F4O, O4M, O4F, O4O]
-- Straight M looks for F | Straight F looks for M | Gay M looks for M | Gay F looks F | Bi M looks for both M and F | Bi F looks for both M and F |

---
--- Create an interested table for gender each user is filtering for
---

CREATE TABLE public.interested (
    id serial NOT NULL PRIMARY KEY,
    profile_id int NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    interest character varying(50) NOT NULL
);

CREATE TABLE public.liked (
    id serial NOT NULL PRIMARY KEY,
    active_user int NOT NULL,
    target_user int NOT NULL,
    liked boolean
);

CREATE TABLE public.matches (
    id serial NOT NULL PRIMARY KEY,
    user1 int NOT NULL,
    user2 int NOT NULL,
    created_on TIMESTAMP NOT NULL
);

CREATE TABLE public.chats (
    id serial NOT NULL PRIMARY KEY,
    match_id int NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
    sender int NOT NULL,
    recipient int NOT NULL,
    sent TIMESTAMP NOT NULL,
    message text NOT NULL
);

CREATE TABLE public.ratings (
    id serial NOT NULL PRIMARY KEY,
    rating int NOT NULL,
    rating_of int NOT NULL,
    rating_by int NOT NULL,
    review text 
);
