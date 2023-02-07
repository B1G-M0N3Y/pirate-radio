import './DeletedSong.css'
import { Link } from 'react-router-dom';

const JOLLY_OGER_IMG_URL = "https://pirate-radio-kerner.s3.us-east-2.amazonaws.com/293956_uclywx.svg"

const DeletedSong = () => {
    return (
        <div className='deleted-container'>
            <div className="deleted">
                <h2>Song deleted!</h2>
                <img
                    className="jolly-roger"
                    src={JOLLY_OGER_IMG_URL}
                    alt='Jolly Roger'></img>
                <Link to='/songs'>
                    <button className='plunder-button'>Plunder for More</button>
                </Link>
            </div>
        </div>
    )
}

export default DeletedSong;
