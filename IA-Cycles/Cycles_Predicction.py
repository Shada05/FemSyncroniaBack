import pandas as pd
from datetime import datetime, timedelta
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# Datos de ejemplo
data = {
    'start_day': ["2025-01-01", "2025-01-29", "2025-02-26", "2025-03-26", "2025-04-23"],
    'average_ciclo': [28, 28, 28, 28, 28]
}

# Convertimos a DataFrame
df = pd.DataFrame(data)

# Convertimos fechas a días desde el inicio
df['start_day'] = pd.to_datetime(df['start_day'])
df['day_number'] = (df['start_day'] - df['start_day'].min()).dt.days

# Creamos variable independiente (X) como número de ciclo
df['cycle_number'] = range(len(df))
X = df[['cycle_number']]  # ciclo 0, 1, 2, ...
y = df['day_number']      # días desde la primera fecha

# Entrenamos el modelo
model = LinearRegression()
model.fit(X, y)

# Predecimos el siguiente ciclo
next_cycle = [[len(df)]]
predicted_day_number = model.predict(next_cycle)[0]

# Convertimos a fecha
predicted_start_date = df['start_day'].min() + timedelta(days=int(predicted_day_number))
print("Próxima menstruación estimada:", predicted_start_date.date())

# (Opcional) Visualizamos
plt.scatter(df['cycle_number'], df['day_number'], label='Datos')
plt.plot(df['cycle_number'], model.predict(X), color='red', label='Modelo lineal')
plt.xlabel('Ciclo N°')
plt.ylabel('Días desde el primer periodo')
plt.legend()
plt.title('Predicción de fecha menstrual con regresión lineal')
plt.show()
