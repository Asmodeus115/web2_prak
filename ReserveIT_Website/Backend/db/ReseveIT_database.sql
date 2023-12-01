

CREATE TABLE Adresse (
    AdresseID INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
    Strasse TEXT  NOT NULL,
    Hausnummer TEXT  NOT NULL,
    PLZ TEXT  NOT NULL,
    Ort TEXT  NOT NULL
);

CREATE TABLE Benutzerrolle (
    BenutzerrolleID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Bezeichnung TEXT  NOT NULL
);

CREATE TABLE Gebaeude (
    GebaeudeID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    AdresseID INTEGER NOT NULL,
    CONSTRAINT fk_Gebaeude1 FOREIGN KEY (AdresseID) REFERENCES Adresse(AdresseID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Raum (
    RaumID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    GebaeudeID INTEGER NOT NULL,
    CONSTRAINT fk_Raum1 FOREIGN KEY (GebaeudeID) REFERENCES Gebaeude(GebaeudeID)  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Benutzer (
    BenutzerID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Benutzername TEXT  NOT NULL,
    BenutzerrolleID INTEGER,
    PersonID INTEGER  NOT NULL,
    CONSTRAINT fk_Benutzer1 FOREIGN KEY (BenutzerrolleID) REFERENCES Benutzerrolle(BenutzerrolleID)  ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_Benutzer2 FOREIGN KEY (PersonID) REFERENCES Person(PersonID)  ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE Person (
    PersonID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Vorname TEXT  NOT NULL,
    Nachname TEXT  NOT NULL,
    AdresseID INTEGER  NOT NULL,
    CONSTRAINT fk_Person1  FOREIGN KEY (AdresseID) REFERENCES Adresse(AdresseID)  ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE Buchung (
    BuchungID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    RaumID INTEGER  NOT NULL,
    BenutzerID INTEGER  NOT NULL,
    Startzeit TEXT  NOT NULL,
    Endzeit TEXT  NOT NULL,
    BuchungCode TEXT  NOT NULL,
    CONSTRAINT fk_Buchung1 FOREIGN KEY (RaumID) REFERENCES Raum(RaumID)  ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_Buchung2 FOREIGN KEY (BenutzerID) REFERENCES Benutzer(BenutzerID)  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Student (
    Matrikelnr INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Semester NUMERIC  NOT NULL,
    Fakultät TEXT  NOT NULL,
    Studiengang TEXT  NOT NULL,
    RollenID INTEGER  NOT NULL,
    CONSTRAINT fk_Student1  FOREIGN KEY (RollenID) REFERENCES Benutzerrolle(BenutzerrolleID)  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE HS_Mitarbeiter (
    PersonalNr INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Fakultät TEXT  NOT NULL,
    Abteilung TEXT  NOT NULL,
    Fach TEXT  NOT NULL,
    RollenID INTEGER  NOT NULL,
    CONSTRAINT fk_Student1  FOREIGN KEY (RollenID) REFERENCES Benutzerrolle(BenutzerrolleID)  ON DELETE CASCADE ON UPDATE CASCADE
);