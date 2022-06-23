from psycopg_pool import ConnectionPool


pool = ConnectionPool()


class DuplicateUsername(RuntimeError):
    pass


class DuplicateTarget(RuntimeError):
    pass


class MessageQueries:
    def list_messages(self, user_id):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                try:
                    cursor.execute(
                        """
                        SELECT user1, user2
                        FROM matches
                        WHERE user1 = %s or user2 = %s
                        """,
                        [user_id, user_id],
                    )
                    list_of_ids = cursor.fetchall()
                    list_of_target_ids = []
                    for id in list_of_ids:
                        if (
                            id[0] == user_id
                            and id[1] not in list_of_target_ids
                        ):
                            list_of_target_ids.append(id[1])
                        elif id[0] not in list_of_target_ids:
                            list_of_target_ids.append(id[0])
                        else:
                            pass

                    chats = []
                    for target_id in list_of_target_ids:
                        cursor.execute(
                            """
                            SELECT photo, first_name, last_name
                            FROM profiles
                            WHERE id = %s
                            """,
                            [target_id],
                        )
                        profile = list(cursor.fetchone())

                        cursor.execute(
                            """
                            SELECT id, match_id, sender,
                                recipient, sent, message
                            FROM chats
                            WHERE (recipient = %s AND sender = %s)
                                OR (recipient = %s AND sender =%s)
                            ORDER BY id DESC LIMIT 1
                            """,
                            [user_id, target_id, target_id, user_id],
                        )
                        target = cursor.fetchone()

                        if target is None:
                            continue
                        profile.append(list(target))
                        chats.append(profile)
                    return chats
                except Exception:
                    print("I dun goofed")

    def create_message(self, sender, recipient, sent, message):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                try:
                    cursor.execute(
                        """
                        SELECT id
                        FROM matches
                        WHERE (user1 = %s AND user2 = %s)
                            OR (user1 = %s AND user2 = %s)
                        """,
                        [sender, recipient, recipient, sender],
                    )
                    match_id = cursor.fetchone()[0]

                    cursor.execute(
                        """
                        INSERT INTO chats(
                            match_id, sender,
                            recipient, sent, message)
                        VALUES (%s, %s, %s, %s, %s)
                        RETURNING id, match_id,
                            sender, recipient, sent, message
                        """,
                        [match_id, sender, recipient, sent, message],
                    )
                    output = cursor.fetchone()

                    return list(output)
                except Exception:
                    print("didn't do the job")

    def get_messages(self, user, target):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                try:
                    cursor.execute(
                        """
                        SELECT id, sender, recipient, sent, message
                        FROM chats
                        WHERE (sender = %s AND recipient = %s)
                            OR (sender = %s AND recipient = %s)
                        ORDER BY id
                        """,
                        [user, target, target, user],
                    )
                    chats = list(cursor.fetchall())

                    return chats
                except Exception:
                    print("not working")
