import React, { useContext, useEffect } from 'react';
import APIContext from '../context/APIcontext';

function PlanetTable() {
  const {
    planets,
    requestPlanets,
    filterByName,
    filterByNumericValues,
    order,
    updateMovieTitles,
  } = useContext(APIContext);

  const handleFilter = (element) => element.name
    .toLowerCase().includes(filterByName.name.toLowerCase());

  const checkFilters = (element, filter) => {
    if (element[filter.column] === 'unknown') {
      return false;
    }
    if (filter.comparison === 'maior que') {
      return parseFloat(element[filter.column]) > parseFloat(filter.value);
    }
    if (filter.comparison === 'menor que') {
      return parseFloat(element[filter.column]) < parseFloat(filter.value);
    }
    if (filter.comparison === 'igual a') {
      return parseFloat(element[filter.column]) === parseFloat(filter.value);
    }
  };

  const handleNumericFilter = (element) => {
    if (filterByNumericValues.length !== 0) {
      return filterByNumericValues.every((filter) => checkFilters(element, filter));
    }
    return element;
  };

  const handleSort = (a, b) => {
    if (order.sort === 'ASD') {
      if (b[order.column] === 'unknown') {
        const negativeNumber = -1;
        return negativeNumber;
      }
      return a[order.column] - b[order.column];
    }
    if (order.sort === 'DESC') {
      if (b[order.column] === 'unknown') {
        return 1;
      }
      return b[order.column] - a[order.column];
    }
    return a.name.localeCompare(b.name);
  };

  const createLines = (array) => array.map((movie, index) => (
    <li key={ index }>{movie}</li>
  ));

  // atualizar os planetas
  useEffect(() => {
    const updatePlanets = async () => {
      await requestPlanets();
      await updateMovieTitles();
    };
    updatePlanets();
  }, [requestPlanets, updateMovieTitles]);

  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planets.lenght !== 0 && planets.filter(handleFilter)
            .filter(handleNumericFilter)
            .sort(handleSort)
            .map((planet, index) => (
              <tr key={ index }>
                <td data-testid="planet-name">{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ planet.films && createLines(planet.films) }</td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.url }</td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}

export default PlanetTable;
