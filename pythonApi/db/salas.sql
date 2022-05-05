use TFG_JUM;
go
drop table if exists teloneros
drop table conciertos
drop table salas
create table salas (id varchar(40) NOT NULL PRIMARY KEY, nombre varchar(80), direccion varchar(80), lat float NOT NULL, long float NOT NULL, municipio varchar(40)NOT NULL, relevancia int)

use TFG_JUM;
go
SELECT DATEADD(dd, 0, DATEDIFF(dd, 0, conciertos.fecha)) as fecha, conciertos.id from conciertos where conciertos.salaId = 'doka_donostia' and DATEDIFF(day, fecha,'2022-06-25') =0
