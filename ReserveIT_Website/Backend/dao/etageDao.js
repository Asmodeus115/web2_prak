const helper = require('../helper.js');

class EtageDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {

        var sql = 'SELECT * FROM Etage WHERE GebaeudeID=?';
        var statement = this._conn.prepare(sql);
        var result = statement.all(id);

        console.log(result);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

/*
        var startzeit = helper.parseSQLDateTimeString(result.Startzeit);
        result.Startzeit = helper.formatToGermanDateTime(startzeit);

        var endzeit = helper.parseSQLDateTimeString(result.Endzeit);
        result.Endzeit = helper.formatToGermanDateTime(endzeit);
*/
        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Etage';
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


    loadAllGeb() {
        var sql = 'SELECT * FROM Gebaeude';
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
        var sql = 'SELECT COUNT(id) AS cnt FROM Etage WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(RaumID, BenutzerID, Startzeit, Endzeit, EtageCode) {
        var sql = 'INSERT INTO Etage (RaumID, BenutzerID, Startzeit, Endzeit, EtageCode) VALUES (?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [RaumID, BenutzerID, Startzeit, Endzeit, EtageCode];
        var result = statement.run(params);
        
        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id,RaumID, BenutzerID, Startzeit, Endzeit, EtageCode) {
        var sql = 'UPDATE Etage SET RaumID=?, BenutzerID=?, Startzeit=?, Endzeit=?, EtageCode=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [RaumID, BenutzerID, Startzeit, Endzeit, EtageCode, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Etage WHERE id=?';
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

module.exports = EtageDao;










