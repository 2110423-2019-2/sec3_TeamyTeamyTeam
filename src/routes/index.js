import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Project from '../pages/Project'
import Post from '../pages/Post'
import About from '../pages/About'
import Login from '../pages/Login'
import SignUp from '../pages/Signup'
import Search from '../pages/Search'
export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/projects" component={Project} />
    <Route exact path="/posts" component={Post} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/search" component={Search} />
  </Switch>
)