import numpy as np
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# Generar datos de ejemplo
x = np.arange(1, 4)  # Valores de x del 1 al 100 (consecutivos)
y = np.random.randint(0, 7, 3)  # Valores de y enteros aleatorios entre 0 y 6

# Reshape de x para que sea una matriz de una columna (requerido por scikit-learn)
x = x.reshape(-1, 1)

# Crear el modelo de regresión lineal
modelo = LinearRegression()

# Entrenar el modelo
modelo.fit(x, y)

# Predecir valores de y para los valores de x
y_pred = modelo.predict(x)

# Visualizar los resultados
plt.scatter(x, y, color='blue', label='Datos reales')
plt.plot(x, y_pred, color='red', label='Línea de regresión')
plt.xlabel('x (1 a 100)')
plt.ylabel('y (0 a 6)')
plt.title('Regresión Lineal: y en función de x')
plt.legend()
plt.grid(True)
plt.show()

# Mostrar la ecuación de la línea de regresión
print(f"Ecuación de la línea de regresión: y = {modelo.coef_[0]:.4f}x + {modelo.intercept_:.4f}")