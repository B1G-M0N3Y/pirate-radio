import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useCurrSong } from "../../context/Audio";
import { fetchAudioDetails } from "../../store/audioPlayer";

const [PLAY_ICON, PAUSE_ICON] = ['https://res.cloudinary.com/dy199z8qt/image/upload/v1663887398/songplay_tb28tn.png',
'https://res.cloudinary.com/dy199z8qt/image/upload/v1665606848/Eo_circle_deep-orange_pause.svg_k3htym.png']

const SongCard = ({ song }) => {
  const dispatch = useDispatch();
  let player = document.querySelector('.player')
  let{ currSong, isPlaying } = useCurrSong();
  const audio = useSelector((state) => state.audio.currentAudio);

  const playPause = async (id) => {
    if(player.classList.value.includes('rhap_play-status--playing')){
      currSong.current.audio.current.pause();
    } else {
      currSong.current.audio.current.play();
    }
    player = document.querySelector('.player');
    await dispatch(fetchAudioDetails(id));
  };

  return (
    <div className="song-card">
      <img className="song-pic" src={song.imageUrl} />
      <div className="play-song">
        <img src={isPlaying && audio.id === song.id ? PAUSE_ICON : PLAY_ICON}
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
