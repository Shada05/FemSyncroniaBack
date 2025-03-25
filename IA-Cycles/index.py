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
y_data = []  # Almacenará los valores de los sintomas para el user_id
predictions = []

def analizar_datos(x, x_data, y_data, name_column):
    print(f"-------------------------------------------------------------")
    print(f"📊 El user_id {x} aparece {x_data[0]} veces en la base de datos")
    print(f"📌 Valores de {name_column} asociados: {y_data}")

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

    # Redondear el intercepto a un número entero y almacenarlo en 'prediction'
    prediction = round(model.intercept_)

    # Guardar el resultado en la lista de predicciones
    predictions.append((prediction, name_column))

    # Resultados del modelo
    print(f'📈 Coeficiente de determinación: {r_sq}')
    print(f'🔹 Intercepto: {model.intercept_} (redondeado: {prediction})')
    print(f'🔹 Pendiente: {model.coef_[0]}')

    # redondeo
    y_pred= np.round(model.predict(x_data_np), 2)
    print(f'🔮 Predicción de valores (redondeada): {y_pred}')


    # Predicción
    y_pred = model.predict(x_data_np)
    print(f'🔮 Predicción de valores: {y_pred}')

    #  Gráfica
    plt.scatter(x_data_np, y_data_np, color='black', label="Datos reales")
    plt.plot(x_data_np, y_pred, color='blue', linewidth=2, label="Regresión Lineal")
    plt.title(f'Regresión Lineal para user_id {x} de {name_column}')
    plt.xlabel('Cantidad de pruebas')
    plt.ylabel('Intensidad del sintoma')
    plt.legend()
    plt.show()


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

        columns = ['DM_1', 'DM_2', 'DM_3', 'DM_4', 'DM_5', 'DM_6', 'DM_7', 'DM_8', 'DM_9', 'DM_10', 
           'DM_11', 'DM_12', 'DM_13', 'DM_14', 'DM_15', 'DM_16', 'DM_17', 'DM_18', 'M_1', 'M_2', 
           'M_3', 'M_4', 'M_5', 'M_6', 'M_7', 'M_8', 'M_9', 'M_10', 'M_11', 'M_12', 'M_13', 'M_14', 
           'M_15', 'M_16', 'M_17', 'M_18', 'M_19', 'M_20', 'PP_1', 'PP_2', 'PP_3', 'PP_4', 'PP_5', 
           'E_1', 'E_2', 'E_3', 'E_4', 'E_5', 'E_6', 'E_7', 'E_8', 'E_9', 'E_10', 'E_11', 'E_12', 
           'E_13', 'E_14', 'E_15', 'E_16', 'E_17', 'E_18', 'E_19', 'E_20', 'E_21', 'F_1', 'F_2', 
           'F_3', 'F_4', 'F_5', 'F_6', 'F_7', 'F_8', 'F_9', 'F_10', 'F_11', 'F_12', 'F_13', 'F_14', 
           'F_15']

        # Iterar sobre cada columna
        for column in columns:
            # Consulta dinámica para cada columna
            query = f"SELECT id, {column} FROM cycles WHERE user_id = %s AND cycle_status = 1;"
            cursor.execute(query, (x,))
            rows = cursor.fetchall()

            # Contar la cantidad de veces que aparece user_id en la columna actual
            x_data = [len(rows)]  # Número de veces que aparece en la BD
            y_data = [row[1] for row in rows]  # Lista con los valores de la columna actual

            # Llamar a la función analizar_datos para la columna actual
            analizar_datos(x, x_data, y_data, column)

        print(f"valores de {predictions}")

        for prediction, columna in predictions:
            print(f"Predicción para {columna}: {prediction} del id: {x}")
            query = f"UPDATE cycles SET {columna} = {int(prediction)} WHERE user_id = %s AND cycle_status = 2;"
            cursor.execute(query, (x,))  # Nota la coma después de x



except mysql.connector.Error as err:
    print(f"❌ Error: {err}")

finally:
    if 'connection' in locals() and connection.is_connected():
        cursor.close()
        connection.close()
        print("🔌 Conexión cerrada")
