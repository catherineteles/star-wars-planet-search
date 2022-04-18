import React from 'react';
import APIprovider from './context/APIprovider';
import './App.css';
import PlanetTable from './components/PlanetTable';
import FiltersContainer from './components/FiltersContainer';

function App() {
  return (
    <APIprovider>
      <FiltersContainer />
      <PlanetTable />
    </APIprovider>
  );
}

export default App;
