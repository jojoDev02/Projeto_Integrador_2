from models.amizade import Amizade;
from database import db_session;

class Amizade_Repository:
      
    def fetch_by_id(self, id):
        return db_session.query(Amizade).filter(Amizade.amizadeId == id).first();
        
    def create(self, data):
        solicitanteId = data["solicitanteId"];
        receptorId = data["receptorId"];
        status = data["status"];
        
        amizade = Amizade(solicitanteId=solicitanteId, receptorId=receptorId, status=status);
        
        db_session.add(amizade);
        db_session.commit();
        
        return amizade;
    
    def update(self, id, data):
        solicitanteId = data["solicitanteId"];
        receptorId = data["receptorId"];
        status = data["status"];
        
        amizade = self.fetch_by_id(id);
        
        if (amizade == None):
            raise Exception("Amizade não encontrada.");
        
        amizade.solicitanteId = solicitanteId;
        amizade.receptorId = receptorId;
        amizade.status = status;
        
        db_session.add(amizade);
        db_session.commit();
        
        return amizade;
    
