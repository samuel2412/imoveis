import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from './components/Layout/Layout';
import LandingPage from './containers/LandingPage/LandingPage';


function App() {
  return (
    <>
      <CssBaseline />
      <Layout>
        <LandingPage />
      </Layout>
    </>
  );
}

export default App;
