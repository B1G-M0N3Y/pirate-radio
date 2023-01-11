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
      console.log(likes[i].userId)
      console.log(user.id)
      if(likes[i].userId === user?.id){
        console.log('here')
        return true
      }
    }
    console.log('why')
    return false
  }
  const [userLikesThis, setUserLikesThis] = useState();
  console.log(userLikesThis)
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

  useEffect(() => {
    setUserLikesThis(isLiked(song?.Likes));
  }, [dispatch, id, isLiked])

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
        <button onClick={like} className={`like${userLikesThis}`}>
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
