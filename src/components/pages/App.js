import React from 'react';
import { Helmet } from 'react-helmet';
import Update from './Update';
import Create from './Create';
import Home from './Home';
import Delete from './Delete';
import '../../css/styles.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const TITLE = "Home"

class App extends React.Component {
  render() {
    return (
      <Router>
      <div className="wrap-content">
        <Helmet>
           <title>{ TITLE }</title>
        </Helmet>

        <div className="menu">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand brand-container">Pikin TV</Link>

              <ul className="navbar-nav topbar">
                <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/update'} className="nav-link">Update</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/delete'} className="nav-link">Delete</Link>
                </li>
              </ul>
          </nav>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/update" component={Update} />
          <Route path="/delete" component={Delete} />
        </Switch>
      </div>
      </Router>
    )
  }
}

export default App;
