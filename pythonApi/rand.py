from copy import copy
from datetime import datetime, date
import random
import numpy
from dateutil.relativedelta import relativedelta

from objects.artista import Artista
from objects.teloneros import Telonero

def filtrar_salas_relevancia(salas, relevancia):
    """
    Filtra las salas según la relevancia del artista

    param salas => salas de todas las salas
    param relevancia => relevancia del artista a tener en cuenta
    returns => array de salas filtradas
    """
    # Cantidad de relevancia mayor/menor máxima que tendrá la sala
    cantidad_relevancia = 3
    salas_filtradas = []
    
    for item in salas:
        if relevancia - cantidad_relevancia < item.relevancia and relevancia + cantidad_relevancia > item.relevancia:
            salas_filtradas.append(item)

    return salas_filtradas

def filtrar_artistas_genero(artistas, artista):
    """
    Filtra entre todos los artistas, los que tengan algún género en común con el artista principal
    y los que tengan menor relevancia. Es para creación de teloneros

    param artistas => artistas de todos los artistas
    param artista => artista del que coger los géneros
    returns => array de artistas filtrados
    """
    generos = artista.generos.split(",")
    artistas_filtrados = []

    for artista_filtrado in artistas:
        generos_filtrados = artista_filtrado.generos.split(",")
        break_loop = None
        if(artista.id != artista_filtrado.id and artista.relevancia > artista_filtrado.relevancia and artista.relevancia - 8 < artista_filtrado.relevancia):
            for genero in generos:
                for genero_filtrado in generos_filtrados:
                    if(genero==genero_filtrado):
                        artistas_filtrados.append(artista_filtrado)
                        break_loop = True
                        break
                if(break_loop):
                    break
    
    return artistas_filtrados

def crear_precios(rel_media):
    """
    Crea los precios mínimo y máximo para el concierto, teniendo en cuenta 
    la relevancia media entre el artista y la sala

    param rel_media => Relevancia media entre artista y sala
    returns => precio_min, precio_max
    """
    
    precios_min, probabilidades_min, probabilidades_max = [], [], []
    match rel_media:
        case rel_media if rel_media < 60:
            precios_min = copy([rel_media * 0.1, rel_media * 0.15, rel_media * 0.18, rel_media * 0.2,rel_media * 0.25])
            probabilidades_min = copy([0.22, 0.22, 0.26, 0.18, 0.12])
            probabilidades_max = copy([0.3, 0.25, 0.2, 0.15, 0.1])
        case rel_media if 60 <= rel_media < 65:
            precios_min = copy([rel_media * 0.15, rel_media * 0.22, rel_media * 0.28, rel_media * 0.35,rel_media * 0.45])
            probabilidades_min = copy([0.18, 0.24, 0.22, 0.20, 0.16])
            probabilidades_max = copy([0.28, 0.24, 0.22, 0.14, 0.12])
        case rel_media if 65 <= rel_media < 70:
            precios_min = copy([rel_media * 0.15, rel_media * 0.22, rel_media * 0.28, rel_media * 0.35,rel_media * 0.45])
            probabilidades_min = copy([0.16, 0.22, 0.24, 0.20, 0.18])
            probabilidades_max = copy([0.28, 0.24, 0.22, 0.14, 0.12])
        case rel_media if 70 <= rel_media < 75:
            precios_min = copy([rel_media * 0.22, rel_media * 0.3, rel_media * 0.38, rel_media * 0.44,rel_media * 0.52])
            probabilidades_min = copy([0.2, 0.2, 0.2, 0.2, 0.2])
            probabilidades_max = copy([0.22, 0.20, 0.20, 0.20, 0.18])
        case rel_media if 75 <= rel_media < 80:
            precios_min = copy([rel_media * 0.22, rel_media * 0.3, rel_media * 0.38, rel_media * 0.44,rel_media * 0.52])
            probabilidades_min = copy([0.16, 0.22, 0.24, 0.20, 0.18])
            probabilidades_max = copy([0.22, 0.20, 0.20, 0.20, 0.18])
        case rel_media if 80 <= rel_media:
            precios_min = copy([rel_media * 0.3, rel_media * 0.4, rel_media * 0.5, rel_media * 0.6,rel_media * 0.7])
            probabilidades_min = copy([0.16, 0.18, 0.24, 0.22, 0.2])
            probabilidades_max = copy([0.1, 0.15, 0.2, 0.25, 0.3])
        case _:
            print("No entra en ningún case del switch ", rel_media)
    
    precio_min = (numpy.random.choice(precios_min, p=probabilidades_min)).item()
    multip_precio_max = [1.2, 1.4, 1.6, 1.8, 2]
    precio_max = precio_min * (numpy.random.choice(multip_precio_max, p=probabilidades_max)).item()

    precio_min = round(precio_min, 1)
    precio_max = round(precio_max, 1)
    if(precio_min%1==0):
        precio_min = int(precio_min)
    if(precio_max%1==0):
        precio_max = int(precio_max)

    if(precio_min<15):
        precio_min = (numpy.random.choice([precio_min, 0], p=[0.88, 0.12])).item()
    if(precio_min==0):
        precio_max = 0
    
    return precio_min, precio_max

