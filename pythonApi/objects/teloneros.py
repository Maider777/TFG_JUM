class Telonero(object):
    conciertoId = ""
    artistaId = ""
    fecha = ""

    # The class "constructor" - It's actually an initializer 
    def __init__(self, conciertoId, artistaId, fecha):
        self.conciertoId = conciertoId
        self.artistaId = artistaId
        self.fecha = fecha

    def __str__(self):
        return "Telonero: {} del concierto {} tocará {} minutos antes".format(self.artistaId, self.conciertoId, self.fecha)
