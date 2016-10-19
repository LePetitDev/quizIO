var path = require('path')
  , moment = require('moment-timezone')
  , Promise = require('bluebird')
  , pg = require('pg')
  , fs = require('fs')
  , env = (typeof process.env.CUSTOM_ENV === 'undefined')? 'localhost':
      (process.env.CUSTOM_ENV === 'qa')? 'qa': 'prod'
  , utilController = require('./Util')
  , util = new utilController();

class Quiz {
  /*
   *  Promisify postgres functions (make them run async and non-blocking).
  */
  constructor() {
    Promise.promisifyAll(pg);
  }
  
  /*
   *  Insert a quiz submission into PostgreSQL.
  */
  *postSubmission(answer, userName, ctx) {
    const connString = util.dbConnectionString(env);
    
    var errors = []; 
    var postgres = yield pg.connectAsync(connString).spread(function(connection, release) { return {'connection':connection, 'disconnect':release}; });
    var insert = yield postgres.connection.queryAsync(
      'insert into submissions (question_id, answer, user_name) values ($1, $2, $3) returning *', [1, answer, userName]
    ).catch(function(error) {
      switch(error.cause.constraint) {
        case 'submissions_user_name_key':
          errors.push('duplicateUser');
        break;
        default:
          errors.push(error.cause.constraint);
        break;
      }
    });    
    postgres.disconnect();
  }

  /*
   * Get all quiz submissions.
  */
  *getSubmissions(ctx) {
    const connString = util.dbConnectionString(env);
    var postgres = yield pg.connectAsync(connString).spread(function(connection, release) { return {'connection':connection, 'disconnect':release}; });
    var submissions = [];
    let select = yield postgres.connection.queryAsync(
      'select s.answer, s.user_name as name, s.create_time from submissions s where s.question_id = $1 order by s.create_time asc',
      [1]
    ).catch(function(error) {
      console.log(error);
    });
    if (typeof select !== 'undefined' && select.rowCount !== 0) {
      for (let i=0; i<select.rowCount; i++) {
        if (select.rows[i].answer.toLowerCase() === 'false') {
          select.rows[i].rating = 'Fail';
        }
        else {
          select.rows[i].rating = 'Pass';
        }
        delete select.rows[i].answer;
        // Arrange the data into a format that the chart components expect.
        select.rows[i].create_time = moment.tz(select.rows[i].create_time, 'America/New_York').format();
        select.rows[i].create_time = JSON.parse(JSON.stringify(select.rows[i].create_time));
      }
      submissions = select.rows;
    }
    postgres.disconnect();
    return submissions;
  }

}

module.exports = Quiz;
