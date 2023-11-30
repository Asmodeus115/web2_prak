const helper = require('../helper.js');

class BenutzerDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM Benutzer WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Benutzer';
        var statement = this._conn.prepare(sql);
        var result = statement.all();


        if (helper.isArrayEmpty(result)) 
            return [];

        return result;
    }

    exists(id, passwort) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Benutzer WHERE id=? AND passwort=?';
        var statement = this._conn.prepare(sql);
        var params = [id, passwort];
        var result = statement.get(params);


        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(Benutzername, BenutzerrolleID, PersonID, passwort) {
        var sql = 'INSERT INTO Benutzer (Benutzername, BenutzerrolleID, PersonID, passwort) VALUES (?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [Benutzername, BenutzerrolleID, PersonID, passwort];
        var result = statement.run(params);
        
        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, Benutzername, BenutzerrolleID, PersonID, passwort) {
        var sql = 'UPDATE Benutzer SET Benutzername=?, BenutzerrolleID=?, PersonID=?, passwort=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [Benutzername, BenutzerrolleID, PersonID, passwort, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Benutzer WHERE id=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Could not delete Record by PersonID=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by PersonID=' + id + '. Reason: ' + ex.message);
        }
    }

    toString() {
        console.log('BenutzerDAO [_conn=' + this._conn + ']');
    }


}

module.exports = BenutzerDao;










