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

    exists(id, passwort) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Benutzer WHERE id=? AND passwort=?';
        var statement = this._conn.prepare(sql);
        var params = [id, passwort];
        var result = statement.get(params);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    toString() {
        console.log('BenutzerDAO [_conn=' + this._conn + ']');
    }
}

module.exports = BenutzerDao;










