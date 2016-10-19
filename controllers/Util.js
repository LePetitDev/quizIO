var _ = require('underscore');
class Util {

    contructor() {
    }

    dbConnectionString(env) {
        var user = '',
        password = '',
        dbName = '',
        dbString = '';  // Leave blank. It will be populated in the following switch statement.
        switch(env) {
            case 'qa':
            case 'localhost':
            case 'prod':
                dbString = 'postgres://' + user + ':' + password + '@localhost/' + dbName;
            break;
        }
        return dbString;
    }
}

module.exports = Util;
