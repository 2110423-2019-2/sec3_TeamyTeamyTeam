import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home/home'
import Login from '../pages/Login/login'
import SignUp from '../pages/Signup/signup'
import Search from '../pages/Search/Search'
export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/search" component={Search} />
  </Switch>
)