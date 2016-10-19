/*
 * Inline events from React components call these actions, which in turn, 
 * dispatch updates to the data stores.
*/
class QuizActions {
  updateQuiz(quiz) {
    this.dispatch(quiz);
  }
}