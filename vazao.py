import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('file.csv')

http_reqs_df = df[df['metric_name'] == 'http_reqs']

http_reqs_df['timestamp'] = pd.to_datetime(http_reqs_df['timestamp'], unit='s')
http_reqs_df.set_index('timestamp', inplace=True)

http_reqs_per_minute = http_reqs_df.resample('T').sum()

plt.plot(http_reqs_per_minute.index, http_reqs_per_minute['metric_value'])
plt.title('Quantidade Média de Requisições por Minuto')
plt.xlabel('Tempo')
plt.ylabel('Requisições por Minuto')
plt.show()