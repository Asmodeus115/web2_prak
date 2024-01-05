
-- Adresse
INSERT INTO Adresse (id, Strasse, Hausnummer, PLZ, ort) VALUES (1, 'Gartenstrasse', '15', '72458', 'Albstadt');
INSERT INTO Adresse (id, Strasse, Hausnummer, PLZ, ort) VALUES (2, 'Johannesstr.', '3', '72458', 'Albstadt');
INSERT INTO Adresse (id, Strasse, Hausnummer, PLZ, ort) VALUES (3, 'Untere Vorstadt', '85', '72458', 'Albstadt');
INSERT INTO Adresse (id, Strasse, Hausnummer, PLZ, ort) VALUES (4, 'Poststrasse', '6', '72458', 'Albstadt');


-- Gebaude
INSERT INTO Gebaeude (id, Name, AdresseID) VALUES (210, 'Gartenstrasse', 1);
INSERT INTO Gebaeude (id, Name, AdresseID) VALUES (201, 'Johannesstr', 2);
INSERT INTO Gebaeude (id, Name, AdresseID) VALUES (206, 'Untere Vorstadt', 3);
INSERT INTO Gebaeude (id, Name, AdresseID) VALUES (205, 'Haux Gebäude',4 );


-- Etage
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (2011, 'EG','..\img\201_1.svg', 201);
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (2012, '1-OG','..\img\201_2.svg', 201);
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (2013, '2-OG','..\img\201_3.svg', 201);

INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (2051, 'EG', '..\img\205_1.svg', 205 );
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (2052, '1-OG', '..\img\205_2.svg', 205 );

INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (2061, 'EG', '..\img\206_1.svg' ,  206);
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (2062, '1-OG', '..\img\206_2.svg' ,  206);
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (2063, '2-OG', '..\img\206_3.svg' ,  206);
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (2064, '3-OG', '..\img\206_4.svg' ,  206);

INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (2101, 'EG', '..\img\210_1.svg' ,210);
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (2102, '1-OG', '..\img\210_2.svg' ,210);
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (2103, '2-OG', '..\img\201_3.svg' ,210);

--INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (1, 'Campus_Albstadt', '..\img\campusplan_raeume_albstadt.svg', 2);


-- Raum

-- 201-EG
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 201005 , '201-005' , 2011);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 201006 , '201-006' , 2011);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 201007 , '201-007' , 2011);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 201014 , '201-014' , 2011);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 201017 , '201-017' , 2011);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 201018 , '201-018' , 2011);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 201021 , '201-021' , 2011);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 201022 , '201-022' , 2011);
-- 201-1.OG
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 201102 , '201-102' , 2012);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 201103 , '201-103' , 2012);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 201112 , '201-112' , 2012);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 201113 , '201-113' , 2012);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 201109 , '201-109' , 2012);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 201114 , '201-114' , 2012);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 201116 , '201-116' , 2012);
-- 201-2.OG

--------------------------------------------------------------------------------
-- 205 - EG
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 205017 , '205-017' , 2051);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 205018 , '205-018' , 2051);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 205019 , '205-019' , 2051);
-- 205 - 1.OG
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 205135 , '205-135' , 2052);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 205136 , '205-136' , 2052);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 205137 , '205-137' , 2052);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 205141 , '205-141' , 2052);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 205142 , '205-142' , 2052);
--------------------------------------------------------------------------------

-- 206 - EG
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206021 , '206-021' , 2061);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206022 , '206-022' , 2061);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206023 , '206-023' , 2061);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206024 , '206-024' , 2061);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206025 , '206-025' , 2061);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206029 , '206-029' , 2061);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206044 , '206-044' , 2061);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206045 , '206-045' , 2061);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206046 , '206-046' , 2061);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206047 , '206-047' , 2061);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206048 , '206-048' , 2061);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206049 , '206-049' , 2061);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206050 , '206-050' , 2061);
-- 206 - 1.OG
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206103 , '206-103' , 2062);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206105 , '206-105' , 2062);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206106 , '206-106' , 2062);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206107 , '206-107' , 2062);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206108 , '206-108' , 2062);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206109 , '206-109' , 2062);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206111 , '206-111' , 2062);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206112 , '206-112' , 2062);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206116 , '206-116' , 2062);
-- 206 - 2.OG
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206201 , '206-201' , 2063);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206203 , '206-203' , 2063);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206204 , '206-204' , 2063);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206205 , '206-205' , 2063);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206206 , '206-206' , 2063);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206211 , '206-211' , 2063);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206221 , '206-221' , 2063);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206222 , '206-222' , 2063);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206223 , '206-223' , 2063);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206224 , '206-224' , 2063);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206225 , '206-225' , 2063);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206226 , '206-226' , 2063);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206229 , '206-229' , 2063);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206230 , '206-230' , 2063);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206231 , '206-231' , 2063);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206232 , '206-232' , 2063);
-- 206 - 3.OG
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206301 , '206-301' , 2064);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206303 , '206-303' , 2064);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206304 , '206-304' , 2064);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206305 , '206-305' , 2064);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206306 , '206-306' , 2064);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 206311 , '206-311' , 2064);
--------------------------------------------------------------------------------
-- 210 - EG
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 210002 , '210-002' , 2101);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 210003 , '210-003' , 2101);
-- 210 - 1.OG
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 210101 , '210-101' , 2102);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 210102 , '210-102' , 2102);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES ( 210103 , '210-103' , 2102);
-- 210 - 2.OG
--------------------------------------------------------------------------------

