// The store responds to events from the actions.
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuizStore = (function () {
  function QuizStore() {
    _classCallCheck(this, QuizStore);

    this.quiz = [];
    // Bind our action handler to the action.
    this.bindAction(quizActions.updateQuiz, this.updateQuiz);
  }

  _createClass(QuizStore, [{
    key: "updateQuiz",
    value: function updateQuiz(quiz) {
      this.quiz = quiz;
      // Optionally return false to suppress the change event to this.students by returning false.
    }
  }]);

  return QuizStore;
})();