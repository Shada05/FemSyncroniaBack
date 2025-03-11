import mysql.connector
from mysql.connector import Error
import numpy as np
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# Parámetros de conexión
host = "localhost"  # O la dirección IP del servidor MySQL
port = 3306  # Puerto estándar para MySQL
database = "db_femsync"
user = "root"
password = ""

# Variables para almacenar los datos
x_data = []  # Almacenará los valores de "id"
y_data = []  # Almacenará los valores de "DM_1"
print("Hola mundo")
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

        # Ejecutar la consulta para obtener los datos de la tabla "cycles"
        cursor.execute("SELECT id, DM_1 FROM cycles;")
        records = cursor.fetchall()

        # Almacenar los datos en las variables x_data e y_data
        for record in records:
            x_data.append(record[0])  # "id"
            y_data.append(record[1])  # "DM_1"

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

# Usar los datos obtenidos en el segundo código
x = np.array(x_data)  # Convertir a un array de numpy
y = np.array(y_data)  # Convertir a un array de numpy

# Reshape de x para que sea una matriz de una columna (requerido por scikit-learn)
x = x.reshape(-1, 1)

# Crear el modelo de regresión lineal
modelo = LinearRegression()

# Entrenar el modelo
modelo.fit(x, y)

# Predecir valores de y para los valores de x
y_pred = modelo.predict(x)

# Visualizar los resultados
plt.scatter(x, y, color='blue', label='Intensidad del sintoma')
plt.plot(x, y_pred, color='red', label='cantidad de ciclos')
plt.xlabel('x (id)')
plt.ylabel('y (DM_1)')
plt.title('Regresión Lineal (Predicción): y en función de x')
plt.legend()
plt.grid(True)
plt.show()

# Mostrar la ecuación de la línea de regresión
print(f"Ecuación de la línea de regresión: y = {modelo.coef_[0]:.4f}x + {modelo.intercept_:.4f}")