import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchAudioDetails } from '../../store/audioPlayer';
import { deleteSingleSong, fetchSongDetails } from '../../store/songs';
import CommentsFromSong from '../Comments/CommentsFromSong';
import CreateComment from '../Comments/CreateComment';
import './SongDetails.css'

const SongDetails = () => {
    const dispatch = useDispatch();
    // const[showEditSong, setShowEditSong] = useState(false);
    // const[showDeleteSong, setShowDeleteSong] = useState(false);

    const { id } = useParams();
    const song = useSelector(state => state.songs.singleSong);
    // const song = songs?.singleSong

    const deleteSong = async () => {
        await dispatch(deleteSingleSong(id))
    }

    const changeSong = async () => {
        await dispatch(fetchAudioDetails(id))
    }

    useEffect(() => {
        dispatch(fetchSongDetails(id))
    }, [dispatch, id]);

    return (
        <>
            <div className='song-details'>
                <div className='details-left'>
                    <img className='play-button' onClick={() => changeSong()} src="https://res.cloudinary.com/dy199z8qt/image/upload/v1663887398/songplay_tb28tn.png" />
                    <div className='name-n-desc'>
                        <h2 className='title'>{song?.title}</h2>
                        <p>{song?.description}</p>
                    </div>
                </div>
                <img className='song-pic-details' src={song?.imageUrl} alt=""></img>
            </div>
            <div className='crud-clickers'>
                <Link to={`/songs/${id}/edit`}>
                    <button className='edit'>Edit Song</button>
                </Link>
                <Link to={`/songs/deleted`}>
                    <button className='delete' onClick={deleteSong}>Delete Song</button>
                </Link>
            </div>
            <hr></hr>
            <div className='comment-section'>
                <h2>Comments:</h2>
                <CreateComment />
                <CommentsFromSong className='all-comments'/>
            </div>
        </>
    )
}

export default SongDetails;
