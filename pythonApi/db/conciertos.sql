use TFG_JUM;
go
drop table teloneros
drop table conciertos
create table conciertos (id varchar(40) NOT NULL PRIMARY KEY, artistaId varchar(40) NOT NULL FOREIGN KEY REFERENCES artistas(id), salaId varchar(40) NOT NULL FOREIGN KEY REFERENCES salas(id), fecha datetime NOT NULL, precio_min int NOT NULL, precio_max int NOT NULL)

use TFG_JUM;
go
select * from conciertos

use TFG_JUM;
go
SELECT DATEADD(dd, 0, DATEDIFF(dd, 0, conciertos.fecha)) as fecha from conciertos where conciertos.artistaId = 'UCBDXpukZYpWw54QCbEGdsZw'

use TFG_JUM;
go
insert into conciertos
(id, artistaId, salaId, fecha, precio_min, precio_max) 
values('idconcierto2', 'UCBDXpukZYpWw54QCbEGdsZw', 'doka_donostia', '2022-6-25 22:00:44', 35, 50);