import React, { Component } from 'react';
import PropTypes from 'prop-types';
import APIcontext from './APIcontext';
import requestMovies from '../Helpers/getMovieTitles';

class APIprovider extends Component {
  constructor() {
    super();
    this.state = {
      planets: [],
      next: 'https://swapi-trybe.herokuapp.com/api/planets/',
      movieTitlesState: [],
      filterByName: { name: '' },
      error: '',
      column: 'population',
      comparison: 'maior que',
      value: 0,
      sortRadio: '',
      sortColumn: '',
      filterByNumericValues: [],
      order: {
        column: '',
        sort: '',
      },
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

createSortFilter = () => {
  const { sortColumn, sortRadio } = this.state;
  this.setState({ order: { column: sortColumn, sort: sortRadio } });
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
    const { next } = this.state;
    const getPlanets = await fetch(next);
    const data = await getPlanets.json();
    this.setState({
      planets: data.results,
      next: data.next,
    });
  } catch (error) {
    this.setState({ error });
  }
}

updateMovieTitles = async () => {
  const { planets } = this.state;
  const copyPlanets = JSON.parse(JSON.stringify(planets));
  copyPlanets.forEach(async (planet) => {
    const movieTitles = await Promise.all(planet.films
      .map((film) => requestMovies(film)));
    this.setState((state) => ({
      movieTitlesState: [...state.movieTitlesState, movieTitles],
    }), () => {
      const { movieTitlesState } = this.state;
      planets.forEach((p, i) => {
        p.films = movieTitlesState[i];
      });
    });
  });
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
        createSortFilter: this.createSortFilter,
        updateMovieTitles: this.updateMovieTitles,
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
