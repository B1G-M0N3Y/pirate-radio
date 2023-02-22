import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongCount, fetchSongs } from "../../store/songs";
import SongsIndex from "./SongsIndex";

const DEFAULT_SIZE = 12

const AllSongsPage = () => {
  const dispatch = useDispatch()
  const count = useSelector((state) => {
    return state.songs.count;
  });
  const totalPages = Math.ceil(count / DEFAULT_SIZE);
  const [currPage, setCurrPage] = useState(1);


  useEffect(() => {
    dispatch(fetchSongs(currPage))
    dispatch(fetchSongCount())
  }, [dispatch, currPage])


  return (
    <>
      <h2> Hear what’s trending for free in the Pirate Radio community </h2>
      <SongsIndex />
      <div className="pagination-button-container">
        {currPage > 1 &&
          <button
            className="pagination-button"
            onClick={() => setCurrPage(currPage - 1)}
            >
            <i
              class="fa-solid fa-chevron-left"
              ></i>
          </button>
        }
        {currPage} / {totalPages}
        {currPage < totalPages &&
          <button
            className="pagination-button"
            onClick={() => setCurrPage(currPage + 1)}
          >
            <i
              class="fa-solid fa-chevron-right"
            ></i>
          </button>
        }
      </div>
    </>
  )
}

export default AllSongsPage;
