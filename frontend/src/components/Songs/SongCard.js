import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useCurrSong } from "../../context/Audio";
import { fetchAudioDetails } from "../../store/audioPlayer";

const SongCard = ({ song }) => {
  const dispatch = useDispatch();
  let player = document.querySelector('.player')
  let{ currSong } = useCurrSong();


  const playPause = async (id) => {
    console.log("play clicked!");
    if(player.classList.value.includes('rhap_play-status--playing')){
      currSong.current.audio.current.pause();
    } else {
      currSong.current.audio.current.play();
    }
    await dispatch(fetchAudioDetails(id));
  };

  return (
    <div className="song-card">
      <img className="song-pic" src={song.imageUrl} />
      <div className="play-song">
        <img src="https://res.cloudinary.com/dy199z8qt/image/upload/v1663887398/songplay_tb28tn.png"
        onClick={() => playPause(song.id)}/>
      </div>
      <NavLink key={song.id} className="song-link" to={`/songs/${song.id}`}>
        <p className="song-title">{song.title}</p>
        <p className="song-user">{song.Artist?.username}</p>
      </NavLink>
    </div>
  );
};

export default SongCard;
