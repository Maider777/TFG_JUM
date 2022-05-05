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

def insertar_concierto(concierto):
    try:
        cursor.execute("INSERT INTO conciertos(id, artistaId, salaId, fecha, precio_min, precio_max)"
            "VALUES (?, ?, ?, ?, ?, ?)"
            ,concierto.id, concierto.artistaId, concierto.salaId,  concierto.fecha, concierto.precio_min, concierto.precio_max)
        print("INSERT CONCIERTO")
    except:
        cursor.execute("UPDATE salas SET artistaId = ?, salaId = ?, fecha = ?, precio_min = ?, precio_max = ? WHERE id = ?", 
        concierto.artistaId, concierto.salaId,  concierto.fecha, concierto.precio_min, concierto.precio_max, concierto.id)
        print("UPDATE CONCIERTO")
    connection.commit()

def insertar_telonero(telonero):
    try:
        cursor.execute("INSERT INTO teloneros(artistaId, conciertoId, fecha)"
            "VALUES (?, ?, ?)"
            ,telonero.artistaId, telonero.conciertoId,  telonero.fecha)
        print("INSERT TELONERO")
    except:
        cursor.execute("UPDATE teloneros SET artistaId, fecha = ? WHERE conciertoId = ?", 
        telonero.artistaId, telonero.fecha, telonero.conciertoId)
        print("UPDATE TELONERO")
    connection.commit()

def obtener_artistas():
    try:
        cursor.execute("SELECT * FROM artistas")   
        artistas = cursor.fetchall()
    except:
        return 0
    connection.commit()
    return artistas

def obtener_salas():
    try:
        cursor.execute("SELECT * FROM salas")   
        salas = cursor.fetchall()
    except:
        return 0
    connection.commit()
    return salas

def obtener_fecha_conciertos_artista(artista_id, fecha):
    try:
        cursor.execute("SELECT DATEADD(dd, 0, DATEDIFF(dd, 0, conciertos.fecha)) as fecha, conciertos.id from conciertos where conciertos.artistaId = ? and DATEDIFF(day, fecha,?) =0", 
        artista_id, fecha)   
        conciertos = cursor.fetchall()
    except:
        return 0
    connection.commit()
    return conciertos

def obtener_fecha_conciertos_sala(sala_id, fecha):
    try:
        cursor.execute("SELECT DATEADD(dd, 0, DATEDIFF(dd, 0, conciertos.fecha)) as fecha, conciertos.id from conciertos where conciertos.salaId = ? and DATEDIFF(day, fecha,?) =0", 
        sala_id, fecha)   
        conciertos = cursor.fetchall()
    except:
        return 0
    connection.commit()
    return conciertos