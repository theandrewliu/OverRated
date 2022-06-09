\connect overrated

--
-- Data for Name: profiles; Type: TABLE DATA
---


INSERT INTO public.profiles (username, email, password, first_name, last_name, location, date_of_birth, photo, about, height, job, education, gender, sexual_orientation, religion, ethnicity, pronouns)
    VALUES
    ('user1','andrew@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Andrew', 'Liu', 'Los Angeles', '07-22-1994', NULL, 'cool guy', '183', 'codemonkey', 'M.S.', 'male', 'straight', 'none', 'Chinese', 'He'),
    ('user2', 'yesenia@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Yesenia', 'Ramirez', 'Austin', '04-14-1992', 'https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg', 'cool girl', '140', 'codemonkey', 'hack reactor', 'female', 'straight', 'Astrology', 'Hispanic', 'She'),
    ('user3', 'corey@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Corey', 'Edwards', 'Los Angeles', '04-20-1969', NULL, 'alright guy', '140', 'codemonkey', 'hack reactor', 'male', 'straight', 'none', 'Caucasian', 'He'),
    ('user4', 'jeremy@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Jeremy', 'Mao', 'Austin', '04-14-1992', NULL, 'cool dude', '140', 'codemonkey', 'hack reactor', 'male', 'straight', 'none', 'Chinese', 'He'),
    ('user5', 'jaylon@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Jaylon', 'Delgado', 'Reno', '04-14-1992', NULL, 'some guy', '140', 'funemployed', 'hack reactor', 'male', 'straight', 'Astrology', 'Hispanic', 'He'),
    ('user6', 'cise@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Cise', 'Babatasi', 'San Francisco', '08-14-1992', 'https://img.freepik.com/free-photo/indoor-shot-beautiful-happy-african-american-woman-smiling-cheerfully-keeping-her-arms-folded-relaxing-indoors-after-morning-lectures-university_273609-1270.jpg', 'cool girl', '100', 'N/A', 'hack reactor', 'female', 'straight', 'Astrology', 'Turkish', 'She'),
    ('user7', 'cindy@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Cindy', 'Luo', 'San Francisco', '06-01-1991', NULL, 'engaged girl', '120', 'codemonkey', 'hack reactor', 'female', 'straight', 'Astrology', 'Chinese', 'She'),
    ('user8','simu@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Simu', 'Liu', 'Ontario', '04-19-1989', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Simu_Liu_by_Gage_Skidmore.jpg/220px-Simu_Liu_by_Gage_Skidmore.jpg', 'actor, superhero, boba connoisour', '183', 'actor', 'B.S.', 'male', 'straight', 'none', 'Chinese', 'He'),
    ('user9','jason@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Jason', 'Lee', 'San Francisco', '03-22-1989', 'https://tinyurl.com/asdf666613', 'know it all', '183', 'unemployed', 'B.S.', 'male', 'straight', 'none', 'Chinese', 'He'),
    ('user10', 'allisha@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Allisha', 'Rectshapt', 'Las Vegas', '08-22-1995', 'https://img.freepik.com/free-photo/indoor-shot-beautiful-happy-african-american-woman-smiling-cheerfully-keeping-her-arms-folded-relaxing-indoors-after-morning-lectures-university_273609-1270.jpg', 'cool girl', '140', 'N/A', 'hack reactor', 'female', 'straight', 'Astrology', 'Hawaiian', 'She'),
    ('user11', 'jordan@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Jordan', 'Something', 'Seattle', '08-22-1997', 'https://www.datocms-assets.com/55010/1631448989-1609827493259134-modelo.jpg?auto=format%2Ccompress&cs=srgb', 'cool girl', '140', 'N/A', 'hack reactor', 'female', 'straight', 'Astrology', 'Irish', 'She'),
    ('user12', 'elliot@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Elliot', 'Page', 'Vancouver', '02-21-1987', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Elliot_Page_2021.png/220px-Elliot_Page_2021.png', 'actress', '140', 'Film Industry', 'hack reactor', 'other', 'asexual', 'Astrology', 'Irish', 'Them');


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
    ('8', 'female'),
    ('7', 'female'),
    ('9', 'female'),
    ('9', 'other'),
    ('10', 'male'),
    ('10', 'female'),
    ('11', 'other'),
    ('11', 'female'),
    ('12', 'female'),
    ('12', 'other');

INSERT INTO public.liked (active_user, target_user, liked)
    VALUES
    ('1', '6', True),
    ('6', '1', False),
    ('7', '5', False);

INSERT INTO public.matches (user1, user2, created_on)
    VALUES
    ('1', '2', '2022-06-06 12:20:00'),
    ('3', '2', '2022-06-06 12:20:00'),
    ('7', '8', '2022-06-06 12:20:00'),
    ('5', '2', '2022-06-06 12:20:00'),
    ('12', '11', '2022-06-06 12:20:00');


INSERT INTO public.chats (match_id, sender, recipient, sent, message)
    VALUES
    ('1', '1', '2', '2022-06-06 10:50:00', 'hello'),
    ('1', '2', '1', '2022-06-06 11:20:00', 'leave me alone');

INSERT INTO public.ratings (rating, rating_of, rating_by, review)
    VALUES
    ('5', '2', '1', 'paid for my dinner, was such a sweetheart all night. Only gonna be friends with them but they know how to treat a person right.'),
    ('5', '7', '8', 'Was kind of bummed he wasn"t a real hero but definitely was super nice!'),
    ('1', '1', '2', 'he said he forgot his wallet and made me pay for dinner. asshole. Didn"t put out either smh. waste of time.'),
    ('3', '11', '12', 'low vibrations, but alright small talk'),
    ('1', '2', '3', 'super cool girl - rating her low so no one takes her from me'),
    ('1', '2', '5', 'imma marry this girl'),
    ('3', '5', '2', 'loved his curly hair');