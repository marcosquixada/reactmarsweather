import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from './components/Header';
import './styles.css';
import api from './services/api';
import Main from './pages/main';

const App = () => (
      <div className="App">
        <Header />
        <Main />
      </div>
    );

export default App;
