from math import ceil
from psycopg_pool import ConnectionPool
from psycopg.errors import UniqueViolation 

pool = ConnectionPool()


class DuplicateUsername(RuntimeError):
    pass

class ProfileQueries:
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
                    SELECT 
                        p.id,
                        p.username,
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
                    LIMIT 10 OFFSET %s
                """,
                    [page * 10],
                )
                rows = cursor.fetchall()
                return page_count, list(rows)

    def get_profile(self, id: int):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT 
                        p.id,
                        p.username,
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
                return cursor.fetchone()

    def insert_profile(self, username, password, first_name, last_name, location, dob):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                try:
                    cursor.execute(
                        """
                        INSERT INTO profiles(username, password, first_name, last_name, location, date_of_birth)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        RETURNING id, username, password, first_name, last_name, location, date_of_birth
                        """,
                            [username, password, first_name, last_name, location, dob]
                    )
                    return cursor.fetchone()
                except UniqueViolation:
                    raise DuplicateUsername
                
    def update_profile(self, id, location, photo, about, height, job, education, gender, sexual_orientation, religion, ethnicity, pronouns):
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
                        RETURNING id, location, date_of_birth, photo, about, height, job, education, gender, sexual_orientation, religion, ethnicity, pronouns
                        """,
                            [location, photo, about, height, job, education, gender, sexual_orientation, religion, ethnicity, pronouns, id]
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