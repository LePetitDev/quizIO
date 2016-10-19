# quizIO
This project's purpose is to demonstrate the use of Socket.IO.

How to Run
----------

Download the latest installer for PostgreSQL. On a Mac, the installer will install the PostgreSQL database as well as a GUI application, PGAdmin, for creating databases, tables, and queries.
http://www.enterprisedb.com/products-services-training/pgdownload

1. in PGAdmin, create a user, password, and a database. Take note of these and put them in the dbConnectionString method, which is found in controllers/Util.js.
2. In PGAdmin, run the following queries in your database.
```
CREATE TABLE questions (
  question_id serial primary key NOT NULL,
  question text NOT NULL,
  create_time timestamptz NOT NULL DEFAULT NOW()
);
CREATE TABLE answers (
  answer_id serial primary key NOT NULL,
  question_id int references questions(question_id) NOT NULL,
  answer text NOT NULL,
  is_correct boolean default false,
  create_time timestamptz NOT NULL DEFAULT NOW()
);
CREATE TABLE submissions (
  submission_id serial primary key NOT NULL,
  question_id int references questions(question_id) NOT NULL,
  answer text NOT NULL,
  user_name varchar(256) NOT NULL UNIQUE,
  create_time timestamptz NOT NULL DEFAULT NOW()
);
insert into questions (question) values ('Is 1024^2 equal to 1048576 ?') returning *;
insert into answers (question_id, answer, is_correct) values (1, 'True', true) returning *;
insert into answers (question_id, answer, is_correct) values (1, 'False', false) returning *;
```

Then, to start the app, run nodemon --harmony --watch app.js entrypoint.js

Notes
-----
Go to the following URL to see the server-rendered react component (a sample quiz): 
http://localhost:3000

Go to the following URL to see the real-time dashboard for quiz results:
http://localhost:3000/overview
