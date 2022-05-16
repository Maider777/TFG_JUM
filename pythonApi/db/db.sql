use TFG_JUM;
go
/* Eliminar tablas */
EXEC sp_msforeachtable "ALTER TABLE ? NOCHECK CONSTRAINT all"

DECLARE @sql NVARCHAR(max)=''

SELECT @sql += ' Drop table ' + QUOTENAME(TABLE_SCHEMA) + '.'+ QUOTENAME(TABLE_NAME) + '; '
FROM   INFORMATION_SCHEMA.TABLES
WHERE  TABLE_TYPE = 'BASE TABLE'

Exec Sp_executesql @sql

/* Crear tablas */
create table usuarios (usuario varchar(20) NOT NULL PRIMARY KEY, contrasena varchar(16) NOT NULL, nombre varchar(20) NOT NULL, apellido varchar(20) NOT NULL, email varchar(30) NOT NULL, fnac DATE)
create table tokens (usuario varchar(20)NOT NULL FOREIGN KEY REFERENCES usuarios(usuario) UNIQUE, token varchar(289))

create table artistas (id varchar(40) NOT NULL PRIMARY KEY, nombre varchar(50) NOT NULL, imagen_url varchar(MAX), descripcion varchar(MAX), generos varchar(100) NOT NULL, relevancia int)
create table preferencias (usuario varchar(20)NOT NULL FOREIGN KEY REFERENCES usuarios(usuario), artistaId varchar(40) NOT NULL FOREIGN KEY REFERENCES artistas(id), PRIMARY KEY (usuario, artistaId))
create table salas (id varchar(40) NOT NULL PRIMARY KEY, nombre varchar(80), direccion varchar(80), lat float NOT NULL, long float NOT NULL, municipio varchar(40)NOT NULL, relevancia int)
create table conciertos (id varchar(40) NOT NULL PRIMARY KEY, artistaId varchar(40) NOT NULL FOREIGN KEY REFERENCES artistas(id), salaId varchar(40) NOT NULL FOREIGN KEY REFERENCES salas(id), fecha datetime NOT NULL, precio_min float NOT NULL, precio_max float NOT NULL)
create table teloneros (artistaId varchar(40)NOT NULL FOREIGN KEY REFERENCES artistas(id), conciertoId varchar(40) NOT NULL FOREIGN KEY REFERENCES conciertos(id), fecha INT)

create table compras (compraId varchar(40) NOT NULL, usuario varchar(20)NOT NULL FOREIGN KEY REFERENCES usuarios(usuario), conciertoId varchar(40) NOT NULL FOREIGN KEY REFERENCES conciertos(id), fecha datetime NOT NULL, cantidad INT NOT NULL, precio float NOT NULL, PRIMARY KEY (compraId, conciertoId))

use TFG_JUM
GO
select * from artistas