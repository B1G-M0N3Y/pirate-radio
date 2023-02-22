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

  // const pageBack = async () => {
  //   setCurrPage(currPage - 1)
  //   await dispatch(fetchSongs(currPage))
  // }

  // const pageForward = async () => {
  //   console.log('da page b4', currPage)
  //   setCurrPage(currPage + 1)
  //   console.log('da page b5', currPage)
  //   await dispatch(fetchSongs(currPage))
  // }

  return (
    <>
      <h2> Hear what’s trending for free in the Pirate Radio community </h2>
      <SongsIndex />
      <div>
        {currPage > 1 &&
          <button
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
