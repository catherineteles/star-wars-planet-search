import React, { useContext } from 'react';
import APIContext from '../context/APIcontext';

const columnOptions = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
function FiltersContainer() {
  const {
    column,
    comparison,
    clearNumericFilter,
    value,
    filterByName,
    filterByNumericValues,
    updateFilter,
    updateNumericFilter,
  } = useContext(APIContext);

  const checkColumn = (element, filter) => element !== filter.column;

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
        {columnOptions.filter((element) => {
          if (filterByNumericValues.length !== 0) {
            return filterByNumericValues.every((filter) => checkColumn(element, filter));
          }
          return element;
        }).map((element) => (
          <option key={ element } value={ element }>{element}</option>
        ))}
        {/* <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option> */}
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
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ clearNumericFilter }
      >
        Limpar Filtro
      </button>
    </div>
  );
}

export default FiltersContainer;
