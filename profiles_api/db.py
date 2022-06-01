from math import ceil
from psycopg_pool import ConnectionPool
# from psycopg.errors import UniqueViolation 

pool = ConnectionPool()


class DuplicateProfile(RuntimeError):
    pass

class ProfileQueries:
    def get_all_profiles(self, page: int):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                print("up to line 15 works")
                page_count = 0
                # page_count = ceil(cursor.fetchone()[0] / 10)
                print("does line 16 work?", page_count)
                cursor.execute(
                    """
                    SELECT 
                        p.id,
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
                print("help", rows)
                return page_count, list(rows)