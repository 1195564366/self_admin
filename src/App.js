import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom'

import { mainRouter } from './router/index'

import Frame from './components/Frame/Index'

// 过滤出 二级菜单
const routes = []
mainRouter.forEach(route => {
  route.children ? route.children.forEach(r => routes.push(r)) : routes.push(route)
})

function App() {
  return (
    <Frame>
      <Switch>
        {routes.map(route => {
          return (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              render={routeProps => {
                return <route.component {...routeProps} />
              }}
            ></Route>
          )
        })}
        <Redirect to="/404" />
      </Switch>
    </Frame>
  );
}

export default App;
