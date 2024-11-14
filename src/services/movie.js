const APY_KEY = "dae7ad5";

export const searchMovies = async ({ query }) => {
  if (query === "") return null;
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${APY_KEY}&s=${query}`
    );
    const json = await response.json();

    const movies = json.Search;

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));


  } catch (e) {
    throw new Error("Error en busqueda");
  }
};
