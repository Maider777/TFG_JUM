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

    # def __init__(self, id, nombre, imagen_url, descripcion):
    #     self.id = id
    #     self.nombre = nombre
    #     self.imagen_url = imagen_url
    #     self.descripcion = descripcion
    #     self.generos = "generos"
    #     self.relevancia = 1