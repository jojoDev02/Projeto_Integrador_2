import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('file.csv')

df_duration = df[df['metric_name'] == 'http_req_duration']

df_duration['timestamp'] = pd.to_datetime(df_duration['timestamp'], unit='s')

avg_duration = df_duration['metric_value'].mean()

plt.figure(figsize=(12, 6))
plt.plot(df_duration['timestamp'], df_duration['metric_value'], label='Tempo de Requisição')
plt.axhline(y=avg_duration, color='r', linestyle='--', label='Tempo Médio')

plt.xlabel('Timestamp')
plt.ylabel('Tempo de Requisição (ms)')
plt.title('Tempo Médio de Requisição ao Longo do Tempo')
plt.legend()
plt.show()