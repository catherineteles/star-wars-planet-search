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
    };
  }

updateFilter = ({ target }) => {
  const { value } = target;
  this.setState({ filterByName: { name: value } });
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
  const { planets, error, filterByName } = this.state;
  return (
    <Provider
      value={ {
        planets,
        error,
        filterByName,
        requestPlanets: this.requestPlanets,
        updateFilter: this.updateFilter,
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
