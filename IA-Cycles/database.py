import mysql.connector

# Parámetros de conexión
HOST = "localhost"
PORT = 3306
DATABASE = "db_femsync"
USER = "root"
PASSWORD = ""

def obtener_datos_por_user_id(user_id):
    """Consulta la base de datos y obtiene los valores de DM_1 filtrados por user_id."""
    try:
        connection = mysql.connector.connect(
            host=HOST,
            port=PORT,
            database=DATABASE,
            user=USER,
            password=PASSWORD
        )

        if connection.is_connected():
            cursor = connection.cursor()
            cursor.execute("SELECT id, DM_1 FROM cycles WHERE user_id = %s;", (user_id,))
            rows = cursor.fetchall()
            cursor.close()
            connection.close()
            return rows
    except mysql.connector.Error as err:
        print(f"❌ Error en la base de datos: {err}")
        return []
