import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies.jsx";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";

function App() {
  const [sort, setSort] = useState(false);
  const { query, setQuiery, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ query, sort });

  const  debouncedGetMovies = useCallback(
    debounce(query => {
    console.log("search", query);
    getMovies({query})
  }, 300)
  , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ query });
  };

  const handleChange = (event) => {
    const newQuery = event.target.value
    setQuiery(newQuery);
    debouncedGetMovies(newQuery)
  };
  const handleSort = () => {
    setSort(!sort);
  };

  useEffect(() => {
    console.log("New getMovies");
  }, [getMovies]);

  return (
    <div className="page">
      <h1>Peliculas</h1>
      <header>
        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={query}
            name="query"
            placeholder="Cualquier pelicula..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort}></input>
          <button type="submit">Buscar</button>
        </form>
        {error && <p className="error"> {error} </p>}
      </header>
      <main>
        {loading ? <p>Cargando ...</p> : <Movies movies={movies}></Movies>}
      </main>
    </div>
  );
}

export default App;
