use TFG_JUM;
go
drop table salas
create table salas (id varchar(40) NOT NULL PRIMARY KEY, nombre varchar(80), direccion varchar(80), lat int NOT NULL, long int NOT NULL, municipio varchar(40)NOT NULL, relevancia int)

