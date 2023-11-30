import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('file.csv')

reqs_data = df[df['metric_name'] == 'http_reqs']

reqs_data['timestamp'] = pd.to_datetime(reqs_data['timestamp'], unit='s')

plt.figure(figsize=(12, 6))
plt.plot(reqs_data['timestamp'], reqs_data['metric_value'], label='Requisições Simultâneas', marker='o')

plt.xlabel('Timestamp')
plt.ylabel('Requisições Simultâneas')
plt.title('Limite de Requisições Simultâneas ao longo do Tempo')
plt.legend()
plt.grid(True)

reqs_data = df[df['metric_name'] == 'http_reqs']
numero_de_requisicoes = len(reqs_data)
print("Número total de requisições simultâneas:", numero_de_requisicoes)

plt.show()