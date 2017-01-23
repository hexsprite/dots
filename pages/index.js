import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import _ from 'lodash'

const questions = [
  {
    id: '1',
    title: 'Floss'
  },
  {
    id: '2',
    title: 'Workout'
  }
]

const answers = {
  '1': { // day
    '1': true  // question id : answer
  },
  '3': { // day
    '1': true  // question id : answer
  }
}

const days = ['1', '2', '3']

const QuestionRow = ({id, title, days}) =>
  <TableRow selectable={true}>
    <TableRowColumn>
      {title}
    </TableRowColumn>
    { days.map(day =>
      <TableRowColumn key={day}>
        <Checkbox
          checked={_.get(answers, [day, id], false)}
          onCheck={(event, checked) => {
            _.set(answers, [day, id], checked)
            console.log('answers now', answers)
          }}
        />
      </TableRowColumn>
    )}
  </TableRow>


export default class App extends React.Component {
  static async getInitialProps({ req }) {
    return req
      ? { userAgent: req.headers['user-agent'] }
      : { userAgent: navigator.userAgent }
  }
  render() {
    const theme = getMuiTheme({userAgent: this.props.userAgent})
    return (
    <MuiThemeProvider muiTheme={theme}>
    <Table selectable={false} >
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn key="question">Question</TableHeaderColumn>
          { days.map(day =>
            <TableHeaderColumn key={day}>{day}</TableHeaderColumn>
          )}
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={true} stripedRows={true}>
        { questions.map(q =>
        <QuestionRow
          answers={answers}
          days={days}
          key={q.id}
          id={q.id}
          title={q.title}
          />)
        }
      </TableBody>
    </Table>
    </MuiThemeProvider>
  )}
}
