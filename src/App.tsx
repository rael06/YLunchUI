import React from 'react';
import logo from './logo.svg';
import classes from './App.module.scss';
import { Button } from '@material-ui/core';

function App() {
  return (
    <div className={classes.App}>
      <header className={classes['App-header']}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => alert("Clicked")}
        >Material UI Button</Button>
        <img src={logo} className={classes['App-logo']} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={classes['App-link']}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;