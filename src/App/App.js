
import React, { Component } from 'react';
import './App.css'
//Used for React-Route
import Home from '../views/Home/Home';
import Login from '../views/Login/Login';
import Map from '../views/Map/Map';
import Page404 from '../views/Page404/Page404';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Map} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/*' component={Page404} />
        </Switch>
      </BrowserRouter>
    );
  }
}