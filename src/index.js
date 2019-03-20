import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { render } from 'react-dom';
import App from './components/pages/App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Root = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </BrowserRouter>
  )
}

render(<Root/>, document.querySelector("#main"));
