from flask import Flask;
from database import init_db;
from repositories.usuario_repository import UsuarioRepository;

app = Flask(__name__);

init_db();

repository = UsuarioRepository();

print(repository.fetch_all());
