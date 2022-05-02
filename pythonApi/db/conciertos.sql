use TFG_JUM;
go
drop table conciertos
create table conciertos (id varchar(40) NOT NULL PRIMARY KEY, artistaId varchar(40) NOT NULL FOREIGN KEY REFERENCES artistas(id), salaId varchar(40) NOT NULL FOREIGN KEY REFERENCES salas(id), fecha date NOT NULL, precio_min int NOT NULL, precio_max int NOT NULL)

use TFG_JUM;
go
insert into conciertos
(id, artistaId, salaId, fecha, precio_min, precio_max) 
values('idconcierto1', 'UCBDXpukZYpWw54QCbEGdsZw', 'honkytonk_madrid', '2022-6-20 22:00:44', 35, 50);