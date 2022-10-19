import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistDetails } from "../../store/artists";
import "./ArtistDetails.css";

const ArtistDetails = () => {
  const dispatch = useDispatch();

  const artist = useSelector((state) => {
    return state.artists.singleArtist;
  });

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchArtistDetails(id));
  }, [dispatch, id]);

  console.log(artist);

  return (
    <>
      <div className="user-banner">
        <img className="profile-pic" src={artist.imageUrl}></img>
        <div className="profile-info">
          <h2>{artist.username}</h2>
          <h4>
            {artist.firstName} {artist.lastName}
          </h4>
        </div>
      </div>
      {artist.songs.map((song) => (
        <p>{song.title}</p>
      ))}
    </>
  );
};

export default ArtistDetails;
