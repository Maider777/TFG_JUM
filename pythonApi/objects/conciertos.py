from datetime import datetime
import json
import uuid
import pyodbc
import db.sql as sql
import random
import numpy
import rand

from objects.artista import Artista
from objects.sala import Sala


class Concierto(object):
    id = ""
    artistaId = ""
    salaId = ""
    fecha = ""
    precio_min = ""
    precio_max = ""
    relevancia = ""

    # The class "constructor" - It's actually an initializer 
    def __init__(self, id, artistaId, salaId, fecha, precio_min, precio_max):
        self.id = id
        self.artistaId = artistaId
        self.salaId = salaId
        self.fecha = fecha
        self.precio_min = precio_min
        self.precio_max = precio_max

    def __str__(self):
        return "Concierto: {} en {} el {} entre {}€ y {}€".format(self.artistaId, self.salaId, self.fecha, self.precio_min, self.precio_max)

def crear_conciertos(cantidad):
    
    """
    Crea conciertos aleatorios, según relevancia de artista y demás.

    param cantidad => Cantidad de conciertos a crear
    """
    # Obtiene todos los artistas para hacer random con todos
    artistas = sql.obtener_artistas()
    salas = sql.obtener_salas()

    i = 0
    artistasRandom = random.choices(artistas, k=cantidad)

    for artista in artistasRandom:
        # Para cada artista (concierto), crea los demás datos del concierto
        
        salas_filtradas = rand.filtrar_salas_relevancia(salas, artista.relevancia)
        if(len(salas_filtradas)==0):
            print("No hay salas para el artista: ", artista.nombre)
            continue

        sala = Sala(random.choice(salas_filtradas))

        rel_media = (artista.relevancia + sala.relevancia) / 2
        precio_min, precio_max = rand.crear_precios(rel_media)
        
        fecha = rand.crear_fecha(rel_media)
        date_format = '%Y-%m-%d %H:%M:%S'        
        date = datetime.strftime(fecha, date_format)
        
        artista_disponible = sql.artista_disponible_fecha(artista.id, date)
        sala_disponible = sql.sala_disponible_fecha(sala.id, date)
        while not artista_disponible or not sala_disponible:
            fecha = rand.crear_fecha(rel_media)
            date_format = '%Y-%m-%d %H:%M:%S'        
            date = datetime.strftime(fecha, date_format)
            artista_disponible = sql.artista_disponible_fecha(artista.id, date)
            sala_disponible = sql.sala_disponible_fecha(sala.id, date)

        # Crear id
        id = uuid.uuid4()
        concierto = Concierto(id, artista.id, sala.id, date, precio_min, precio_max)
        # Insertar concierto en sql
        sql.insertar_concierto(concierto)
        print(Concierto(id, artista.nombre, sala.nombre, date, precio_min, precio_max), " ", id)
        i += 1

        # Crea teloneros y los inserta en BBDD
        telonero_1, telonero_2 = rand.crear_teloneros_aleatorios(artistas, artista, rel_media, concierto)

        if telonero_1 != None:
            sql.insertar_telonero(telonero_1)
            print(telonero_1)
        
        if telonero_2 != None:
            sql.insertar_telonero(telonero_2)
            print(telonero_2)

    print("Se han creado ", i, " conciertos de ", cantidad, " intentos")

    sql.crear_concierto_acdc_camela()
    sql.nuevoConsert()