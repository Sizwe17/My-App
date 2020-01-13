import React from 'react';
import Nav from "./App/Nav";
import Routes from "./routes";
import './app.css';


  

const App = () => {
  return (
    <div className="App">

    <Nav/>
    <main>
      <Routes/>
    </main>

    </div>
  );
}

export default App;
