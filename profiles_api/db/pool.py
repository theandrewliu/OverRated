import os
from psycopg_pool import ConnectionPool

conninfo = os.environ["DATABASE_URL"]
pool = ConnectionPool(conninfo=conninfo)