--- Person

INSERT INTO Person ( id, Vorname, Nachname, AdresseID) VALUES (1, 'Max', 'Mustermann',  1);
INSERT INTO Person ( id, Vorname, Nachname, AdresseID) VALUES (2, 'Erika', 'Mustermann', 2 );
INSERT INTO Person ( id, Vorname, Nachname, AdresseID) VALUES (3, 'Johannes','Schmidt', 2);
INSERT INTO Person ( id, Vorname, Nachname, AdresseID) VALUES (4, 'Maria','Mueller', 4);
INSERT INTO Person ( id, Vorname, Nachname, AdresseID) VALUES (5, 'Thomas','Meyer', 2 );
INSERT INTO Person ( id, Vorname, Nachname, AdresseID) VALUES (6, 'Julia','Schneider', 3);
INSERT INTO Person ( id, Vorname, Nachname, AdresseID) VALUES (7, 'Robert','Fischer', 1);
INSERT INTO Person ( id, Vorname, Nachname, AdresseID) VALUES (8, 'Anna','Weber', 2);
INSERT INTO Person ( id, Vorname, Nachname, AdresseID) VALUES (9, 'Michael','Schulz', 3);
INSERT INTO Person ( id, Vorname, Nachname, AdresseID) VALUES (10, 'Laura','Wagner', 1);




---  Benutzer
INSERT INTO Benutzer (id, Benutzername, BenutzerrolleID, PersonID, passwort) VALUES (12345, 'max', 1, 1, 'passwort1');
INSERT INTO Benutzer (id, Benutzername, BenutzerrolleID, PersonID, passwort) VALUES (23456, 'erika', 2, 2, 'passwort2');
INSERT INTO Benutzer (id, Benutzername, BenutzerrolleID, PersonID, passwort) VALUES (34567, 'johannes', 3, 3, 'passwort3');
INSERT INTO Benutzer (id, Benutzername, BenutzerrolleID, PersonID, passwort) VALUES (45678, 'maria', 1, 4, 'passwort4');
INSERT INTO Benutzer (id, Benutzername, BenutzerrolleID, PersonID, passwort) VALUES (56789, 'thomas', 2, 5, 'passwort5');
INSERT INTO Benutzer (id, Benutzername, BenutzerrolleID, PersonID, passwort) VALUES (67890, 'julia', 3, 6, 'passwort6');
INSERT INTO Benutzer (id, Benutzername, BenutzerrolleID, PersonID, passwort) VALUES (78901, 'robert', 1, 7, 'passwort7');
INSERT INTO Benutzer (id, Benutzername, BenutzerrolleID, PersonID, passwort) VALUES (89012, 'anna', 2, 8, 'passwort8');
INSERT INTO Benutzer (id, Benutzername, BenutzerrolleID, PersonID, passwort) VALUES (90123, 'michael', 3, 9, 'passwort9');
INSERT INTO Benutzer (id, Benutzername, BenutzerrolleID, PersonID, passwort) VALUES (11234, 'student1', 1, 10, 'passwort10');




INSERT INTO Benutzerrolle (id, Bezeichnung) VALUES (1, 'Student');
INSERT INTO Benutzerrolle (id, Bezeichnung) VALUES (2, 'Professor' );
INSERT INTO Benutzerrolle (id, Bezeichnung) VALUES (3, 'Mitarbeiter');
INSERT INTO Benutzerrolle (id, Bezeichnung) VALUES (4, 'Sonstiges');

INSERT INTO Lageplan(id, pfad) VALUES (1, '../img/campusplan_raeume_albstadt.svg');





