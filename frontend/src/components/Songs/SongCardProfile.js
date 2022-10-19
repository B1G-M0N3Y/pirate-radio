import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import PlayPause from "../AudioPlayer/PlayPause";
import ProfileButton from "../Navigation/ProfileButton";

const SongCardProfile = ({ song }) => {
  const artist = useSelector((state) => state.artists.singleArtist);

  return (
    <div className="song-card-profile">
      <img className="song-pic" src={song.imageUrl} />
      <div className="profile-song-info">
        <PlayPause id={song.id} styling={"profile-play"} />
        <div className="profile-song-text">
          <NavLink key={song.id} className="song-link-profile" to={`/songs/${song.id}`}>
            <p className="song-title">{song.title}</p>
          </NavLink>
          <p className="song-artist">{artist.username}</p>
        </div>
      </div>
    </div>
  );
};

export default SongCardProfile;
