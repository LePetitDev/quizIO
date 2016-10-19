/*
 * Inline events from React components call these actions, which in turn, 
 * dispatch updates to the data stores.
*/
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuizActions = (function () {
  function QuizActions() {
    _classCallCheck(this, QuizActions);
  }

  _createClass(QuizActions, [{
    key: "updateQuiz",
    value: function updateQuiz(quiz) {
      this.dispatch(quiz);
    }
  }]);

  return QuizActions;
})();