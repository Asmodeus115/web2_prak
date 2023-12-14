DROP TABLE IF EXISTS Buchung;
DROP TABLE IF EXISTS Benutzer;
DROP TABLE IF EXISTS Person;
DROP TABLE IF EXISTS Raum;
DROP TABLE IF EXISTS Gebaeude;
DROP TABLE IF EXISTS Benutzerrolle;
DROP TABLE IF EXISTS Adresse;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS HS_Mitarbeiter;
DROP TABLE IF EXISTS Etage;
DROP TABLE IF EXISTS Lageplan;

CREATE TABLE Lageplan(
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  pfad TEXT  NOT NULL
);

CREATE TABLE Adresse (
    id INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
    Strasse TEXT  NOT NULL,
    Hausnummer TEXT  NOT NULL,
    PLZ TEXT  NOT NULL,
    Ort TEXT  NOT NULL
);

CREATE TABLE Benutzerrolle (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Bezeichnung TEXT  NOT NULL
);

CREATE TABLE Gebaeude (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    AdresseID INTEGER NOT NULL,
    CONSTRAINT fk_Gebaeude1 FOREIGN KEY (AdresseID) REFERENCES Adresse(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Etage (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Bezeichnung TEXT NOT NULL,
    Grundriss TEXT NOT NULL,
    GebaeudeID  INTEGER NOT NULL, 
    CONSTRAINT fk_Etage1 FOREIGN KEY (GebaeudeID) REFERENCES Gebaeude(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Raum (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Bezeichnung TEXT NOT NULL,
    EtageID INTEGER NOT NULL,
    CONSTRAINT fk_Raum1 FOREIGN KEY (EtageID) REFERENCES Etage(id)  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Benutzer (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Benutzername TEXT  NOT NULL,
    BenutzerrolleID INTEGER,
    PersonID INTEGER  NOT NULL,
    passwort TEXT  NOT NULL,
    CONSTRAINT fk_Benutzer1 FOREIGN KEY (BenutzerrolleID) REFERENCES Benutzerrolle(id)  ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_Benutzer2 FOREIGN KEY (PersonID) REFERENCES Person(id)  ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE Person (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Vorname TEXT  NOT NULL,
    Nachname TEXT  NOT NULL,
    AdresseID INTEGER  NOT NULL,
    CONSTRAINT fk_Person1  FOREIGN KEY (AdresseID) REFERENCES Adresse(id)  ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE Buchung (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    RaumID INTEGER  NOT NULL,
    BenutzerID INTEGER  NOT NULL,
    Startzeit TEXT  NOT NULL,
    Endzeit TEXT  NOT NULL,
    BuchungCode TEXT  NOT NULL,
    ZellenSpalte TEXT  NOT NULL,
    ZellenZeile TEXT  NOT NULL,
    CONSTRAINT fk_Buchung1 FOREIGN KEY (RaumID) REFERENCES Raum(id)  ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_Buchung2 FOREIGN KEY (BenutzerID) REFERENCES Benutzer(id)  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Student (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Semester NUMERIC  NOT NULL,
    Fakultät TEXT  NOT NULL,
    Studiengang TEXT  NOT NULL,
    RollenID INTEGER  NOT NULL,
    CONSTRAINT fk_Student1  FOREIGN KEY (RollenID) REFERENCES Benutzerrolle(id)  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE HS_Mitarbeiter (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Fakultät TEXT  NOT NULL,
    Abteilung TEXT  NOT NULL,
    Fach TEXT  NOT NULL,
    RollenID INTEGER  NOT NULL,
    CONSTRAINT fk_Student1  FOREIGN KEY (RollenID) REFERENCES Benutzerrolle(id)  ON DELETE CASCADE ON UPDATE CASCADE
);
