import numpy as np
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# Usar los datos obtenidos del primer código
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