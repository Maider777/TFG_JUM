use TFG_JUM;
go
select * from preferencias
-- DELETE
drop table preferencias
-- CREATE
create table preferencias (id varchar(40) NOT NULL PRIMARY KEY, usuario varchar(20)NOT NULL FOREIGN KEY REFERENCES usuarios(usuario), generoId varchar(10) NOT NULL FOREIGN KEY REFERENCES generos(id))
