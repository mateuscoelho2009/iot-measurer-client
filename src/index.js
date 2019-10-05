import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Pages
import App from './App';
import Page404 from './pages/Page404';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Measurements from './pages/Measurements';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />

            <Route path="/measurements/:id" component={Measurements} />

            <Route path='*' component={Page404} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
