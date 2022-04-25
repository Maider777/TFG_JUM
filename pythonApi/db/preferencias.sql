use TFG_JUM;
go
select * from preferencias
-- DELETE
drop table preferencias
-- CREATE
create table preferencias (usuario varchar(20)NOT NULL FOREIGN KEY REFERENCES usuarios(usuario), artistaId varchar(40) NOT NULL FOREIGN KEY REFERENCES artistas(id))
