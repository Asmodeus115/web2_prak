const helper = require('../helper.js');

class BuchungDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM Buchung WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);


        var startzeit = helper.parseSQLDateTimeString(result.Startzeit);
        result.Startzeit = helper.formatToGermanDateTime(startzeit);

        var endzeit = helper.parseSQLDateTimeString(result.Endzeit);
        result.Endzeit = helper.formatToGermanDateTime(endzeit);

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Buchung';
        var statement = this._conn.prepare(sql);
        var result = statement.all();


        if (helper.isArrayEmpty(result)) 
            return [];
/*
        for (var i = 0; i < result.length; i++) {
            var startzeit = helper.parseSQLDateTimeString(result[i].Startzeit);
            result[i].Startzeit = helper.formatToGermanDateTime(startzeit);

            var endzeit = helper.parseSQLDateTimeString(result[i].Endzeit);
            result[i].Endzeit = helper.formatToGermanDateTime(endzeit);
        }
*/
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Buchung WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(RaumID, BenutzerID, Startzeit, Endzeit, BuchungCode) {
        var sql = 'INSERT INTO Buchung (RaumID, BenutzerID, Startzeit, Endzeit, BuchungCode) VALUES (?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [RaumID, BenutzerID, Startzeit, Endzeit, BuchungCode];
        var result = statement.run(params);
        
        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id,RaumID, BenutzerID, Startzeit, Endzeit, BuchungCode) {
        var sql = 'UPDATE Buchung SET RaumID=?, BenutzerID=?, Startzeit=?, Endzeit=?, BuchungCode=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [RaumID, BenutzerID, Startzeit, Endzeit, BuchungCode, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Buchung WHERE id=?';
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
        console.log('MenschDao [_conn=' + this._conn + ']');
    }


}

module.exports = BuchungDao;










