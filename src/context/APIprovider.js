import React, { Component } from 'react';
import PropTypes from 'prop-types';
import APIcontext from './APIcontext';

class APIprovider extends Component {
  constructor() {
    super();
    this.state = {
      planets: {},
      error: '',
    };
  }

requestPlanets = async () => {
  try {
    const getPlanets = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const data = getPlanets.json();
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
  const { planets, error } = this.state;
  return (
    <Provider value={ { planets, error } }>
      {children}
    </Provider>
  );
}
}

APIprovider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default APIprovider;
