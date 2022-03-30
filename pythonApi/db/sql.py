import pyodbc
connection = pyodbc.connect('DRIVER={SQL Server};SERVER=185.60.40.210,58015;DATABASE=TFG_JUM;UID=sa;PWD=Pa88word;')
cursor = connection.cursor()

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

def insertar_sala(sala):
    try:
        cursor.execute("INSERT INTO salas(id, nombre, direccion, lat, long, municipio, relevancia)"
            "VALUES (?, ?, ?, ?, ?, ?, ?)"
            # "ON DUPLICATE KEY UPDATE"
            # "imagen_url=VALUES(imagen_url)"
            ,sala.id, sala.nombre, sala.direccion,  sala.lat, sala.long, sala.municipio, sala.relevancia)
        print("INSERT SALA")
    except:
        cursor.execute("UPDATE salas SET nombre = ?, direccion = ?, lat = ?, long = ?, municipio = ?, relevancia = ? WHERE id = ?", 
        sala.nombre, sala.direccion,  sala.lat, sala.long, sala.municipio, sala.relevancia, sala.id)
        print("UPDATE SALA")
    connection.commit()