from math import ceil
import random
from psycopg_pool import ConnectionPool
from psycopg.errors import UniqueViolation

pool = ConnectionPool()


class DuplicateUsername(RuntimeError):
    pass

class DuplicateTarget(RuntimeError):
    pass


class ProfileQueries:
    def get_list_of_interests(self, id):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                        """
                        SELECT interest
                        FROM interested
                        WHERE profile_id = %s
                        """,
                            [id],
                )
                interests = cursor.fetchall() # this is a tuple inside a list
                list_of_interests=[]
                for interest in interests:
                    list_of_interests.append(interest[0])
                return list_of_interests

    def get_all_profiles(self, user_id, page: int=0):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT COUNT(*) FROM profiles;
                """
                )
                page_count = ceil(cursor.fetchone()[0] / 10)
                cursor.execute(
                    """
                    SELECT p.id
                        , p.username
                        , p.email
                        , p.first_name
                        , p.last_name
                        , p.location
                        , p.date_of_birth
                        , p.photo
                        , p.about
                        , p.height
                        , p.job
                        , p.education
                        , p.gender
                        , p.sexual_orientation
                        , p.religion
                        , p.ethnicity
                        , p.pronouns
                    FROM profiles AS p
                    WHERE p.id != %s
                    LIMIT 10 OFFSET %s
                """,
                    [user_id, page * 10],
                )
                rows = cursor.fetchall()
                print("rows:", rows)
                return page_count, list(rows)

    def get_profile_from_username(self, username: str):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        p.id,
                        p.username,
                        p.password
                    FROM profiles AS p
                    WHERE p.username = %s
                    """,
                        [username],
                )
                profile = cursor.fetchone()
                return profile

    def get_profile(self, id: int):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        p.id,
                        p.username,
                        p.email,
                        p.first_name,
                        p.last_name,
                        p.location,
                        p.date_of_birth,
                        p.photo,
                        p.about,
                        p.height,
                        p.job,
                        p.education,
                        p.gender,
                        p.sexual_orientation,
                        p.religion,
                        p.ethnicity,
                        p.pronouns
                    FROM profiles AS p
                    WHERE p.id = %s
                    """,
                        [id],
                )
                profile = list(cursor.fetchone())
                cursor.execute(
                    """
                    SELECT
                        i.interest
                    FROM interested AS i
                    WHERE i.profile_id = %s
                    """,
                        [id]
                )
                interests = cursor.fetchall() # this is a tuple inside a list
                list_of_interests=[]
                for interest in interests:
                    list_of_interests.append(interest[0])
                profile.append(list_of_interests)
                return profile

    def get_random_profile(self, active_id):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                exclusions = []
                
                exclusions.append(active_id)
                
                # get the profiles we've already matched with
                cursor.execute(
                    """
                    SELECT user1, user2
                    FROM matches
                    WHERE %s = user1 OR %s = user2
                    """,
                        [active_id, active_id]
                )
                user_matches = list(cursor.fetchall())

                # appending the id of the person we matched with and not our own id
                for match in user_matches:
                    if active_id == match[0]:
                        exclusions.append(match[1])
                    else:
                        exclusions.append(match[0])

                # get the profiles we've already liked/disliked
                cursor.execute(
                    """
                    SELECT active_user, target_user
                    FROM liked
                    WHERE %s = active_user
                    """,
                        [active_id]
                )
                user_liked = list(cursor.fetchall())

                # appending the id of person we liked/disliked and not our own id
                for liked in user_liked:
                    if active_id == liked[0] and liked[1] not in exclusions:
                        exclusions.append(liked[1])
                exclusions.sort()

                # getting the list of genders we are interested in
                cursor.execute(
                    """
                    SELECT interest
                    FROM interested
                    WHERE profile_id = %s
                    """,
                        [active_id]
                )
                user_preferences = list(cursor.fetchall())
                
                # appending the gender(s) we are interested in
                new_preferences=[]
                for user_preference in user_preferences:
                    new_preferences.append(user_preference[0])
                
                # getting our declared gender
                cursor.execute(
                    """
                    SELECT gender
                    FROM profiles
                    WHERE id = %s
                    """,
                        [active_id]
                )
                user_gender = list(cursor.fetchone())[0]
                # getting a list of id's of accounts that are not excluded and also fit our preferences
                cursor.execute(
                    """
                    SELECT id
                    FROM profiles
                    WHERE NOT id = ANY(%s) AND gender = ANY(%s)
                    """,
                        [exclusions, new_preferences]
                )
                
                potential_ids = list(cursor.fetchall())

                # potential_ids is returned as a list of tuples so cleaning it up
                new_potential_ids = []
                for potential_id in potential_ids:
                    new_potential_ids.append(potential_id[0])

                # getting a list of id's of accounts that prefer our gender
                # should also be excluding id's found in exclusion list
                cursor.execute(
                    """
                    SELECT profile_id
                    FROM interested
                    WHERE profile_id = any(%s) AND interest = %s
                    """,
                        [new_potential_ids, user_gender]
                )
                actual_interest_ids = list(cursor.fetchall())

                # actual_interest_ids is returned as a list of tuples so cleaning it up
                new_actual_interest_ids = []
                for actual_interest in actual_interest_ids:
                    new_actual_interest_ids.append(actual_interest[0])

                # getting a list of profiles from the ids of filtered results
                cursor.execute(
                    """
                    SELECT
                        p.id,
                        p.username,
                        p.email,
                        p.first_name,
                        p.last_name,
                        p.location,
                        p.date_of_birth,
                        p.photo,
                        p.about,
                        p.height,
                        p.job,
                        p.education,
                        p.gender,
                        p.sexual_orientation,
                        p.religion,
                        p.ethnicity,
                        p.pronouns
                    FROM profiles AS p
                    WHERE p.id = any(%s)
                    ORDER BY RANDOM()
                    """,
                        [new_actual_interest_ids],
                )
                profile = list(cursor.fetchone())
                
                cursor.execute(
                    """
                    SELECT
                        i.interest
                    FROM interested AS i
                    WHERE i.profile_id = %s
                    """,
                        [profile[0]]
                )
                interests = cursor.fetchall() # this is a tuple inside a list
                list_of_interests=[]
                for interest in interests:
                    list_of_interests.append(interest[0])
                profile.append(list_of_interests)

                return profile

    def insert_profile(self, username, email, password, first_name, last_name, location, dob, pfences):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                try:
                    cursor.execute(
                        """
                        INSERT INTO profiles(username, email, password, first_name, last_name, location, date_of_birth)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id, username, email, password, first_name, last_name, location, date_of_birth
                        """,
                            [username, email, password, first_name, last_name, location, dob]
                    )
                    profiles = list(cursor.fetchone())
                    for pfence in pfences.interested:
                        cursor.execute(
                            """
                            INSERT INTO interested(profile_id, interest)
                            VALUES(%s, %s)
                            """,
                                [profiles[0], pfence]
                        )
                    profiles.append(pfences.interested) #yesenia is confused by this line - why do we append pfences.interested? ohh is that because we inserted new values into interested?
                    return profiles
                except UniqueViolation:
                    raise DuplicateUsername


    # update personal info
    def update_profile(self, id, location, photo, about, height, job, education, gender, sexual_orientation, religion, ethnicity, pronouns, pfences):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                try:
                    cursor.execute(
                        """
                        UPDATE profiles
                        SET location = %s,
                            photo = %s,
                            about = %s,
                            height = %s,
                            job = %s,
                            education = %s,
                            gender = %s,
                            sexual_orientation = %s,
                            religion = %s,
                            ethnicity = %s,
                            pronouns = %s
                        WHERE id = %s
                        RETURNING  id, username, email, first_name, last_name, location, date_of_birth, photo, about, height, job, education, gender, sexual_orientation, religion, ethnicity, pronouns
                        """,
                            [location, photo, about, height, job, education, gender, sexual_orientation, religion, ethnicity, pronouns, id]
                    )

                    profile = list(cursor.fetchone())

                    list_of_interests = self.get_list_of_interests(id)

                    preset = ["male", "female", "other"]

                    for i in preset:
                        if i in list_of_interests and i not in pfences.interested:
                            cursor.execute(
                                """
                                DELETE FROM interested
                                WHERE profile_id = %s AND interest = %s
                                """,
                                    [id, i]
                            )
                        if i not in list_of_interests and i in pfences.interested:
                            cursor.execute(
                                """
                                INSERT INTO interested(profile_id, interest)
                                VALUES(%s, %s)
                                """,
                                    [id, i]
                            )

                    updated_list_of_interests = self.get_list_of_interests(id)
                    profile.append(updated_list_of_interests)
                    return profile
                except UniqueViolation:
                    raise DuplicateUsername


    # update login info
    def update_account(self, id, username, email, password, first_name, last_name):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                try:
                    cursor.execute(
                        """
                        UPDATE profiles
                        SET username = %s,
                            email = %s,
                            password = %s,
                            first_name =%s,
                            last_name =%s
                        WHERE id = %s
                        RETURNING id, username, email, first_name, last_name, location, date_of_birth, photo, about, height, job, education, gender, sexual_orientation, religion, ethnicity, pronouns
                        """,
                            [username, email, password, first_name, last_name, id]
                    )
                    return cursor.fetchone()
                except UniqueViolation:
                    raise DuplicateUsername


    def delete_profile(self, id):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                try:
                    cursor.execute(
                        """
                        DELETE FROM profiles
                        WHERE id = %s
                        """,
                            [id],
                    )
                except UniqueViolation:
                    raise DuplicateUsername


#id = current user id
#target_user = detail profile_id (of random filtered profile)
    def like_profile(self, id, target_user):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                try:
                    cursor.execute(
                        """
                        INSERT INTO liked(active_user, target_user, liked)
                        VALUES (%s,%s,TRUE)
                        RETURNING id, active_user, target_user, liked
                        """,
                            [id,target_user]
                    )
                    like = list(cursor.fetchone())

                    cursor.execute(
                        """
                        SELECT 
                            active_user
                            , target_user
                            , liked
                        FROM liked 
                        WHERE active_user = %s
                        """,
                            [target_user]
                    )
                    list_of_likes = list(cursor.fetchall())
                    for likes in list_of_likes:
                        if id == likes[1]: # if active user is swiped by target user
                            if likes[2]:
                                cursor.execute(
                                    """
                                    INSERT INTO matches(user1, user2, created_on)
                                    VALUES (%s, %s, CURRENT_TIMESTAMP)
                                    RETURNING id, user1, user2, created_on
                                    """,
                                        [id, target_user]
                                )
                                blah = cursor.fetchone()
                                cursor.execute(
                                    """
                                    DELETE FROM liked
                                    WHERE active_user = %s AND target_user = %s
                                    """,
                                        [id, target_user]
                                )
                                cursor.execute(
                                    """
                                    DELETE FROM liked
                                    WHERE active_user = %s AND target_user = %s
                                    """,
                                        [target_user, id]
                                )
                    return like
                except:
                    print("idk what went wrong bro lol")
                


    def dislike_profile(self, id, target_user):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                try:
                    cursor.execute(
                        """
                        INSERT INTO liked(active_user, target_user, liked)
                        VALUES (%s,%s,FALSE)
                        RETURNING id, active_user, target_user, liked
                        """,
                            [id,target_user]
                    )
                    return cursor.fetchone()
                except:
                    print("idk what went wrong bro lol")

    def list_matches(self, user_id, page: int=0):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT COUNT(*) FROM matches;
                    """
                )
                page_count = ceil(cursor.fetchone()[0] / 10)
                cursor.execute(
                    """
                    SELECT user1
                        , user2
                    FROM matches
                    WHERE user1 = %s OR user2 = %s
                    LIMIT 10 OFFSET %s
                    """,
                        [user_id, user_id, page * 10],
                )
                matches = list(cursor.fetchall())
                target_matches =[]
                for match in matches:
                    if match[0] == user_id:
                        target_matches.append(match[1])
                    elif match[1] == user_id:
                        target_matches.append(match[0])
                
                profile_list=[]
                for target in target_matches:
                    cursor.execute(
                        """
                        SELECT id 
                            , photo
                            , first_name
                            , last_name
                            , location
                            , date_of_birth
                        FROM profiles
                        WHERE id = %s
                        """,
                            [target]
                    )
                    row = cursor.fetchone()
                    profile_list.append(list(row))
                print("my profile list", profile_list)
                return page_count, list(profile_list)

                
