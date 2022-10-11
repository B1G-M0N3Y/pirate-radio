
import { useContext } from 'react'
import { Link } from 'react-router-dom';

const DeletedComment = () => {
    const song = useContext(state => state.songs.singleSong)

    return (
        <div className='deleted-container'>
            <div className="deleted">
                <h2>Comment deleted!</h2>
                <img className="jolly-roger" src='https://res.cloudinary.com/dy199z8qt/image/upload/v1664168790/293956_uclywx.svg'></img>
                <Link to={`/songs/${song}`}>
                    <button className='plunder-button'>Back to Song</button>
                </Link>
            </div>
        </div>
    )
}

export default DeletedComment;
