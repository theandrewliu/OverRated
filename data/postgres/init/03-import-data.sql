\connect overrated

--
-- Data for Name: profiles; Type: TABLE DATA
---


INSERT INTO public.profiles (username, email, password, first_name, last_name, location, date_of_birth, photo, about, height, job, education, gender, sexual_orientation, religion, ethnicity, pronouns)
    VALUES
    ('user1','andrew@gmail.com', 'password', 'Andrew', 'Liu', 'Los Angeles', '07-22-1994', NULL, 'cool guy', '183', 'codemonkey', 'M.S.', 'male', 'straight', 'none', 'Chinese', 'He'),
    ('user2', 'yesenia@gmail.com', 'password', 'Yesenia', 'Ramirez', 'Austin', '04-14-1992', NULL, 'cool girl', '140', 'codemonkey', 'hack reactor', 'female', 'straight', 'Astrology', 'Hispanic', 'She'),
    ('user3', 'corey@gmail.com', 'password', 'Corey', 'Edwards', 'Los Angeles', '04-20-1969', NULL, 'alright guy', '140', 'codemonkey', 'hack reactor', 'male', 'straight', 'none', 'Caucasian', 'He'),
    ('user4', 'jeremy@gmail.com', 'password', 'Jeremy', 'Mao', 'Austin', '04-14-1992', NULL, 'cool dude', '140', 'codemonkey', 'hack reactor', 'male', 'straight', 'none', 'Chinese', 'He'),
    ('user5', 'jaylon@gmail.com', 'password', 'Jaylon', 'Delgado', 'Reno', '04-14-1992', NULL, 'some guy', '140', 'funemployed', 'hack reactor', 'male', 'straight', 'Astrology', 'Hispanic', 'He'),
    ('user6', 'cise@gmail.com', 'password', 'Cise', 'Babatasi', 'San Francisco', '08-14-1992', NULL, 'cool girl', '100', 'N/A', 'hack reactor', 'female', 'straight', 'Astrology', 'Turkish', 'She'),
    ('user7', 'cindy@gmail.com', 'password', 'Cindy', 'Luo', 'San Francisco', '06-01-1991', NULL, 'engaged girl', '120', 'codemonkey', 'hack reactor', 'female', 'straight', 'Astrology', 'Chinese', 'She');

INSERT INTO public.interested (profile_id, interest)
    VALUES
    ('1', 'female'),
    ('2', 'male'),
    ('2', 'female'),
    ('3', 'female'),
    ('4', 'female'),
    ('5', 'female'),
    ('5', 'male'),
    ('5', 'other'),
    ('6', 'male'),
    ('6', 'other'),
    ('7', 'other'),
    ('7', 'male'),
    ('7', 'female');
    