import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import LoginDialog from './components/Login';
import MainPage from './pages/main';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={LoginDialog} />
          <Route path='/main' component={MainPage} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
