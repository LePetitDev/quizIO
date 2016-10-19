'use strict';

const alt = new Alt();
const quizActions = alt.createActions(QuizActions);
const quizStore = alt.createStore(QuizStore);
const socket = io.connect(); 

const io_lib = (function () {

  // This is called once on page load.
  let getQuizDataOnce = function() {
    $.ajax({
      type: 'GET',
      url: '/api/hypothetical-university/2015/fall/math-101/quiz-1',
      cache: false,
      dataType: 'json'
    }).always(function () {
    }).done(function (data, text, xhr) {
      // Do something here.
    }).fail(function (xhr, text, err) {
      // Do something here.
    });
  };

  let API = {
    update: function update() {
      if (io_lib.isStudentListMounted && io_lib.isGaugeChartMounted && io_lib.isVolumeChartMounted && io_lib.isPieChartMounted) {

        // Listen for changes to the data.
        socket.on('quiz data', function(data) {
          if (typeof data.submissions !== 'undefined' && data.submissions.length) {
            quizActions.updateQuiz(data.submissions);
          }

          // Trigger an event in response.
          socket.emit('quiz data from client', 'A client has received data!');
        });

        // Get the data once.
        getQuizDataOnce();

      }
    },
    isGaugeChartMounted: false,
    isVolumeChartMounted: false,
    isPieChartMounted: false,
    isStudentListMounted: false
  };

  return API;

})();