def crear_fecha(rel_media):
    """
    Crea la fecha teniendo en cuenta la relación media entre artista y sala

    param rel_media
    returns fecha
    """

    # Los artistas con más reputación serían avisados con más tiempo, y tendrían mejores días a de la semana y horas
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

    # Fecha inicial y final para calcular fecha aleatoria
    fecha_inicial = date.today() + relativedelta(months=+meses[0])
    fecha_final = date.today() + relativedelta(months=+meses[1])

    
    dias_entre_fechas = (fecha_final - fecha_inicial).days
    dias_aleatorios = random.randrange(dias_entre_fechas)
    fecha_aleatoria = fecha_inicial + relativedelta(days=dias_aleatorios)

    # Hora del concierto aleatoria
    horas = 0
    match rel_media:
        case rel_media if rel_media < 60:
            horas = [12, 23]
        case rel_media if 60 <= rel_media < 70:
            horas = [14, 23]
        case rel_media if 70 <= rel_media < 75:
            horas = [16, 23]
        case rel_media if 75 <= rel_media < 80:
            horas = [18, 23]
        case rel_media if 80 <= rel_media:
            horas = [20, 23]
        case _:
            print("No entra en ningún case del switch de HORAS ", rel_media)

    hora = random.choice(horas)
    fecha_aleatoria = fecha_aleatoria + relativedelta(hours = hora)

    # Día aleatorio de la semana
    dia_semana = int(numpy.random.choice(dias_semana, p=probalididades_dia_semana))

    # Se hace suma/resta para igualar día de la semana con el que haya tocado
    if(dia_semana == fecha_aleatoria.weekday()):        
        return fecha_aleatoria

    if(dia_semana>fecha_aleatoria.weekday()):
        return fecha_aleatoria + relativedelta(days = dia_semana-fecha_aleatoria.weekday())

    if(dia_semana<fecha_aleatoria.weekday()):
        return fecha_aleatoria - relativedelta(days = fecha_aleatoria.weekday()-dia_semana)

    return None

def crear_teloneros_aleatorios(artistas, artista, rel_media, concierto):
    """
    Crea la fecha teniendo en cuenta la relación media entre artista y sala

    param artistas => Lista de artistas
    param artista => Artista del que hacer teloneros
    param rel_media => Relación media entre artista y sala
    param concierto => Concierto del que hacer los teloneros
    returns telonero1/None, telonero2/None => Los dos teloneros que tocarán
    """
    probabilidad_cantidad_teloneros = 0
    match rel_media:
        case rel_media if rel_media < 60:
            probabilidad_cantidad_teloneros = [0.8, 0.15, 0.05]
        case rel_media if 60 <= rel_media < 70:
            probabilidad_cantidad_teloneros = [0.6, 0.3, 0.1]
        case rel_media if 70 <= rel_media < 75:
            probabilidad_cantidad_teloneros = [0.5, 0.35, 0.15]
        case rel_media if 75 <= rel_media < 80:
            probabilidad_cantidad_teloneros = [0.3, 0.4, 0.3]
        case rel_media if 80 <= rel_media:
            probabilidad_cantidad_teloneros = [0.2, 0.45, 0.35]
        case _:
            print("No entra en ningún case del switch de CANTIDAD TELONEROS ", rel_media)

    # Cantidad aleatoria de teloneros según relevancia
    cantidad_teloneros = (numpy.random.choice([0, 1, 2], p = probabilidad_cantidad_teloneros)).item()
    if(cantidad_teloneros == 0):
        return None, None

    # Artistas posibles para teloneros
    artistas_filtrados = filtrar_artistas_genero(artistas, artista)

    if(len(artistas_filtrados)==0):
        return None, None

    telonero_1 = Artista(random.choice(artistas_filtrados))

    hora_1 = random.choice([30, 45, 60, 75])

    if(cantidad_teloneros == 1 or len(artistas_filtrados) == 1):
        return Telonero(concierto.id, telonero_1.id, hora_1), None

    telonero_2 = Artista(random.choice(artistas_filtrados))

    hora_2 = hora_1*2
    
    while telonero_2.id == telonero_1.id:
        telonero_2 = Artista(random.choice(artistas_filtrados))
    
    if(telonero_1.relevancia >= telonero_2.relevancia):
        return Telonero(concierto.id, telonero_1.id, hora_1), Telonero(concierto.id, telonero_2.id, hora_2)

    return Telonero(concierto.id, telonero_2.id, hora_2), Telonero(concierto.id, telonero_1.id, hora_1)