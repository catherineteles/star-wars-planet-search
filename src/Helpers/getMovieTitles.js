const requestMovies = async (url) => {
  try {
    const getMovie = await fetch(url);
    const data = await getMovie.json();
    return `${data.episode_id}. ${data.title} `;
  } catch (error) {
    console.log(error);
  }
};

export default requestMovies;
