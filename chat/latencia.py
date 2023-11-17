import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("file.csv")

df_ws_connecting = df[df['metric_name'] == 'ws_connecting']

df_ws_connecting['timestamp'] = pd.to_datetime(df_ws_connecting['timestamp'] * 1000, unit='ms')

avg_response_time = df_ws_connecting['metric_value'].mean()

plt.figure(figsize=(10, 6))
plt.plot(df_ws_connecting['timestamp'], df_ws_connecting['metric_value'], marker='o', linestyle='-', color='b')
plt.title('Tempo de Resposta Médio ao Longo do Tempo')
plt.xlabel('Timestamp')
plt.ylabel('Tempo de Resposta Médio (ms)')
plt.axhline(y=avg_response_time, color='r', linestyle='--', label=f'Média: {avg_response_time:.2f} ms')
plt.legend()
plt.show()