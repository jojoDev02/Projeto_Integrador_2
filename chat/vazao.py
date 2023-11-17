import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('file.csv')

df['timestamp'] = pd.to_datetime(df['timestamp'], unit='s')
df['metric_value'] = pd.to_numeric(df['metric_value'], errors='coerce')
df = df.dropna(subset=['metric_value'])
df_grouped = df.groupby(pd.Grouper(key='timestamp', freq='T')).agg({'metric_value': 'mean'})

plt.figure(figsize=(10, 6))

plt.plot(df_grouped.index, df_grouped['metric_value'], marker='o')
plt.title('Quantidade Média de Requisições por Minuto')
plt.xlabel('Tempo')
plt.ylabel('Média de Requisições por Minuto')
plt.grid(True)
plt.show()