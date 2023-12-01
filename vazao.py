import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('file.csv')

# Filtrar as linhas relevantes para o gráfico de vazão
http_reqs_data = df[df['metric_name'] == 'http_reqs']

# Converter o timestamp para um formato de data
http_reqs_data['timestamp'] = pd.to_datetime(http_reqs_data['timestamp'], unit='s')

# Criar o gráfico
plt.figure(figsize=(10, 6))
plt.plot(http_reqs_data['timestamp'], http_reqs_data['metric_value'], marker='o', linestyle='-')
plt.title('Gráfico de Vazão ao longo do tempo')
plt.xlabel('Timestamp')
plt.ylabel('Vazão')
plt.grid(True)
plt.show()
