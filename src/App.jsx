import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AxfrPanel from './components/axfr';
import './App.css';

const name = 'George';

const elements = (
  <div>
    <h1>Hello, {name}</h1>
    <Button variant="raised" color="primary">
      Click me
    </Button>
    <AxfrPanel />
  </div>
);

class App extends Component {
  render() {
    return elements;
  }
}

export default App;
