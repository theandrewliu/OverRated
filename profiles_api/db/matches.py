from math import ceil
from psycopg_pool import ConnectionPool

pool = ConnectionPool()


class DuplicateUsername(RuntimeError):
    pass


class DuplicateTarget(RuntimeError):
    pass


class MatchQueries:
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
                        [id, target_user],
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
                        [target_user],
                    )
                    list_of_likes = list(cursor.fetchall())
                    for likes in list_of_likes:
                        if id == likes[1]:
                            if likes[2]:
                                cursor.execute(
                                    """
                                    INSERT INTO matches(user1,user2,created_on)
                                    VALUES (%s, %s, CURRENT_TIMESTAMP)
                                    RETURNING id, user1, user2, created_on
                                    """,
                                    [id, target_user],
                                )
                                cursor.execute(
                                    """
                                    DELETE FROM liked
                                    WHERE active_user = %s AND target_user = %s
                                    """,
                                    [id, target_user],
                                )
                                cursor.execute(
                                    """
                                    DELETE FROM liked
                                    WHERE active_user = %s AND target_user = %s
                                    """,
                                    [target_user, id],
                                )
                    return like
                except Exception:
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
                        [id, target_user],
                    )
                    return cursor.fetchone()
                except Exception:
                    print("idk what went wrong bro lol")

    def list_matches(self, user_id, page: int = 0):
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
                        , id
                    FROM matches
                    WHERE user1 = %s OR user2 = %s
                    LIMIT 10 OFFSET %s
                    """,
                    [user_id, user_id, page * 10],
                )
                matches = list(cursor.fetchall())
                target_matches = []
                for match in matches:
                    if match[0] == user_id:
                        target_matches.append([match[1], match[2]])
                    elif match[1] == user_id:
                        target_matches.append([match[0], match[2]])

                profile_list = []
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
                        [target[0]],
                    )
                    specific_match = list(cursor.fetchone())

                    cursor.execute(
                        """
                    SELECT AVG(rating)::numeric(10,2) AS average_rating
                    FROM ratings
                    WHERE rating_of = %s
                    """,
                        [specific_match[0]],
                    )
                    average = cursor.fetchone()
                    print("average", average)

                    specific_match.append(average[0])
                    specific_match.append(target[1])

                    profile_list.append(specific_match)

                print("my profile list", profile_list)
                return page_count, list(profile_list)
