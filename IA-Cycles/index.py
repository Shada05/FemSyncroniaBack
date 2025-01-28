import mysql.connector
from mysql.connector import Error

# Parámetros de conexión
host = "localhost"  # O la dirección IP del servidor MySQL
port = 3306  # Puerto estándar para MySQL
database = "db_femsync"
user = "root"
password = ""

try:
    # Conexión a la base de datos MySQL
    connection = mysql.connector.connect(
        host=host,
        port=port,
        database=database,
        user=user,
        password=password
    )

    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Conectado a MySQL Server versión", db_Info)

        cursor = connection.cursor()
        cursor.execute("SELECT DATABASE();")
        record = cursor.fetchone()
        print("Conectado a la base de datos:", record)
                # Ejecutar la consulta para obtener los datos de la tabla "symptoms"
        cursor.execute("SELECT * FROM cycles;")
        records = cursor.fetchall()

        # Imprimir los registros obtenidos
        print("Registros de la tabla 'cycles':")
        for record in records:
            print(record)

        # Cierra el cursor y la conexión
        cursor.close()
        connection.close()
        print("Conexión cerrada")
except Error as e:
    print("Error al conectar a MySQL", e)