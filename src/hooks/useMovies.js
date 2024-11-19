import { useRef, useState, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movie";

export function useMovies({ query, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previuesSearch = useRef(query);

  const getMovies = useCallback( async ({ query }) => {
      if (query === previuesSearch.current) return;
      try {
        setLoading(true);
        setError(null);
        previuesSearch.current = query;
        const newMovies = await searchMovies({ query });
        setMovies(newMovies);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading, error };
}
