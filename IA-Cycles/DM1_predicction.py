import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from utils.db_queries import obtener_datos_por_user_id

# Solicitar el user_id
user_id = input("Ingrese el user_id a analizar: ")

# Obtener datos de la base de datos
rows = obtener_datos_por_user_id(user_id)

if not rows:
    print("⚠️ No se encontraron datos para el user_id ingresado.")
else:
    x_data = [len(rows)]  # Cantidad de registros del user_id
    y_data = [row[1] for row in rows]  # Lista con valores de DM_1

    print(f"📊 El user_id {user_id} aparece {x_data[0]} veces en la base de datos")
    print(f"📌 Valores de DM_1 asociados: {y_data}")

    # Si no hay suficientes datos para regresión, salir
    if len(y_data) < 2:
        print("⚠️ No hay suficientes datos para la regresión lineal")
    else:
        # Convertir los datos en arreglos numpy para regresión
        x_data_np = np.array(range(len(y_data))).reshape(-1, 1)
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
        plt.title(f'Regresión Lineal para user_id {user_id}')
        plt.xlabel('Índice de Datos')
        plt.ylabel('DM_1')
        plt.legend()
        plt.show()
