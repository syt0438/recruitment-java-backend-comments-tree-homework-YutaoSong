import React from 'react'
import './App.css'
import './index.css'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import './assets/iconfont/iconfont.css'
import LoadableComponent from '@/utils/LoadableComponent'

const Index = LoadableComponent(import('./pages/Index'))
const Login = LoadableComponent(import('./pages/Login'))

@withRouter
class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/index' component={Index} />
        <Route path='/' component={Index} exact />
        <Redirect to='/' />
      </Switch>
    )
  }
}

export default App
