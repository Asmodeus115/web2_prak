
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
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (210102, '210-002', 2101);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (210102, '210-102', 2102);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (210112, '210-112', 2102);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (210202, '210-202', 2103);



INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (205002, '205-002', 2051);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (205102, '205-017', 2051);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (205112, '205-112', 2052);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (205135, '205-135', 2052);

INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (206002, '206-002', 2061);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (206102, '206-102', 2062);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (206202, '206-202', 2063);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (206312, '206-312', 2064);

INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (201002, '201-002', 2101);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (201102, '201-102', 2102);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (201212, '201-212', 2103);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (201302, '201-302', 2104);

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





