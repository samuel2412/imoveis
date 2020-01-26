import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from './components/Layout/Layout';
import LandingPage from './containers/LandingPage/LandingPage';
import Detail from './components/Detail/Detail';


function App() {

  let routes = (
    <Switch>
      <Route path='/detail/:id' component={Detail} />
      <Route exact path="/" component={LandingPage} />
      <Redirect to='/' />
    </Switch>

  );

  return (
    <>
      <CssBaseline />
      <Layout>
        {routes}
      </Layout>
    </>
  );
}

export default App;
