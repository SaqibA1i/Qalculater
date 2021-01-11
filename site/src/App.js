import React, { useState } from 'react';
import './marks-styler.css';

// components
import Header from './components/header'
import Content from './components/content'
import Adder from './components/adder'
import Assessments from './components/assessments'
var fs = require('fs');

function App() {
  const [data, setData] = useState(require("./data.json"));
  const [selectedCourse, setSelected] = useState("");

  function setSelHelper(course) {
    console.log(course);
    setSelected(course);
  }

  function updateJson(json) {
    setData(json);
    fs.writeFile('./data.json', JSON.stringify(json), (err) => {
      if(err){
        alert(err);
      }
      else {
        console.log("JSON IS UPDATED")
      }
    });
  }
  return (
    <div className="App">
      <Header />
      <Content
        data={data}
        setSelHelper={setSelHelper} />
      <Adder
        data={data} />
      <Assessments
        data={data}
        selected={selectedCourse}
        updateJson={updateJson} />
    </div>
  );
}

export default App;
