from .pool import pool

class DuplicateUsername(RuntimeError):
    pass


class DuplicateTarget(RuntimeError):
    pass


class RatingQueries:
    def create_rating(self, rating, user_id, target_id):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                try:
                    cursor.execute(
                        """
                        INSERT INTO ratings(rating, rating_of, rating_by)
                        VALUES (%s, %s, %s)
                        RETURNING id, rating, rating_of, rating_by
                        """,
                        [rating, user_id, target_id],
                    )
                    return cursor.fetchone()
                except Exception:
                    print("DID NOT RUN THE SQL INJECTION")

    def get_average_rating(self, target_id):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                try:
                    cursor.execute(
                        """
                        SELECT AVG(rating)::numeric(10,2) AS average_rating
                        FROM ratings
                        WHERE rating_of = %s
                        """,
                        [target_id],
                    )
                    average = cursor.fetchone()
                    return float(average[0])
                except Exception:
                    print("DID NOT RUN THE SQL STUFF")

    def list_ratings(self, user_id):
        with pool.connection() as connection:
            with connection.cursor() as cursor:

                cursor.execute(
                    """
                    SELECT id
                        , rating
                        , rating_of
                        , rating_by
                    FROM ratings
                    WHERE rating_by = %s
                    """,
                    [user_id],
                )
                ratings = list(cursor.fetchall())

                return ratings
