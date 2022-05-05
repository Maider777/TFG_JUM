from copy import copy
from datetime import datetime, date
import random
import numpy
from dateutil.relativedelta import relativedelta

def filtrar_salas_relevancia(array, relevancia):
    cantidad_relevancia = 3
    filtrados = []
    
    for item in array:
        if relevancia - cantidad_relevancia < item.relevancia and relevancia + cantidad_relevancia > item.relevancia:
            filtrados.append(item)

    return filtrados

def crear_precios(rel_artista, rel_sala):
    rel_media = (rel_artista + rel_sala) / 2
    precios_min, probabilidades_min, probabilidades_max = [], [], []
    match rel_media:
        case rel_media if rel_media < 60:
            precios_min = copy([rel_media * 0.1, rel_media * 0.15, rel_media * 0.18, rel_media * 0.2,rel_media * 0.25])
            probabilidades_max = copy([0.3, 0.25, 0.2, 0.15, 0.1])
            probabilidades_min = copy([0.22, 0.22, 0.26, 0.18, 0.12])
        case rel_media if 60 <= rel_media < 65:
            precios_min = copy([rel_media * 0.15, rel_media * 0.22, rel_media * 0.28, rel_media * 0.35,rel_media * 0.45])
            probabilidades_max = copy([0.28, 0.24, 0.22, 0.14, 0.12])
            probabilidades_min = copy([0.18, 0.24, 0.22, 0.20, 0.16])
        case rel_media if 65 <= rel_media < 70:
            precios_min = copy([rel_media * 0.15, rel_media * 0.22, rel_media * 0.28, rel_media * 0.35,rel_media * 0.45])
            probabilidades_max = copy([0.28, 0.24, 0.22, 0.14, 0.12])
            probabilidades_min = copy([0.16, 0.22, 0.24, 0.20, 0.18])
        case rel_media if 70 <= rel_media < 75:
            precios_min = copy([rel_media * 0.22, rel_media * 0.3, rel_media * 0.38, rel_media * 0.44,rel_media * 0.52])
            probabilidades_max = copy([0.22, 0.20, 0.20, 0.20, 0.18])
            probabilidades_min = copy([0.2, 0.2, 0.2, 0.2, 0.2])
        case rel_media if 75 <= rel_media < 80:
            precios_min = copy([rel_media * 0.22, rel_media * 0.3, rel_media * 0.38, rel_media * 0.44,rel_media * 0.52])
            probabilidades_max = copy([0.22, 0.20, 0.20, 0.20, 0.18])
            probabilidades_min = copy([0.16, 0.22, 0.24, 0.20, 0.18])
        case rel_media if 80 <= rel_media:
            precios_min = copy([rel_media * 0.3, rel_media * 0.4, rel_media * 0.5, rel_media * 0.6,rel_media * 0.7])
            probabilidades_min = copy([0.16, 0.18, 0.24, 0.22, 0.2])
            probabilidades_max = copy([0.1, 0.15, 0.2, 0.25, 0.3])
        case _:
            print("No entra en ningún case del switch ", rel_media)
    
    precio_min = numpy.random.choice(precios_min, p=probabilidades_min)
    multip_precio_max = [1.2, 1.4, 1.6, 1.8, 2]
    precio_max = precio_min * numpy.random.choice(multip_precio_max, p=probabilidades_max)

    precio_min = round(precio_min, 1)
    precio_max = round(precio_max, 1)
    if(precio_min%1==0):
        precio_min = int(precio_min)
    if(precio_max%1==0):
        precio_max = int(precio_max)
    
    return precio_min, precio_max, rel_media

# Crear las fechas según la relevancia del artista
# - relevancia = antes el concierto y en peores días de la semana y horas
def crear_fecha(rel_media, artista_id):
    dias_semana = [0,1,2,3,4,5,6]
    meses = 0
    probalididades_dia_semana = 0
    match rel_media:
        case rel_media if rel_media < 60:
            meses = [1, 3]
            probalididades_dia_semana = [0.13, 0.13, 0.13, 0.15, 0.18, 0.15, 0.13]
        case rel_media if 60 <= rel_media < 70:
            meses = [1, 4]
            probalididades_dia_semana = [0.11, 0.13, 0.14, 0.16, 0.18, 0.15, 0.13]
        case rel_media if 70 <= rel_media < 75:
            meses = [2, 6]
            probalididades_dia_semana = [0.09, 0.1, 0.12, 0.16, 0.20, 0.20, 0.13]
        case rel_media if 75 <= rel_media < 80:
            meses = [3, 8]
            probalididades_dia_semana = [0.07, 0.08, 0.09, 0.18, 0.22, 0.22, 0.14]
        case rel_media if 80 <= rel_media:
            meses = [4, 12]
            probalididades_dia_semana = [0.03, 0.05, 0.07, 0.20, 0.25, 0.25, 0.15]
        case _:
            print("No entra en ningún case del switch de FECHAS ", rel_media)


    fecha_inicial = date.today() + relativedelta(months=+meses[0])
    fecha_final = date.today() + relativedelta(months=+meses[1])
    print("FECHAS POSIBLES: ", fecha_inicial, fecha_final)

    dia_semana = int(numpy.random.choice(dias_semana, p=probalididades_dia_semana))

    dias_entre_fechas = (fecha_final - fecha_inicial).days
    dias_aleatorios = random.randrange(dias_entre_fechas)
    fecha_aleatoria = fecha_inicial + relativedelta(days=dias_aleatorios)
    print(fecha_aleatoria)
    print("Fecha aleatoria weekday, dia semana ",fecha_aleatoria.weekday(), dia_semana)
    if(dia_semana == fecha_aleatoria.weekday()):        
        return fecha_aleatoria

    if(dia_semana>fecha_aleatoria.weekday()):
        print("dia_semana mayor que fecha aleatoria")
        return fecha_aleatoria + relativedelta(days = dia_semana-fecha_aleatoria.weekday())

    if(dia_semana<fecha_aleatoria.weekday()):
        print("fecha aleatoria mayor que fecha dia_semana")
        return fecha_aleatoria - relativedelta(days = fecha_aleatoria.weekday()-dia_semana)

    
