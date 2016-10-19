var isNode = (typeof module !== 'undefined' && module.exports)? true: false
  , React = isNode ? require('react/addons') : window.React
  , ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class StudentList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    io_lib.isStudentListMounted = true;
    io_lib.update();
  }

  render() {
    var students = this.props.students.map(function(student, index) {
      return (
        <li key={index}>{student.name}<em className={student.rating}>{student.rating}</em></li>
      );
    }.bind(this));
    return (
      <ul>
        <ReactCSSTransitionGroup transitionName="student" transitionAppear={true}>
          {students}
        </ReactCSSTransitionGroup>
      </ul>
    );
  }

}

if (isNode) {
  exports.StudentList = StudentList;
}
