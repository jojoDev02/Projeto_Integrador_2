from abc import ABC, abstractmethod;

class Regra(ABC):
    @abstractmethod
    def validar(self, campo, body): pass;