import './DeletedSong.css'
import { Link } from 'react-router-dom';

const DeletedSong = () => {
    return (
        <div className='deleted-container'>
            <div className="deleted">
                <h2>Song deleted!</h2>
                <img className="jolly-roger" src='https://res.cloudinary.com/dy199z8qt/image/upload/v1664168790/293956_uclywx.svg'></img>
                <Link to='/songs'>
                    <button className='plunder-button'>Plunder for More</button>
                </Link>
            </div>
        </div>
    )
}

export default DeletedSong;
