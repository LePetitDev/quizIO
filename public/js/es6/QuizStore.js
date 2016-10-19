// The store responds to events from the actions.
class QuizStore {
  constructor() {
    this.quiz = [];
    // Bind our action handler to the action.
    this.bindAction(quizActions.updateQuiz, this.updateQuiz);
  }
  updateQuiz(quiz) {
    this.quiz = quiz;
  }
}
