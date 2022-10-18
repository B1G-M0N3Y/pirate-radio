import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchArtists } from "../../store/artists";

const ArtistIndex = () => {
    const dispatch = useDispatch();
    const artists = useSelector((state) => {
        return state.artists;
    });

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    return(
        <div>
            {Object.values(artists).map(artist => {
                return <li key={artist.id}>{artist.username}</li>
            })}
        </div>
    )
}

export default ArtistIndex
