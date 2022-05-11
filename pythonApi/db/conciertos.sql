use TFG_JUM;
go
drop table if exists teloneros
drop table conciertos
create table conciertos (id varchar(40) NOT NULL PRIMARY KEY, artistaId varchar(40) NOT NULL FOREIGN KEY REFERENCES artistas(id), salaId varchar(40) NOT NULL FOREIGN KEY REFERENCES salas(id), fecha datetime NOT NULL, precio_min float NOT NULL, precio_max float NOT NULL)
create table teloneros (artistaId varchar(40)NOT NULL FOREIGN KEY REFERENCES artistas(id), conciertoId varchar(40) NOT NULL FOREIGN KEY REFERENCES conciertos(id), fecha INT)

use TFG_JUM;
go
SELECT DATEADD(dd, 0, DATEDIFF(dd, 0, conciertos.fecha)) as fecha, conciertos.id from conciertos where conciertos.artistaId = 'UCoymDyyaLqjMbAckW2G07qw' and DATEDIFF(day, fecha,'2022-12-25 18:00:00') =0

use TFG_JUM;
go
SELECT DATEADD(dd, 0, DATEDIFF(dd, 0, conciertos.fecha)) as fecha, conciertos.id from conciertos where conciertos.salaId = 'doka_donostia' and DATEDIFF(day, fecha,'2022-06-25') >=0

USE TFG_JUM
GO
select * from conciertos where artistaId = 'UCVY2na9iDAShVRRKWYMC10g'

use TFG_JUM;
go
insert into conciertos
(id, artistaId, salaId, fecha, precio_min, precio_max) 
values('idconcierto2', 'UCBDXpukZYpWw54QCbEGdsZw', 'doka_donostia', '2022-6-25 22:00:44', 35, 50);