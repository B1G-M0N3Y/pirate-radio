import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistDetails } from "../../store/artists";

const ArtistDetails = () => {
  const dispatch = useDispatch();

  const artist = useSelector((state) => {
    return state.artists.singleArtist;
  });

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchArtistDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <img src={artist.imageUrl}></img>
      <h2>{artist.username}</h2>
    </>
  );
};

export default ArtistDetails;
