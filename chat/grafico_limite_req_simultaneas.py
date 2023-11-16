import pandas as pd
import matplotlib.pyplot as plt

# Leitura do CSV
df = pd.read_csv('file.csv')

# Filtrar dados relevantes para o gráfico
df_limit = df[df['metric_name'] == 'ws_connecting'][['timestamp', 'metric_value']]

# Converter o timestamp para um formato de data/hora
df_limit['timestamp'] = pd.to_datetime(df_limit['timestamp'], unit='s')

# Ordenar o DataFrame pelo timestamp
df_limit = df_limit.sort_values(by='timestamp')

# Criar o gráfico
plt.plot(df_limit['timestamp'], df_limit['metric_value'])
plt.title('Limite de Requisições Simultâneas')
plt.xlabel('Timestamp')
plt.ylabel('Número de Requisições Simultâneas')
plt.grid(True)
plt.show()