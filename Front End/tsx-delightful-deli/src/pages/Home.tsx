import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
//NOTE TO JOSH: THESE TYPES SHOULD BE DEFINED ELSEWHERE
    const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',  
  };

  const buttonStyle: React.CSSProperties = {
    display: 'block',
    margin: '10px',  
    padding: '10px 20px',
    fontSize: '1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  return (
    <div style={containerStyle}>
      <h1>Welcome!</h1>
      <Link to="/transactions" style={buttonStyle}>
        Transactions
      </Link>
      <Link to="/items" style={buttonStyle}>
        Items
      </Link>
    </div>
  );
};

export default HomePage;
