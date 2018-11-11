import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';

import AppNavbar from './components/AppNavbar';
import ToDoList from './components/ToDoList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container><ItemModal /></Container>
          <ToDoList />
        </div>
      </Provider>
    );
  }
}

export default App;
