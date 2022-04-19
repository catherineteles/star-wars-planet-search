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
    removeNumericFilter,
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
      <div>
        { filterByNumericValues.length !== 0 && filterByNumericValues.map((filter) => (
          <li data-testid="filter" key={ filter.column }>
            {`${filter.column} ${filter.comparison} ${filter.value}`}
            <button
              onClick={ removeNumericFilter }
              type="button"
              name={ filter.column }
            >
              X
            </button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default FiltersContainer;
