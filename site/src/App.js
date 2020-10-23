import React from 'react';
import logo from './logo.svg';
import './marks-styler.css';

// components
import Header from './components/header'
import Content from './components/content'
import Adder from './components/adder'
function App() {
  return (
    <div className="App">
        <Header/>
        <Content/>
        <Adder/>
    </div>
  );
}

export default App;
