import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import containerCenterStyle from '../components/styles/containerStyles';

const HomePage: React.FC = () => {

  return (
    <Container style={containerCenterStyle}>
      <Typography variant="h2" component="h1">
        Welcome!
      </Typography>
      <Button
        component={RouterLink}
        to="/transactions"
        variant="contained"
        style={{ margin: '10px' }}
      >
        Transactions
      </Button>
      <Button
        component={RouterLink}
        to="/items"
        variant="contained"
        style={{ margin: '10px' }}
      >
        Items
      </Button>
    </Container>
  );
};

export default HomePage;
