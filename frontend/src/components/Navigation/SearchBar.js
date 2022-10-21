import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchSearchResults } from "../../store/search";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [allResults, setAllResults] = useState({});

  const results = useSelector((state) => {
    return state.search;
  });

  useEffect(() => {
    if (search.length) {
      dispatch(fetchSearchResults(search)).then(setAllResults(results));
    } else {
      setAllResults("");
    }
  }, [dispatch, search]);

  console.log("da results", results);
  console.log("da length", Object.values(results).length);

  return (
    <div className="search">
      <form className="search-bar">
        <input
          className="search-field"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button type="submit">
          <i class="fa-solid fa-anchor"></i>
        </button>
      </form>
      {Object.values(allResults).length > 0 && (
        <div className="search-results">
          <p className="search-results-header">
            Avast ye, here's what we found for "{search}"
          </p>
          {Object.values(results).map((result) =>
            result.title ? (
              <NavLink className="search-result" to={`/songs/${result.id}`}>{result?.title}</NavLink>
            ) : (
              <NavLink className="search-result" to={`/artists/${result.id}`}>{result?.username}</NavLink>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
