import { NavLink } from "react-router-dom";
import "./ArtistCard.css"

const ArtistCard = ({artist}) => {
    return(
        <div className="artist-card">
            <img className="artist-pic" src={artist.imageUrl} />
            <div>
                <NavLink className= 'artist-text' to={`/artists/${artist.id}`}>
                    <p className="artist-username">{artist.username}</p>
                </NavLink>
            </div>
        </div>
    )
}

export default ArtistCard;
