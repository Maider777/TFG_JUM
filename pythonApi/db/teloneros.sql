/* CREAR TABLA TELONEROS */
use TFG_JUM;
go
drop table teloneros
create table teloneros (artistaId varchar(40)NOT NULL FOREIGN KEY REFERENCES artistas(id), conciertoId varchar(40) NOT NULL FOREIGN KEY REFERENCES conciertos(id), fecha int)

use TFG_JUM;
go
select * from teloneros