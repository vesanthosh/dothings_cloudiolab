import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';

import AppNavbar from './components/AppNavbar';
import ToDoList from './components/ToDoList';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <ToDoList />
      </div>
      </Provider>
    );
  }
}

export default App;
