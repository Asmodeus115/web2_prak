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

        return result;
    }

    loadAllGeb() {
        var sql = 'SELECT * FROM Gebaeude';
        var statement = this._conn.prepare(sql);
        var result = statement.all();


        if (helper.isArrayEmpty(result)) 
            return [];
        return result;
    }

    toString() {
        console.log('MenschDao [_conn=' + this._conn + ']');
    }

}

module.exports = EtageDao;










