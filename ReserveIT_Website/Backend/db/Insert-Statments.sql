
-- Adresse
INSERT INTO Adresse (id, Strasse, Hausnummer, PLZ, ort) VALUES (1, 'Gartenstrasse', '15', '72458', 'Albstadt');
INSERT INTO Adresse (id, Strasse, Hausnummer, PLZ, ort) VALUES (2, 'Johannesstr.', '3', '72458', 'Albstadt');
INSERT INTO Adresse (id, Strasse, Hausnummer, PLZ, ort) VALUES (3, 'Untere Vorstadt', '85', '72458', 'Albstadt');
INSERT INTO Adresse (id, Strasse, Hausnummer, PLZ, ort) VALUES (4, 'Poststrasse', '6', '72458', 'Albstadt');

-- Gebaude
INSERT INTO Gebaeude (id, Name, AdresseID) VALUES (1, '201', 2);
INSERT INTO Gebaeude (id, Name, AdresseID) VALUES (2, '205',4 );
INSERT INTO Gebaeude (id, Name, AdresseID) VALUES (3, '206', 3);
INSERT INTO Gebaeude (id, Name, AdresseID) VALUES (4, '207', 3);
INSERT INTO Gebaeude (id, Name, AdresseID) VALUES (5, '210', 1);

-- Etage
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (1, 'EG','..\img\201_eg.svg', 1);
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (2, '1-OG','..\img\201_og.svg', 1);
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (3, '2-OG','..\img\201_og2.svg', 1);

INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (4, 'EG', '..\img\205_eg.svg',2 );
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (5, '1-OG', '..\img\205_og.svg',2 );

INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (6, 'EG', '..\img\206_eg.svg' ,  3);
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (7, '1-OG', '..\img\206_og.svg' ,  3);
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (8, '2-OG', '..\img\206_og2.svg' ,  3);
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (9, '3-OG', '..\img\206_eg3.svg' ,  3);

INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (10, 'EG', '..\img\210_eg.svg' ,5);
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (11, '1-OG', '..\img\210_og.svg' ,5);
INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (12, '2-OG', '..\img\campusplan_raeume_albstadt.svg' ,5);

INSERT INTO Etage (id, Bezeichnung, Grundriss, GebaeudeID) VALUES (13, 'Campus_Albstadt', '..\img\210_og1.svg' ,2);

-- Raum
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (1, '016', 1);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (2, '017',4 );
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (3, '112', 3);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (4, '113', 3);
INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (5, '116', 2);

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







