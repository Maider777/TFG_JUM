import json
import pyodbc
import db.sql as sql
import os
from ytmusicapi import YTMusic
ytmusic = YTMusic('headers_auth.json')

# Python no soporta por defecto rutas relativas, con la librería OS se puede conseguir el efecto
directorioActual = os.path.dirname(__file__)
rutaSalas = os.path.join(directorioActual, '../data/salas.json')

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

    def __init__(self, sala):
        self.id = sala.id
        self.nombre = sala.nombre
        self.direccion = sala.direccion
        self.lat = sala.lat
        self.long = sala.long
        self.municipio = sala.municipio
        self.relevancia = sala.relevancia

def crear_salas():
    # Opening JSON file
    jsonController = open(rutaSalas, encoding='utf-8')
    
    # returns JSON object as
    # a dictionary
    
    data = json.load(jsonController)
    
    #YTMUSIC READ INFO
    for info in data:
        # print(info["nombre"])
        sala = Sala(info["id"], info["nombre"], info["direccion"], info["lat"], info["long"], info["municipio"], info["relevancia"])
        sql.insertar_sala(sala)
    jsonController.close()