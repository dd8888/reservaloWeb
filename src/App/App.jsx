import React, { useState } from 'react';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';

function App() {
  return (
    <AuthProvider authStorageType="localstorage" authStoragename="Manolito">
      <Router>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
