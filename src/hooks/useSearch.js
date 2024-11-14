import { useEffect, useState } from "react";

export function useSearch() {
  const [query, setQuiery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query === "") {
      setError("Input vacio");
      return;
    }
    if (query.length < 3) {
      setError("La busqueda es muy corta");
      return;
    }
    setError(null);
  }, [query]);
  return { query, setQuiery, error };
}
