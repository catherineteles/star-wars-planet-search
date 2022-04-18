import React, { useContext, useEffect } from 'react';
import APIContext from '../context/APIcontext';

function PlanetTable() {
  const {
    planets,
    requestPlanets,
    filterByName,
  } = useContext(APIContext);

  const handleFilter = (element) => element.name
    .toLowerCase().includes(filterByName.name.toLowerCase());

  // atualizar os planetas
  useEffect(() => {
    const updatePlanets = async () => {
      await requestPlanets();
    };
    updatePlanets();
  }, [requestPlanets]);

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
            .map((planet, index) => (
              <tr key={ index }>
                <td>{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ planet.films }</td>
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
