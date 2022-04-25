/* CREAR TABLA TELONEROS */
use TFG_JUM;
go
drop table teloneros
create table teloneros (artista varchar(40)NOT NULL FOREIGN KEY REFERENCES artistas(id), concierto varchar(40) NOT NULL FOREIGN KEY REFERENCES conciertos(id), fecha DATE)
