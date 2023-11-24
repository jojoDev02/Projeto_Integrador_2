class Serializador_Service:
    def serializar(self, objeto):
        
        if type(objeto) is list:
            objetoArr = [];
            objetoDict = {};
            for item in objeto:
                for chave, valor in item.__dict__.items():
                    if chave not in "_sa_instance_state":
                        objetoDict[chave] = valor;

                objetoArr.append(objetoDict);

            print(objetoArr);
    
            
                
