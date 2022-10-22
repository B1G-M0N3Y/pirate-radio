import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import PlayPause from "../AudioPlayer/PlayPause";
import ProfileButton from "../Navigation/ProfileButton";

const SongCardProfile = ({ song }) => {
  const artist = useSelector((state) => state.artists.singleArtist);

  const profileOrSearch = () => {
    if(song.Artist){
      return song.Artist
    } else {
      return artist
    }
  }
  console.log('artist', artist)
  console.log('thingy', profileOrSearch)

  return (
    <div className="song-card-profile">
      <img className="song-pic" src={song.imageUrl} />
      <div className="profile-song-info">
        <PlayPause id={song.id} styling={"profile-play"} />
        <div className="profile-song-text">
          <NavLink key={song.id} className="song-link-profile" to={`/songs/${song.id}`}>
            <p className="song-title">{song.title}</p>
          </NavLink>
          <NavLink to={`/artists/${profileOrSearch().id}`} className="song-artist">{song.Artist ? (
            song.Artist?.username
            ):(
              artist.username
            )}</NavLink>
        </div>
      </div>
    </div>
  );
};

export default SongCardProfile;
