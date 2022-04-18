import React, { useContext } from 'react';
import APIContext from '../context/APIcontext';

function FiltersContainer() {
  const {
    column,
    comparison,
    value,
    filterByName,
    updateFilter,
    updateNumericFilter,
  } = useContext(APIContext);

  return (
    <div>
      <input
        name="name-filter"
        value={ filterByName.name }
        onChange={ updateFilter }
        data-testid="name-filter"
      />
      <select
        value={ column }
        onChange={ updateFilter }
        name="column"
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        value={ comparison }
        onChange={ updateFilter }
        name="comparison"
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        value={ value }
        onChange={ updateFilter }
        name="value"
        data-testid="value-filter"
        type="number"
      />
      <button
        type="button"
        onClick={ updateNumericFilter }
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </div>
  );
}

export default FiltersContainer;
