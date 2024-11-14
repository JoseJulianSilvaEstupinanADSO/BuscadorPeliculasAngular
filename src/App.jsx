import "./App.css";
import { Movies } from "./components/Movies.jsx";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";

function App() {
  const { query, setQuiery, error } = useSearch();
  const { movies, getMovies } = useMovies({ query }); 

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
  };

  const handleChange = (event) => {
    setQuiery(event.target.value);
  };

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
          <button type="submit">Buscar</button>
        </form>
        {error && <p className="error"> {error} </p>}
      </header>
      <main>
        <Movies movies={movies}></Movies>
      </main>
    </div>
  );
}

export default App;
