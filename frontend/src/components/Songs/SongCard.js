import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchAudioDetails } from "../../store/audioPlayer";

const SongCard = ({ song }) => {
  const dispatch = useDispatch();

  const changeSong = async (id) => {
    await dispatch(fetchAudioDetails(id));
  };

  return (
    <div className="song-card">
      <img className="song-pic" src={song.imageUrl} />
      <div className="play-song">
        <img src="https://res.cloudinary.com/dy199z8qt/image/upload/v1663887398/songplay_tb28tn.png"
        onClick={() => changeSong(song.id)}/>
      </div>
      <NavLink key={song.id} className="song-link" to={`/songs/${song.id}`}>
        <p className="song-title">{song.title}</p>
        <p className="song-user">{song.Artist?.username}</p>
      </NavLink>
    </div>
  );
};

export default SongCard;
