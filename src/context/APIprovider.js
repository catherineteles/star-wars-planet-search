import React, { Component } from 'react';
import PropTypes from 'prop-types';
import APIcontext from './APIcontext';

class APIprovider extends Component {
  constructor() {
    super();
    this.state = {
      planets: [],
      filterByName: { name: '' },
      error: '',
      column: '',
      comparison: '',
      value: '',
      filterByNumericValues: [],
    };
  }

updateFilter = ({ target }) => {
  const { value, name } = target;
  if (name === 'name-filter') {
    return this.setState({ filterByName: { name: value } });
  }
  this.setState({ [name]: value });
}

clearNumericFilter = () => this.setState({ filterByNumericValues: [] })

removeNumericFilter = ({ target }) => {
  const { filterByNumericValues } = this.state;
  const { name } = target;
  const newArray = filterByNumericValues.filter((filter) => filter.column !== name);
  this.setState({ filterByNumericValues: newArray });
}

updateNumericFilter = () => {
  const { column, comparison, value } = this.state;
  const newFilter = {
    column,
    comparison,
    value,
  };
  this.setState((state) => ({
    filterByNumericValues: [...state.filterByNumericValues, newFilter],
  }));
}

requestPlanets = async () => {
  try {
    const getPlanets = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const data = await getPlanets.json();
    this.setState({
      planets: data.results,
    });
  } catch (error) {
    this.setState({ error });
  }
}

render() {
  const { Provider } = APIcontext;
  const { children } = this.props;
  return (
    <Provider
      value={ { ...this.state,
        requestPlanets: this.requestPlanets,
        updateFilter: this.updateFilter,
        updateNumericFilter: this.updateNumericFilter,
        clearNumericFilter: this.clearNumericFilter,
        removeNumericFilter: this.removeNumericFilter,
      } }
    >
      {children}
    </Provider>
  );
}
}

APIprovider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default APIprovider;
