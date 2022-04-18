import React from 'react';
import APIprovider from './context/APIprovider';
import './App.css';
import PlanetTable from './components/PlanetTable';

function App() {
  return (
    <APIprovider>
      <span>Hello, App!</span>
      <PlanetTable />
    </APIprovider>
  );
}

export default App;
