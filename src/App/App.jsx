import React, { useState } from 'react';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';

function App() {
  return (
    <AuthProvider
      authStorageType={'cookie'}
      authStorageName={'_auth_t'}
      authTimeStorageName={'_auth_time'}
      stateStorageName={'_auth_state'}
      cookieDomain={'127.0.0.1'}
      cookieSecure={window.location.protocol === 'http:'}
    >
      <Router>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
