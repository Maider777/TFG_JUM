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

    # def __init__(self, concierto):
    #     self.id = concierto.id
    #     self.artistaId = concierto.artistaId
    #     self.salaId = concierto.salaId
    #     self.fecha = concierto.fecha
    #     self.precio_min = concierto.precio_min
    #     self.precio_max = concierto.precio_max

    def __str__(self):
        return "Concierto con id: {} de {} en la sala {} en la fecha {} con precio mínimo de {} y precio máximo de {}".format(self.id, self.artistaId, self.salaId, self.fecha, self.precio_min, self.precio_max)

def crear_conciertos(cantidad):
    
    artistas = sql.obtener_artistas()
    salas = sql.obtener_salas()

    print(len(artistas), " artistas")
    print(len(salas), " salas")

    i = 0
    artistasRandom = random.choices(artistas, k=cantidad)

    for artista in artistasRandom:
        
        salas_filtradas = rand.filtrar_salas_relevancia(salas, artista.relevancia)
        if(len(salas_filtradas)==0):
            print("No hay salas para el artista: ", artista.nombre)
            continue

        sala = Sala(random.choice(salas_filtradas))
        precio_min, precio_max, rel_media = rand.crear_precios(artista.relevancia, sala.relevancia)
        
        fecha = rand.crear_fecha(rel_media)
        # print(artista.nombre, " tocará en ",  sala.nombre, " en la fecha ", fecha, ". Precios entre ", precio_min, " y ", precio_max)
        
        date_format = '%Y-%m-%d %H:%M:%S'        
        date = datetime.strftime(fecha, date_format)
        print(date)
        id = uuid.uuid4()
        c = Concierto(id, artista.id, sala.id, date, precio_min, precio_max)
        
        sql.insertar_concierto(c)
        print(Concierto(id, artista.nombre, sala.nombre, date, precio_min, precio_max))
        i+=1

    print("Se han creado ", i, " artistas de ", cantidad, " intentos")

# fechas = sql.obtener_fecha_conciertos_artista("UCBDXpukZYpWw54QCbEGdsZw")
        # print(fechas[0].fecha)