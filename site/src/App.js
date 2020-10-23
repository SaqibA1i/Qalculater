import React from 'react';
import logo from './logo.svg';
import './marks-styler.css';

// components
import Header from './components/header'
import Content from './components/content'
import Adder from './components/adder'
import Assessments from './components/assessments'

function App() {
  return (
    <div className="App">
        <Header/>
        <Content/>
        <Adder/>
        <Assessments/>
    </div>
  );
}

export default App;
