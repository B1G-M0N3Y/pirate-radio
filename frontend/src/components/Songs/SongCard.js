import { NavLink } from "react-router-dom";
import PlayPause from "../AudioPlayer/PlayPause";

const SongCard = ({ song }) => {
  console.log(song.Artist)
  return (
    <div className="song-card">
      <img className="song-pic" src={song.imageUrl} />
      <PlayPause id={song.id} styling={'play-song'}/>
      <NavLink key={song.id} className="song-link" to={`/songs/${song.id}`}>
        <p className="song-title">{song.title}</p>
      </NavLink>
      <NavLink to={`/artists/${song.Artist?.id}`}>
        <p className="song-user">{song.Artist?.username}</p>
      </NavLink>
    </div>
  );
};

export default SongCard;
