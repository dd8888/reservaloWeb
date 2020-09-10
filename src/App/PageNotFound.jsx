import React from 'react';
import Border from './Dashboard/BorderTemplate/Border';
import '../css/dashboard-init.css';

class PageNotFound extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <Border></Border>
        <h1>Página no encontrada</h1>
      </div>
    );
  }
}

export default PageNotFound;
