import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";
import { deleteSingleSong, fetchSongDetails } from "../../store/songs";
import PlayPause from "../AudioPlayer/PlayPause";
import CommentsFromSong from "../Comments/CommentsFromSong";
import CreateComment from "../Comments/CreateComment";
import "./SongDetails.css";

const SongDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.session.user;
  });
  const { id } = useParams();
  const song = useSelector((state) => state.songs.singleSong);

  // Manages if current user has liked this song on initialization
  const isLiked = (likes) =>{
    for(let i = 0; i < likes?.length; i++){
      if(likes[i].userId === user?.id) return true
    }
    return false
  }
  const [userLikesThis, setUserLikesThis] = useState(isLiked(song?.Likes));

  // const song = songs?.singleSong

  const deleteSong = async () => {
    await dispatch(deleteSingleSong(id));
  };

  const like = async () => {
    if(!userLikesThis && user){
      await csrfFetch(`/api/songs/${id}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
    } else {
      await csrfFetch(`/api/songs/${id}/likes`, {
        method: 'DELETE'
      });
    }

    dispatch(fetchSongDetails(id));
    setUserLikesThis(!userLikesThis)
  }

  useEffect(() => {
    dispatch(fetchSongDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="song-details">
        <div className="details-left">
          <PlayPause id={id} styling={"details-play"} />
          <div className="name-n-desc">
            <h2 className="title">{song?.title}</h2>
            <p>{song?.description}</p>
          </div>
        </div>
        <img className="song-pic-details" src={song?.imageUrl} alt=""></img>
      </div>
      <div className="crud-clickers">
        <Link to={`/songs/${id}/edit`}>
          <button className="edit" hidden={!(user?.id === song?.userId)}>
            Edit Song
          </button>
        </Link>
        <Link to={`/songs/deleted`}>
          <button
            className="delete"
            hidden={!(user?.id === song?.userId)}
            onClick={deleteSong}
          >
            Delete Song
          </button>
        </Link>
      </div>
      <hr></hr>
      <div className="likes-section">
        <button onClick={like} className={userLikesThis}>
          <i class="fa-solid fa-heart"></i>
        </button>
        {song?.Likes?.length}
      </div>
      <div className="comment-section">
        <h2>Comments:</h2>
        {user?.id && <CreateComment />}
        {/* <CreateComment /> */}
        <CommentsFromSong className="all-comments" />
      </div>
    </>
  );
};

export default SongDetails;
