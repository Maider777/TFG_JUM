import json
import pyodbc
import sql
from ytmusicapi import YTMusic
ytmusic = YTMusic('headers_auth.json')

connection = pyodbc.connect('DRIVER={SQL Server};SERVER=185.60.40.210,58015;DATABASE=TFG_JUM;UID=sa;PWD=Pa88word;')
cursor = connection.cursor()
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



def crear_artistas():
    # Opening JSON file
    jsonController = open('artists.json')
    
    # returns JSON object as
    # a dictionary
    data = json.load(jsonController)
    #YTMUSIC READ INFO
    for info in data:
        artista_id = info["id"]
        artistaDict = ytmusic.get_artist(artista_id)
        url = artistaDict["thumbnails"][len(artistaDict["thumbnails"])-1]["url"]
        artist = Artista(artista_id, info["nombre"], url, artistaDict["description"], info["generos"], info["relevancia"])
        sql.insertar_artista(artist)
    jsonController.close()