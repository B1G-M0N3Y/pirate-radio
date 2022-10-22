import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { fetchSearchResults } from "../../store/search";
import ArtistCard from "../Artists/ArtistCard";
import SongCardProfile from "../Songs/SongCardProfile";

const SearchPage = () => {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.search);
  const url = useLocation().search;
  const search = new URLSearchParams(url).get("search");

  useEffect(() => {
    dispatch(fetchSearchResults(search));
  }, [dispatch]);

  return (
    <>
      <h2>Here's what we found for "{search}":</h2>
      {Object.values(results).map((result) =>
        result.title ? (
          <SongCardProfile song={result} />
        ) : (
            <ArtistCard artist={result} />
        )
      )}
    </>
  );
};

export default SearchPage;
