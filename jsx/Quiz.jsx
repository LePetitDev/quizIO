var isNode = (typeof module !== 'undefined' && module.exports)? true: false
  , React = isNode ? require('react/addons') : window.React
  , ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.process = this.process.bind(this);
  }

  process(e) {

    var answer = ''
      , answerValidates = false
      , nameRegex = /^[A-Za-z0-9-]/
      , nameValidates = false
      , radios = document.getElementsByName('answer')
      , studentName = document.getElementById('StudentName').value; 

    document.getElementById('AnswerError').className ='error invis';
    document.getElementById('NameError').className ='error invis';

    for (var i = 0, length = radios.length; i<length; i++) {
        if (radios[i].checked) {
            answer = radios[i].value;
            answerValidates = true;
            break;
        }
    }
    nameValidates = (nameRegex.test(studentName) && studentName !== '')? true: false;

    if (!answerValidates) {
      document.getElementById('AnswerError').className ='error';
      e.preventDefault();
    }
    if (!nameValidates) {
      if (studentName === '') {
        document.getElementById('NameError').innerHTML = 'Your name is required.';
      }
      else {
        document.getElementById('NameError').innerHTML = 'Only alphanumeric characters, spaces and hyphens are allowed.';
      }
      document.getElementById('NameError').className ='error';
      e.preventDefault();
    }
  }

  render() {
    var val = '';
    return (
      <div id="Quiz">
        <h4>Hypothetical University &raquo; Fall 2015 <em>Math 101</em></h4>
        <form onSubmit={this.process} action="/api/quiz" method="post">
          <h1>Quiz 1</h1>
          <input type="text" id="StudentName" name="name" placeholder="Enter Your Name" />
          <b id="NameError" className="error invis">Your name is required.</b>
          <p><em>Question 1:</em>Is 1,024<span id="super">2</span> equal to 1,048,576 ?</p>
          <label htmlFor="radio1">
            <input type="radio" id="radio1" name="answer" value="True" />
            True
          </label>
          <label htmlFor="radio2">
            <input type="radio" id="radio2" name="answer" value="False" />
            False
          </label>
          <b id="AnswerError" className="error invis">An answer is required.</b>
          <button ref="formSubmit" type="submit">Submit</button>
        </form>
      </div>
    );
  }

}

if (isNode) {
  exports.Quiz = Quiz;
}