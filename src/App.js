import React, { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App = ()=> {
  const [progress,setProgress] = useState(0);
  // setProgress(progress);
    const pageSize = 16;
    const country = 'in';
    const apiKey = process.env.REACT_APP_NEWS_API_KEY; //"cc20709c0ba34a4ea2c1674c7854fec8"
    return (
        <Router>
      <div>
        <Navbar/>
        <LoadingBar
        color='black'
        progress={progress}
        height="4px"
        onLoaderFinished={() => setProgress(0)}
      />

          <Routes>
            <Route path="/" element={<News setProgress={setProgress} key="general" pageSize={pageSize} apiKey={apiKey} country={country} category='general'/>} />
            <Route path="/science" element={<News setProgress={setProgress} key="science" pageSize={pageSize} apiKey={apiKey} country={country} category='science'/>} />
            <Route path="/business" element={<News setProgress={setProgress} key="business" pageSize={pageSize} apiKey={apiKey} country={country} category='business'/>} />
            <Route path="/health" element={<News setProgress={setProgress} key="health" pageSize={pageSize} apiKey={apiKey} country={country} category='health'/>} />
            <Route path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} apiKey={apiKey} country={country} category='entertainment'/>} />
            <Route path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={pageSize} apiKey={apiKey} country={country} category='technology'/>} />
            <Route path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={pageSize} apiKey={apiKey} country={country} category='sports'/>} />
          </Routes>
      </div>
        </Router>
    )
  }
export default App;