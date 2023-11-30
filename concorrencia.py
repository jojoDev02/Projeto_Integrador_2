import pandas as pd
import matplotlib.pyplot as plt

# Leitura do arquivo CSV
df = pd.read_csv('file.csv')

# Filtrar os dados relevantes para o gráfico de concorrência
concurrency_data = df[df['metric_name'].isin(['vus', 'vus_max'])]

# Converter o timestamp para um formato legível
concurrency_data['timestamp'] = pd.to_datetime(concurrency_data['timestamp'], unit='s')

# Criar o gráfico de concorrência
plt.figure(figsize=(10, 6))
plt.plot(concurrency_data['timestamp'], concurrency_data['metric_value'], label='VUs')
plt.plot(concurrency_data['timestamp'], concurrency_data['metric_value'], 'o', label='VUs Max', markersize=8)
plt.title('Gráfico de Concorrência')
plt.xlabel('Timestamp')
plt.ylabel('Valor')
plt.legend()
plt.grid(True)
plt.show()