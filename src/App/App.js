
import React, { Component } from 'react';
import './App.css'
//Used for React-Route
import Home from '../views/Home/Home';
import Login from '../views/Login/Login';
import Continent from '../views/Continent/Continent';
import Page404 from '../views/Page404/Page404';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HBheader from '../components/HBheader/HBheader';
import HBfooter from '../components/HBfooter/HBfooter';
import withTracker from './HBTracker';


export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <main>
          <div className="content">
            <div className="divHeader">
              <HBheader />
            </div>
            <Switch>
              <Route exact path='/' component={withTracker(Continent)} />
              <Route exact path='/continent/:continent' component={withTracker(Continent)} />
              <Route exact path='/country/:country/sector/:sector' component={withTracker(Home)} />

              <Route exact path='/login' component={withTracker(Login)} />
              <Route exact path='/*' component={withTracker(Page404)} />
            </Switch>
          </div>
          <div className="divFooter">
            <HBfooter />
          </div>
        </main>
      </BrowserRouter>
    );
  }
}