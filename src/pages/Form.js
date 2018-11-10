import React, { Component } from 'react';
import { message } from 'antd';
import update from 'react-addons-update';
import Quiz from '../components/Quiz';
import Result from '../components/Result';
import api from '../axios';

  const answerOptions = [
    {
      type: '5',
      content: '5'
    }, 
    {
      type: '4',
      content: '4'
    },
    {
      type: '3',
      content: '3'
    },
    {
      type: '2',
      content: '2'
    },
    {
      type: '1',
      content: '1'
    }
  ]

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: false,
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
      },
      answers: [],
      quizQuestions: {},
      result: ''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    const form_link = '/' + window.location.href.split('/')[4] + '/' + window.location.href.split('/')[5];
    console.log(form_link)
    api.getForm(form_link).then(({
      data
    }) => {
      console.log(data)
      if (data.success) {
        const quizQuestions = data;
        var questions = quizQuestions.questions;
    
        if (quizQuestions.type === 'student' && localStorage.getItem("mateToken") === null) {
          window.location.href = '/host/login/' + window.location.href.split('/')[5];
        } else if (quizQuestions.type === 'self' && localStorage.getItem("mateToken") === null) {
          window.location.href = '/';
        } else {
          if (quizQuestions.common) {
            questions.push(quizQuestions.common)
          }
        }
        this.setState({
          login: true,
          quizQuestions: data,
          question: questions[0].content,
          answerOptions: answerOptions
        })
      } else {
        message.error(data.reason);
      }
    })
      // console.log("question", questions)
      /* const shuffledAnswerOptions = questions.map(
        content => content.choices
        // this.shuffleArray(question.answers)
      ); */
      // console.log("shuffled", shuffledAnswerOptions);
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    const { quizQuestions } = this.state;
    var questions = quizQuestions.questions;
    if (!questions) {
      questions = []
    }

    if (this.state.questionId < questions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: { $apply: currentValue => currentValue + 1 }
    });
    // console.log("answer", answer);
    var updateAnswers = this.state.answers;
    updateAnswers = [...updateAnswers, answer];

    this.setState({
      answersCount: updatedAnswersCount,
      answer: answer,
      answers: updateAnswers
    });
  }

  setNextQuestion() {
    const { quizQuestions } = this.state;
    var questions = quizQuestions.questions;
    if (!questions) {
      questions = []
    }
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: questions[counter].content,
      answerOptions: questions[counter].answers,
      answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderQuiz() {
    const { quizQuestions } = this.state;
    var questions = quizQuestions.questions;
    if (!questions) {
      questions = []
    }

    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={questions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    const { quizQuestions } = this.state;
    var ans = {};
    ans.form_id = quizQuestions.form._id;
    ans.course_id = quizQuestions.course_id;
    ans.type = quizQuestions.type;
    if (quizQuestions.common) {
      ans.is_valid = (quizQuestions.common.ans === this.state.answer)
    } else {
      ans.is_valid = true;
    }
    ans.student = localStorage.getItem("mateStudentAccountInfo");
    ans.student_id = ans.student._id;
    ans.answers = []
    for (var i in quizQuestions.form.question_ids) {
      ans.answers.push({
        question_id: quizQuestions.form.question_ids[i],
        choice: this.state.answers[i]
      })
    }

    if (localStorage.getItem("mateDone") === ans.student_id) {
      message.success("你已经填过问卷了");
      return <Result quizResult={this.state.result} />;
    }

    api.saveAnsForm(ans).then(({
      data
    }) => {
      if (data.success) {
        localStorage.setItem("mateDone", ans.student_id);
        message.success("问卷填写完成， 感谢您的配合");
      } else {
        message.error(data.reason)
        console.log(data)
      }
    })

    console.log(ans);
    // console.log(this.state);
    return <Result quizResult={this.state.result} />;
  }

  render() {
    return (
      <div className="Form">
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default App;
