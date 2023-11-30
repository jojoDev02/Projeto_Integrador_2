import pandas as pd
import matplotlib.pyplot as plt

# Carregar o arquivo CSV em um DataFrame do Pandas
df = pd.read_csv('file.csv')

# Filtrar os dados relevantes para latência (http_req_duration)
latency_data = df[df['metric_name'] == 'http_req_duration']

# Converter o timestamp para um formato de data compreensível
latency_data['timestamp'] = pd.to_datetime(latency_data['timestamp'], unit='s')

# Criar um gráfico de linha para a latência
plt.figure(figsize=(10, 6))
plt.plot(latency_data['timestamp'], latency_data['metric_value'], marker='o', linestyle='-', color='b')
plt.title('Latência ao longo do tempo')
plt.xlabel('Timestamp')
plt.ylabel('Latência (ms)')
plt.grid(True)
plt.show()