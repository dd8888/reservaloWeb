import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  return (
    <div>
      <button onClick={() => history.push('/login')}>Go to Login</button>
      <button onClick={() => history.push('/404')}>
        GO to Secure Dashboard
      </button>
    </div>
  );
};

export default Home;
