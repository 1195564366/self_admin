import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { pageRouter } from './router'

import './style/minireset.css'
import 'antd/dist/antd.css';
import './style/reset-antd.css'

import * as serviceWorker from './serviceWorker';

// 请求
import { fetchGet, fetchPost } from './axios'

React.$fetchGet = fetchGet
React.$fetchPost = fetchPost


ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/main" render={ routeProps => <App {...routeProps} /> }></Route>
      {
        pageRouter.map(route => {
          return ( <Route key={route.path} {...route}></Route> )
        })
      }
      {/* 匹配不到重定向到登录页面 */}
      <Redirect to="/login" />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
