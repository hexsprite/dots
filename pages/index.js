import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import _ from 'lodash'
import { Provider } from 'react-redux'
import { reducer, initStore } from '../store'
import { connect } from 'react-redux'

const questions = [
  {
    id: '1',
    title: 'Floss'
  },
  {
    id: '2',
    title: 'Workout'
  },
  { id: '3', title: '5 Minute Journal (M)'},
  { id: '4', title: 'Read Vision & Goals'},
  { id: '5', title: 'Meditate 15m'},
  { id: '6', title: '1000 Words'},
  { id: '7', title: 'Qi Gong/Yoga/Workout'},
  { id: '8', title: 'Phone Someone To Connect'},
  { id: '9', title: 'Identify and Complete Top 3 Actions / day'}
]

const days = _.range(1, 31).map(String)

const QuestionRow = ({qid, title, days, answers, onAnswer}) =>
  <tr>
    <td>
      {title}
    </td>
    { days.map(day =>
      <td key={`${qid}:${day}`}>
        <input type="checkbox"
          checked={ _.get(answers, [day, qid], false) }
          onChange={ () => {
            const checked = !_.get(answers, [day, qid], false)
            onAnswer(qid, day, checked)
            console.log(`day: ${day} id ${qid} checked ${checked}`)
          }}
        />
      </td>
    )}
  </tr>

const Questions = ({answers, onAnswer}) => {
  return <table>
    <thead>
      <tr>
        <th key="question">Question</th>
          { days.map(day =>
            <th key={day}>{day}</th>
          )}
      </tr>
    </thead>
    <tbody>
    { questions.map(q =>
    <QuestionRow
      answers={answers}
      days={days}
      key={`qr${q.id}`}
      qid={q.id}
      title={q.title}
      onAnswer={onAnswer}
      />) }
    </tbody>
    </table>
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAnswer: (questionId, day, checked) => {
      dispatch({type: 'ANSWER', questionId, day, checked})
    }
  }
}

const AllQuestions = connect(state => state, mapDispatchToProps)(Questions)

export default class Page extends React.Component {
  static getInitialProps({ req }) {
    const isServer = !!req
    const store = initStore(reducer, {answers: {}}, isServer)
    const props = { initialState: store.getState(), isServer }
    if (req) {
      props.userAgent = req.headers['user-agent']
    } else {
      props.userAgent = navigator.userAgent
    }
    return props
  }

  constructor (props) {
    super(props)
    this.store = initStore(reducer, props.initialState, props.isServer)
  }

  render() {
    const theme = getMuiTheme({userAgent: this.props.userAgent})
    return (
      <MuiThemeProvider muiTheme={theme}>
        <Provider store={this.store}>
          <AllQuestions />
        </Provider>
      </MuiThemeProvider>
    )}
}
