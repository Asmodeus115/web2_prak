const helper = require('../helper.js');

class GalerieDao {

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

        result.Endzeit = helper.formatToGermanDateTime(helper.parseSQLDateTimeString(result.Endzeit));
        result.Startzeit = helper.formatToGermanDateTime(helper.parseSQLDateTimeString(result.Startzeit));

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Buchung';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

        for (var i = 0; i < result.length; i++) {
            result[i].Startzeit = helper.formatToGermanDateTime(helper.parseSQLDateTimeString(result[i].Startzeit));
            result[i].Endzeit = helper.formatToGermanDateTime(helper.parseSQLDateTimeString(result[i].Endzeit));
        }
        
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

    create( RaumID=null , BenutzerID=null , Startzeit=null, Endzeit=null, BuchungsCode='' ) {
        
        var sql = 'INSERT INTO Buchung (BuchungID,RaumID,BenutzerID,Startzeit,Endzeit,BuchungsCode) VALUES (?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [RaumID, BenutzerID, helper.formatToSQLDateTime(Startzeit), helper.formatToSQLDateTime(Endzeit), BuchungsCode];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(BuchungID, RaumID , BenutzerID , Startzeit = null, Endzeit = null, BuchungsCode = '') {
        var sql = 'UPDATE Buchung SET  RaumID=? , BenutzerID=?, Startzeit = ?, Endzeit =?, BuchungsCode = ? WHERE BuchungID=?';
        var statement = this._conn.prepare(sql);
        var params = [RaumID , BenutzerID ,helper.formatToSQLDateTime(Startzeit), helper.formatToSQLDateTime(Endzeit), BuchungsCode, BuchungID];
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
                throw new Error('Could not delete Record by id=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    toString() {
        console.log('GalerieDao [_conn=' + this._conn + ']');
    }
}

module.exports = GalerieDao;