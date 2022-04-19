import React from 'react';
import APIprovider from './context/APIprovider';
import './App.css';
import PlanetTable from './components/PlanetTable';
import FiltersContainer from './components/FiltersContainer';
import Header from './components/Header';

function App() {
  return (
    <APIprovider>
      <Header />
      <FiltersContainer />
      <PlanetTable />
    </APIprovider>
  );
}

export default App;
