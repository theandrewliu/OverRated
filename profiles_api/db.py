from math import ceil
from psycopg_pool import ConnectionPool
from psycopg.errors import UniqueViolation

pool = ConnectionPool()


class DuplicateUsername(RuntimeError):
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

    def get_all_profiles(self, page: int=0):
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

                    LIMIT 10 OFFSET %s
                """,
                # here
#  LEFT JOIN interested AS i ON (i.profile_id = p.id)
                    [page * 10],
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
                        [id]
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
