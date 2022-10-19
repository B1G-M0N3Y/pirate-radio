import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrArtist, fetchArtistDetails } from "../../store/artists";
import "./ArtistDetails.css";
import SongCardProfile from "../Songs/SongCardProfile";

const ArtistDetails = () => {
  const dispatch = useDispatch();

  const artist = useSelector((state) => {
    return state.artists.singleArtist;
  });

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchArtistDetails(id));
    return (() =>
      dispatch(clearCurrArtist())
    )
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
      <div className="artist-details-songs">
        {artist.songs?.map((song) => (
          <SongCardProfile song={song} />
        ))}
      </div>
    </>
  );
};

export default ArtistDetails;
