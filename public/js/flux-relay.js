'use strict';

// Use Alt.js for Flux. Instanstiate Flux actions and stores.
var alt = new Alt();
var quizActions = alt.createActions(QuizActions);
var quizStore = alt.createStore(QuizStore);
var socket = io.connect();

// Use this as a placeholder for what will be replaced by Relay.
// http://facebook.github.io/react/blog/2015/08/11/relay-technical-preview.html
var Relay = (function () {

  var getQuizData = function getQuizData() {
    $.ajax({
      type: 'GET',
      url: '/api/hypothetical-university/2015/fall/math-101/quiz-1',
      cache: false,
      dataType: 'json'
    }).always(function () {}).done(function (data, text, xhr) {
      if (typeof data.submissions !== 'undefined' && data.submissions.length) {
        quizActions.updateQuiz(data.submissions);
      }
    }).fail(function (xhr, text, err) {});
  };

  var API = {
    update: function update() {
      if (Relay.isStudentListMounted && Relay.isGaugeChartMounted && Relay.isVolumeChartMounted && Relay.isPieChartMounted) {
        getQuizData();
        /*
        window.setInterval(function () {
          getQuizData();
        }, 10000);
        */
        socket.on('quiz data', function (data) {
          if (typeof data.submissions !== 'undefined' && data.submissions.length) {
            quizActions.updateQuiz(data.submissions);
          }
        });
      }
    },
    isGaugeChartMounted: false,
    isVolumeChartMounted: false,
    isPieChartMounted: false,
    isStudentListMounted: false
  };

  return API;
})();