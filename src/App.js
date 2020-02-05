import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Routing from './routes/route'

class App extends Component {
  render() {
    return (
      <div className="my-app">
        <nav className="navbar is-light"  aria-label="main navigation">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item">
                <img src={process.env.PUBLIC_URL + '/images/logo_engineer.jpg'} alt="DEVAHOY LOGO" width="112" height="28" />
              </a>
            </div>
            <div className="navbar-menu">
              <div className="navbar-end">
                <NavLink exact to="/" activeClassName="is-active" className="navbar-item">Home</NavLink>
                <NavLink to="/login" activeClassName="is-active" className="navbar-item">Login</NavLink>
                <NavLink to="/signup" activeClassName="is-active" className="navbar-item">SignUp</NavLink>
                <NavLink to="/search" activeClassName="is-active" className="navbar-item">Search</NavLink>
              </div>
            </div>
          </div>
        </nav>

        <Routing />
      </div>
    )
  }
}

export default App
