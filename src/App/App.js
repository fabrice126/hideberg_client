
import React, { Component } from 'react';
import './App.css'
//Used for React-Route
import Home from '../views/Home/Home';


import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/home' component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}