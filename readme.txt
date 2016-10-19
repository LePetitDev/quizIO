**Run the following to download most of the dependencies:
npm init

**Install nodemon (global install is recommended)
npm install -g nodemon

**Install PostgreSQL
brew install postgresql (easy way to intall it on a mac)

**Install pgAdmin (PostgreSQL GUI tool)
http://www.pgadmin.org/download/macosx.php

**In pgAdmin, set up a user, password, and a database for the user,
and update add these values in the user, password and dbName variables in controllers/Util.js

**In your DB, run the following SQL statements to set up the necessary tables and rows.
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

**Run the following to start the app server:
nodemon --harmony --watch app.js entrypoint.js

**Go to the following URL to see the server-rendered react componet (it's a quiz): 
http://localhost:3000

**Go to the following URL to see the dashboard for the quiz results:
http://localhost:3000/overview

**Go to the following URL to see a webcam component:
http://localhost:3000/webcam

**If editing code, run the following command while editing to compile scss / es6(js) / jsx(react):
gulp watch

Feel free to check out more React components at https://react.parts