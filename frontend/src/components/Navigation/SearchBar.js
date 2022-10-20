import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../../store/search";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();

  const results = useSelector((state) => {
    return state.search
  })

  useEffect(() => {
    dispatch(fetchSearchResults(search));
  },[dispatch, search])

  console.log('da results', results);

  return (
    <form>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <button type="submit"></button>
    </form>
  );
};

export default SearchBar;
