import json
import pyodbc
import sql
from ytmusicapi import YTMusic
ytmusic = YTMusic('headers_auth.json')

# FALTA EL NOMBRE DE LA SALA; CAZURRO
connection = pyodbc.connect('DRIVER={SQL Server};SERVER=185.60.40.210,58015;DATABASE=TFG_JUM;UID=sa;PWD=Pa88word;')
cursor = connection.cursor()
class Sala(object):
    id = ""
    nombre = ""
    direccion = ""
    lat = ""
    long = ""
    municipio = ""
    relevancia = ""

    # The class "constructor" - It's actually an initializer 
    def __init__(self, id, nombre, direccion, lat, long, municipio, relevancia):
        self.id = id
        self.nombre = nombre
        self.direccion = direccion
        self.lat = lat
        self.long = long
        self.municipio = municipio
        self.relevancia = relevancia



def crear_salas():
    # Opening JSON file
    jsonController = open('salas.json')
    
    # returns JSON object as
    # a dictionary
    data = json.load(jsonController)
    #YTMUSIC READ INFO
    for info in data:
        sala = Sala(info["id"], info["nombre"], info["direccion"], info["lat"], info["long"], info["municipio"], info["relevancia"])
        sql.insertar_sala(sala)
    jsonController.close()