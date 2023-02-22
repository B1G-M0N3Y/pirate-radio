import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongCount } from "../../store/songs";
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
    dispatch(fetchSongCount())
    console.log('totalPages', totalPages)
  }, [dispatch])

  const pageBack = async() => {

  }

  const pageForward = async() => {


  }

  return (
    <>
      <h2> Hear what’s trending for free in the Pirate Radio community </h2>
      <SongsIndex />
      <div>
        {currPage > 1 &&
          <i
          class="fa-solid fa-chevron-left"
          onClick={pageBack}
          ></i>
        }
        {currPage} / {totalPages}
        {currPage < totalPages &&
          <i
          class="fa-solid fa-chevron-right"
          onClick={pageForward}
          ></i>
        }
      </div>
    </>
  )
}

export default AllSongsPage;
