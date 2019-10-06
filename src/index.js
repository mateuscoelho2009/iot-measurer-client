import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Pages
import App from './App';
import Page404 from './pages/Page404';
import User from './pages/User';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Measurement from './pages/Measurement';
import { Provider } from 'react-redux';
import { Store } from './store';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={Store}>
            <Switch>
                <Route path="/" exact={true} component={App} />

                <Route path="/user" exact={true} component={User} />

                <Route path="/user/measurement/:id" component={Measurement} />

                <Route path='*' component={Page404} />
            </Switch>
        </Provider>
    </ BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
