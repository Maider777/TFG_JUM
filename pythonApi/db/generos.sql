use TFG_JUM;
go
select * from generos
-- DELETE
drop table generos
-- CREATE
create table generos (id varchar(10) NOT NULL PRIMARY KEY, nombre varchar(30)NOT NULL)
-- INSERT
insert into generos 
values  
        ('alter', 'Alternativo'),
        ('blues', 'Blues'),
        ('country', 'Country'),
        ('electro', 'Electrónica'),
        ('flamenco', 'Flamenco'),
        ('funk', 'Funk'),
        ('hardrock', 'Hard Rock'),
        ('heavy', 'Heavy Metal'),
        ('indie', 'Indie'),
        ('jazz', 'Jazz'),
        ('latino', 'Latino'),
        ('pop', 'Pop'),
        ('punk', 'Punk'),
        ('rock', 'Rock `n Roll'),
        ('ryb', 'Rythm and Blues'),
        ('ska', 'Ska'),
        ('soul', 'Soul'),
        ('garage', 'Garage Rock'),
        ('rumba', 'Rumba'),
        ('electropop', 'Pop Electrónico'),
        ('glam', 'Glam'),
        ('trashmetal', 'Trash Metal'),
        ('reggaerock', 'Reggae Rock'),
        ('reggae', 'Reggae'),
        ('punkrock', 'Punk Rock'),
        ('bluesrock', 'Blues Rock'),
        ('dancerock', 'Dance Rock'),
        ('poprock', 'Pop Rock'),
        ('skapunk', 'Ska Punk'),
        ('skarock', 'Ska Rock'),
        ('celta', 'Celta'),
        ('folk', 'Folk'),
        ('progre', 'Progresivo'),
        ('sympho', 'Sinfónico'),
        ('gospel', 'Gospel'),
        ('disco', 'Disco');