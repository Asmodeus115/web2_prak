const sqlite3 = require('sqlite3').verbose();

// Verbindung zur Datenbank herstellen (wird die Datenbank nicht vorhanden, wird sie erstellt)
const db = new sqlite3.Database('ReserveIT_db_v2.sqlite');

// Tabelle erstellen (wenn sie noch nicht existiert)

db.run(`
    CREATE TABLE IF NOT EXISTS Raum (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )
`);

const anzahlEintraege = 9;
const EtageID = 1;

// Schleife zum Hinzufügen von x Einträgen
for (let i = 0; i < anzahlEintraege; i++) {
    const id = `205$00${i + 1}`;  // Beispielname für den Raum
    const Bezeichnung = `205-00${i + 1}`;
    db.run('INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (?,?,?)', [id, Bezeichnung, EtageID]);
    
    db.run('INSERT INTO Raum (id, Bezeichnung, EtageID) VALUES (?,?,?)', [id, Bezeichnung, EtageID]);
}

// Datenbankverbindung schließen, wenn die Schleife abgeschlossen ist
db.close();
