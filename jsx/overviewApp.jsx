var React = require('react/addons')
  , Chart = require('./Chart')
  , StudentList = require('./StudentList');

class OverviewApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = quizStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    quizStore.listen(this.onChange);
  }

  componentWillUnmount() {
    quizStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {

    // Scrub the data before rendering.
    // TODO: Removing the data-scrubbing code to another function outside of render().
    var lineData = {}
      , scrubbedLineData = {}
      , pass = 0
      , fail = 0
      , total = 0
      , count = 0;
    
    for (var i=0; i<this.state.quiz.length; i++) {
      this.state.quiz[i].create_time = this.state.quiz[i].create_time.replace('T', ' ');
      this.state.quiz[i].create_time = this.state.quiz[i].create_time.substring(0, this.state.quiz[i].create_time.lastIndexOf('-')-2) + '00';
      if (typeof lineData[this.state.quiz[i].create_time] !== 'undefined') {
        lineData[this.state.quiz[i].create_time] = lineData[this.state.quiz[i].create_time] + 1;
      }
      else {
        lineData[this.state.quiz[i].create_time] = 1; 
      }
      if (this.state.quiz[i].rating === 'Fail') {
        fail++;
      }
      else {
        pass++;
      }
      count++;
    }

    scrubbedLineData.columns = [
      ['x'],
      ['# of Students']
    ];
    for(var index in lineData) { 
      if (lineData.hasOwnProperty(index)) {
        scrubbedLineData.columns[0].push(index);
        scrubbedLineData.columns[1].push(total + parseInt(lineData[index], 10));
        total = total + parseInt(lineData[index], 10);
      }
    }

    var pieChartData =  { columns: [
      ['correct', parseInt((pass/total) * 100, 10)],
      ['incorrect', 100 - parseInt((pass/total) * 100, 10)]
    ]};

    // Percentage of students that have taken the test.
    var gaugeChartData = {
      columns: [
        ['data', parseInt((count/30)*100, 10)]
      ]
    }

    return (
      <div className="mdl-grid demo-content">
        <div className="demo-charts mdl-color--white mdl-cell mdl-cell--3-col mdl-grid mdl-shadow--2dp">
          <h3>Attendance</h3>
          <div id="Gauge">
            <Chart data={gaugeChartData} type='gauge' element='Gauge' />,
          </div>
        </div>
        <div className="demo-charts mdl-color--white mdl-cell mdl-cell--6-col mdl-grid mdl-shadow--2dp">
          <h3>Volume</h3>
          <div id="Line">
            <Chart data={scrubbedLineData} type='Line' element='Line' />,
          </div>
        </div>
        <div className="demo-charts mdl-color--white mdl-cell mdl-cell--3-col mdl-grid mdl-shadow--2dp">
          <h3>Pass/Fail Ratio</h3>
          <div id="Pie">
            <Chart data={pieChartData} type='pie' element='Pie' />,
          </div>
        </div>
        <div className="mdl-color--white mdl-cell mdl-cell--12-col mdl-grid mdl-shadow--2dp">
          <h3>Students</h3>
          <div id="People">
            <StudentList students={this.state.quiz} />
          </div>
        </div>
      </div>
    );
  }
}

React.render(<OverviewApp />, document.querySelector('.mdl-layout__content'));