import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('file.csv')

df_limit = df[df['metric_name'] == 'ws_connecting'][['timestamp', 'metric_value']]

df_limit['timestamp'] = pd.to_datetime(df_limit['timestamp'], unit='s')

df_limit = df_limit.sort_values(by='timestamp')

plt.plot(df_limit['timestamp'], df_limit['metric_value'])
plt.title('Limite de Requisições Simultâneas')
plt.xlabel('Timestamp')
plt.ylabel('Número de Requisições Simultâneas')
plt.grid(True)
plt.show()