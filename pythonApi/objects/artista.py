import json
import pyodbc
import db.sql as sql
# import sys
# sys.path.append("C:\Users\2daw3\Downloads\ytmusicapi_master")
from ytmusicapi import YTMusic

import os

# Python no soporta por defecto rutas relativas, con la librería OS se puede conseguir el efecto
directorioActual = os.path.dirname(__file__)
rutaArtistas = os.path.join(directorioActual, '../data/artistas.json')

ytmusic = YTMusic('headers_auth.json')

class Artista(object):
    id = ""
    nombre = ""
    imagen_url = ""
    descripcion = ""
    generos = ""
    relevancia = ""

    # The class "constructor" - It's actually an initializer 
    def __init__(self, id, nombre, imagen_url, descripcion, generos, relevancia):
        self.id = id
        self.nombre = nombre
        self.imagen_url = imagen_url
        self.descripcion = descripcion
        self.generos = generos
        self.relevancia = relevancia

    # def __init__(self, artista):
    #     self.id = artista.id
    #     self.nombre = artista.nombre
    #     self.imagen_url = artista.imagen_url
    #     self.descripcion = artista.descripcion
    #     self.generos = artista.generos
    #     self.relevancia = artista.relevancia

    def __str__(self) -> str:
        return self.nombre

def crear_artistas():
    # Opening JSON file
    jsonController = open(rutaArtistas, encoding='utf-8')
    
    # returns JSON object as
    # a dictionary
    data = json.load(jsonController)
    print(len(data))
    #YTMUSIC READ INFO
    artistas = []
    for info in data:
        artistas.append(info["id"])
        artista_id = info["id"]
        artistaDict = ytmusic.get_artist(artista_id)
        url = artistaDict["thumbnails"][len(artistaDict["thumbnails"])-1]["url"]
        descripcion = artistaDict["description"].replace("?", "")  if artistaDict["description"] is not None else ""
        print("?" in descripcion)
        artist = Artista(artista_id, info["nombre"], url, descripcion, info["generos"], info["relevancia"])
        sql.insertar_artista(artist)
    s = set(artistas)
    # Comprobar que los artistas están bien en cuanto a cantidad
    if(len(artistas) != len(s)):
        print("CONFLICTO: HAY ARTISTAS REPETIDOS")
    jsonController.close()