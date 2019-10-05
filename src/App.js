import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TouchAppIcon className="App-logo" />
        <Typography
          variant="h2"
          color="primary"
        >
          Welcome to our platform!
        </Typography>
        <br />
        <Link
          className="App-link"
          to="/measurements"
        >
          <TrendingUpIcon className="Trending-icon" />
          See the measurements
        </Link>
      </header>
    </div>
  );
}

export default App;
