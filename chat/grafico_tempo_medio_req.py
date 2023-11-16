import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("file.csv")

df_response_time = df[df['metric_name'] == 'iteration_duration']

average_response_time = df_response_time['metric_value'].mean()

print(f'Tempo de resposta médio: {average_response_time} ms')

plt.plot(df_response_time['timestamp'], df_response_time['metric_value'])
plt.xlabel('Timestamp')
plt.ylabel('Tempo de Resposta (ms)')
plt.title('Tempo de Resposta Médio ao Longo do Tempo')
plt.grid(True)
plt.show()