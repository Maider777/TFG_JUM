import json
import pyodbc
import db.sql as sql
import random
import numpy

from objects.artista import Artista
from objects.sala import Sala

artistas = sql.obtener_artistas()
salas = sql.obtener_salas()

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

    def __init__(self, concierto):
        self.id = id
        self.artistaId = concierto.artistaId
        self.salaId = concierto.salaId
        self.fecha = concierto.fecha
        self.precio_min = concierto.precio_min
        self.precio_max = concierto.precio_max

    def __str__(self):
        return self.id + " " + self.artistaId

def filtrar_relevancia(array, relevancia):
    cantidad_relevancia = 3
    filtrados = []
    
    print("RELEVANCIA DEL ARTISTA: ", relevancia)
    for item in array:
        if relevancia - cantidad_relevancia < item.relevancia and relevancia + cantidad_relevancia > item.relevancia:
            filtrados.append(item)

    return filtrados

def crear_precios(rel_artista, rel_sala):
    media = (rel_artista + rel_sala) / 2
    print("Media de relevancia" , media);
    precios_min = [media * 0.3, media * 0.4, media * 0.5, media * 0.6,media * 0.7, media * 0.85, media]
    probabilidades_min = [0.05, 0.09, 0.12, 0.25, 0.22, 0.15, 0.12]
    precio_min = numpy.random.choice(precios_min, p=probabilidades_min)
    print("PRECIO MÍNIMO: ", precio_min)

def crear_concierto_aleatorio():
        artista = Artista(random.choice(artistas))
        print("************************************************************")
        print(artista)

        rel_artista = artista.relevancia
        salas_filtradas = filtrar_relevancia(salas, rel_artista)
        print(len(salas_filtradas), " salas filtradas")
        sala = Sala(random.choice(salas_filtradas))
        crear_precios(artista.relevancia, sala.relevancia)
        # sql.insertar_concierto()

def crear_conciertos(cantidad):
    print(len(artistas), " artistas")
    print(len(salas), " salas")

    for i in range(0,cantidad):
        crear_concierto_aleatorio()

    
            