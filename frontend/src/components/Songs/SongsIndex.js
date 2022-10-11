import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchSongs } from "../../store/songs";
import SongCard from "./SongCard";
import "./SongsIndex.css";

const SongsIndex = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => {
    return state.songs;
  });

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  return (
    <>
      <div className="song-grid">
        {Object.values(songs).map((song) => {
          return (
            <SongCard song = {song} />
          );
        })}
      </div>
    </>
  );
};
export default SongsIndex;
