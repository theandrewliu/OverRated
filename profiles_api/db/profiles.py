from math import ceil
from .pool import pool
from psycopg.errors import UniqueViolation


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
                interests = cursor.fetchall()  # this is a tuple inside a list
                list_of_interests = []
                for interest in interests:
                    list_of_interests.append(interest[0])
                return list_of_interests

    def get_all_profiles(self, user_id, page: int = 0):
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
                    [id],
                )
                interests = cursor.fetchall()  # this is a tuple inside a list
                list_of_interests = []
                for interest in interests:
                    list_of_interests.append(interest[0])
                profile.append(list_of_interests)

                cursor.execute(
                    """
                    SELECT AVG(rating)::numeric(10,2) AS average_rating
                    FROM ratings
                    WHERE rating_of = %s
                    """,
                    [profile[0]],
                )
                average = cursor.fetchone()
                profile.append(average[0])

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
                    [active_id, active_id],
                )
                user_matches = list(cursor.fetchall())

                # appending the id of the person
                # we matched with and not our own id
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
                    [active_id],
                )
                user_liked = list(cursor.fetchall())

                # appending the id of person we
                # liked/disliked and not our own id
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
                    [active_id],
                )
                user_preferences = list(cursor.fetchall())

                # appending the gender(s) we are interested in
                new_preferences = []
                for user_preference in user_preferences:
                    new_preferences.append(user_preference[0])

                # getting our declared gender
                cursor.execute(
                    """
                    SELECT gender
                    FROM profiles
                    WHERE id = %s
                    """,
                    [active_id],
                )
                user_gender = list(cursor.fetchone())[0]
                # getting a list of id's of accounts that are
                # not excluded and also fit our preferences
                cursor.execute(
                    """
                    SELECT id
                    FROM profiles
                    WHERE NOT id = ANY(%s) AND gender = ANY(%s)
                    """,
                    [exclusions, new_preferences],
                )

                potential_ids = list(cursor.fetchall())

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
                    [new_potential_ids, user_gender],
                )
                actual_interest_ids = list(cursor.fetchall())

                # actual_interest_ids is returned as a list of tuples
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
                    [profile[0]],
                )
                interests = cursor.fetchall()  # this is a tuple inside a list
                list_of_interests = []
                for interest in interests:
                    list_of_interests.append(interest[0])
                profile.append(list_of_interests)

                cursor.execute(
                    """
                    SELECT AVG(rating)::numeric(10,2) AS average_rating
                    FROM ratings
                    WHERE rating_of = %s
                    """,
                    [profile[0]],
                )
                average = cursor.fetchone()
               
                profile.append(average[0])
               
                return profile

    def insert_profile(
        self,
        username,
        email,
        password,
        first_name,
        last_name,
        location,
        dob,
        pfences,
    ):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                try:
                    cursor.execute(
                        """
                        INSERT INTO profiles(
                            username, email, password,
                            first_name, last_name,
                            location, date_of_birth)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id, username,
                            email, password, first_name,
                            last_name, location, date_of_birth
                        """,
                        [
                            username,
                            email,
                            password,
                            first_name,
                            last_name,
                            location,
                            dob,
                        ],
                    )
                    profiles = list(cursor.fetchone())
                    for pfence in pfences.interested:
                        cursor.execute(
                            """
                            INSERT INTO interested(profile_id, interest)
                            VALUES(%s, %s)
                            """,
                            [profiles[0], pfence],
                        )
                    profiles.append(pfences.interested)
                    return profiles
                except UniqueViolation:
                    raise DuplicateUsername

    # update personal info
    def update_profile(
        self,
        id,
        location,
        photo,
        about,
        height,
        job,
        education,
        gender,
        sexual_orientation,
        religion,
        ethnicity,
        pronouns,
        pfences,
    ):
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
                        RETURNING  id, username, email, first_name,
                            last_name, location, date_of_birth, photo, about,
                            height, job, education, gender, sexual_orientation,
                            religion, ethnicity, pronouns
                        """,
                        [
                            location,
                            photo,
                            about,
                            height,
                            job,
                            education,
                            gender,
                            sexual_orientation,
                            religion,
                            ethnicity,
                            pronouns,
                            id,
                        ],
                    )

                    profile = list(cursor.fetchone())

                    list_of_interests = self.get_list_of_interests(id)

                    preset = ["male", "female", "other"]

                    for i in preset:
                        if (
                            i in list_of_interests
                            and i not in pfences.interested
                        ):
                            cursor.execute(
                                """
                                DELETE FROM interested
                                WHERE profile_id = %s AND interest = %s
                                """,
                                [id, i],
                            )
                        if (
                            i not in list_of_interests
                            and i in pfences.interested
                        ):
                            cursor.execute(
                                """
                                INSERT INTO interested(profile_id, interest)
                                VALUES(%s, %s)
                                """,
                                [id, i],
                            )

                    updated_list_of_interests = self.get_list_of_interests(id)
                    profile.append(updated_list_of_interests)
                    return profile
                except UniqueViolation:
                    raise DuplicateUsername

    # update login info
    def update_account(
        self, id, username, email, password, first_name, last_name
    ):
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
                        RETURNING id, username, email, first_name,
                            last_name, location, date_of_birth, photo,
                            about, height, job, education, gender,
                            sexual_orientation, religion, ethnicity, pronouns
                        """,
                        [username, email, password, first_name, last_name, id],
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

    def upload_photo(self, user_id, file_url):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    UPDATE profiles
                    SET photo = %s
                    WHERE id = %s
                    RETURNING id, photo
                    """,
                    [file_url, user_id],
                )
                photo_success = cursor.fetchone()
                return photo_success
