import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../../store/search";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [allResults, setAllResults] = useState({});

  const results = useSelector((state) => {
    return state.search;
  });

  useEffect(() => {
    if(search.length){
      dispatch(fetchSearchResults(search));
      setAllResults(results);
    } else {
      setAllResults('')
    }
  }, [dispatch, search]);

  console.log("da results", results);
  console.log('da length', Object.values(results).length)

  return (
    <>
      <form>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button type="submit"></button>
        {Object.values(allResults).length > 0 && (
          <div className="search-results">
            {Object.values(results).map(result => (
              result.albumId ? <p>{result.title}</p> : <p>{result.username}</p>
            ))}
          </div>
        )}
      </form>
    </>
  );
};

export default SearchBar;
