import React, { useContext } from 'react';
import APIContext from '../context/APIcontext';

function FiltersContainer() {
  const {
    filterByName,
    updateFilter,
  } = useContext(APIContext);

  return (
    <div>
      <input
        value={ filterByName.name }
        onChange={ updateFilter }
        data-testid="name-filter"
      />
    </div>
  );
}

export default FiltersContainer;
