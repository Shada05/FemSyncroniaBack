import mysql.connector
import numpy as np
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# Parámetros de conexión
host = "localhost"
port = 3306
database = "db_femsync"
user = "root"
password = ""

# Solicitar el user_id
x = input("Ingrese el user_id a analizar: ")

# Variables para almacenar los datos
x_data = []  # Almacenará la cantidad de veces que aparece el user_id
y_data = []  # Almacenará los valores de DM_1 para el user_id

try:
    connection = mysql.connector.connect(
        host=host,
        port=port,
        database=database,
        user=user,
        password=password
    )

    if connection.is_connected():
        print("✅ Conexión exitosa a la base de datos")
        cursor = connection.cursor()

        # Consulta para obtener los datos filtrados por user_id
        cursor.execute("SELECT id, DM_1 FROM cycles WHERE user_id = %s;", (x,))
        rows = cursor.fetchall()

        # Contar la cantidad de veces que aparece el user_id
        x_data = [len(rows)]  # La cantidad de veces que aparece en la BD
        y_data = [row[1] for row in rows]  # Lista con los valores de DM_1
        analizar_datos(x, x_data, y_data)

except mysql.connector.Error as err:
    print(f"❌ Error: {err}")

finally:
    if 'connection' in locals() and connection.is_connected():
        cursor.close()
        connection.close()
        print("🔌 Conexión cerrada")


def analizar_datos(x, x_data, y_data):
    print(f"📊 El user_id {x} aparece {x_data[0]} veces en la base de datos")
    print(f"📌 Valores de DM_1 asociados: {y_data}")

    # Si no hay datos suficientes para regresión, salir
    if len(y_data) < 2:
        print("⚠️ No hay suficientes datos para la regresión lineal")
        return

    # Convertir los datos en arreglos numpy para regresión
    x_data_np = np.array(range(len(y_data))).reshape(-1, 1)  # Índices de los datos
    y_data_np = np.array(y_data)

    # Modelo de regresión lineal
    model = LinearRegression().fit(x_data_np, y_data_np)
    r_sq = model.score(x_data_np, y_data_np)

    # Resultados del modelo
    print(f'📈 Coeficiente de determinación: {r_sq}')
    print(f'🔹 Intercepto: {model.intercept_}')
    print(f'🔹 Pendiente: {model.coef_[0]}')

    # Predicción
    y_pred = model.predict(x_data_np)
    print(f'🔮 Predicción de valores: {y_pred}')

    # Gráfica
    plt.scatter(x_data_np, y_data_np, color='black', label="Datos reales")
    plt.plot(x_data_np, y_pred, color='blue', linewidth=2, label="Regresión Lineal")
    plt.title(f'Regresión Lineal para user_id {x}')
    plt.xlabel('Índice de Datos')
    plt.ylabel('DM_1')
    plt.legend()
    plt.show()