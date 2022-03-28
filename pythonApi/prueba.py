import json
import artista
from ytmusicapi import YTMusic
import pyodbc
connection = pyodbc.connect('DRIVER={SQL Server};SERVER=185.60.40.210,58015;DATABASE=TFG_JUM;UID=sa;PWD=Pa88word;')
cursor = connection.cursor()

# cursor.execute("SELECT * FROM usuarios")
# for row in cursor.fetchall():
#     print(row)

ytmusic = YTMusic('headers_auth.json')


# Opening JSON file
f = open('artists.json')
 
# returns JSON object as
# a dictionary
data = json.load(f)

def insertar_artista(artista):
    try:
        cursor.execute("INSERT INTO artistas(id, nombre, imagen_url, descripcion, generos, relevancia)"
            "VALUES (?, ?, ?, ?, ?, ?)"
            # "ON DUPLICATE KEY UPDATE"
            # "imagen_url=VALUES(imagen_url)"
            ,artista.id, artista.nombre, artista.imagen_url,  artista.descripcion, artista.generos, artista.relevancia)
        print("INSERT")
    except:
        cursor.execute("UPDATE artistas SET nombre = ?, imagen_url = ?, descripcion = ?, generos = ?, relevancia = ? WHERE id = ?", 
        artista.nombre, artista.imagen_url, artista.descripcion, artista.generos, artista.relevancia, artista.id)
        print("UPDATE")
    connection.commit()

#YTMUSIC READ INFO
for info in data:
    artista_id = info["id"]
    artistaDict = ytmusic.get_artist(artista_id)
    url = artistaDict["thumbnails"][len(artistaDict["thumbnails"])-1]["url"]
    artist = artista.Artista(artista_id, info["nombre"], url, artistaDict["description"], info["generos"], info["reputacion"])
    insertar_artista(artist)

f.close()

# print("KEYS:")
# print(artistaDict.keys())