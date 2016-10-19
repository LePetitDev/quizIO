'use strict';
var app = require('koa')()
  , server = require('http').createServer(app.callback())
  , io = require('socket.io')(server)
  , _ = require('underscore')
  , gzip = require('koa-gzip')
  , serve = require('koa-static')
  , Router = require('koa-router')
  , Promise = require('bluebird')
  , bodyParser = require('koa-bodyparser')
  , views = require('koa-render')
  , React = require('react/addons')
  , Quiz = require('./jsx/Quiz.jsx')
  , quizClass = require('./controllers/Quiz')
  , quizController = new quizClass()
  , env = (typeof process.env.CUSTOM_ENV === 'undefined')? 'localhost':
      (process.env.CUSTOM_ENV === 'qa')? 'qa': 'prod'
  , general = new Router();

app.use(bodyParser());

// GZIP responses.
app.use(gzip());

// Use koa-static for css, js and images.
app.use(serve(__dirname+'/public'))

// custom 404
app.use(function *(next) {
  var err;
  try {
    yield next;
  } catch (e) {
    // handle thrown 404 errors
    if (e.status !== 404) throw e;
    err = e;
  }
  // Handle "unhandled" requests, `this.status = 404`s, and 404 errors
  var status = this.status = (err && err.status) || this.status || 404
  if (status !== 404) return;

  // send a 404
  switch (this.accepts('json', 'html', 'text')) {
    case 'json':
      return this.body = {message: err ? err.message :  'page not found'}
    case 'html':
      return this.body = yield this.render('404');
  }
});

// Append a view renderer.
app.use(views('./views', {
  map: { html: 'handlebars' },
  cache: false
}));

// Redirect to the quiz.
general.get('/', function*() {
  this.redirect('/hypothetical-university/2015/fall/math-101/quiz-1');
});

io.on('connection', function (socket) {
  socket.on('quiz data from client', function(data) {
    console.log(data);
  });
});

/*
**  Get gradebook data for the quiz.
*/
general.get('/api/hypothetical-university/2015/fall/math-101/quiz-1', function*() {
  let submissions = yield *quizController.getSubmissions(this);
  let quizData = {
    'question': 'Is 1,024^2 equal to 1,048,576 ?',
    'answers': ['True', 'False'],
    'submissions': submissions
  };
  io.emit('quiz data', quizData);
  this.body = quizData;
});

/*
**  Insert a new quiz submission into the database.
**  After, broadcast the quiz submissions.
*/
general.post('/api/quiz', function*() {
  let bd = this.request.body;
  let insert = yield *quizController.postSubmission(bd.answer, bd.name, this);
  let selects = yield *quizController.getSubmissions(this);
  let quizData = {
    'question': 'Is 1,024^2 equal to 1,048,576 ?',
    'answers': ['True', 'False'],
    'submissions': selects
  };
  io.emit('quiz data', quizData);
  this.redirect('/thank-you');
});

// Render the 'thank-you-for-taking-this-quiz' page.
general.get('/thank-you', function*() {
  this.body = yield this.render('thankyou', { });
});

// This route uses server-side rendering for the quiz.
general.get('/hypothetical-university/2015/fall/math-101/quiz-1', function*() {
  var quizContent = React.renderToString(<Quiz />);
  this.body = yield this.render('quiz', {
    quiz: quizContent
  });
});

// This route uses client-side rendering for React/D3 charts.
general.get('/overview', function*() {
  this.body = yield this.render('overview', { });
});

app.use(general.middleware());

// start server
server.listen(process.env.PORT || 3000) 
