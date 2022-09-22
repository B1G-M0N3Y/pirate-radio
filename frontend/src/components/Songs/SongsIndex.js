import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { fetchSongs } from '../../store/songs';
import './SongsIndex.css'


const SongsIndex = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => {
        return state.songs
    })

    useEffect(() => {
        dispatch(fetchSongs())
    }, [dispatch])

    return (
        <>
            <div className='song-grid'>
                {Object.values(songs).map(song => {
                    return (
                        <div className='song-card'>
                            <img className='song-pic' src={song.imageUrl} />
                            <div className='play-song'>
                                <img src="https://res.cloudinary.com/dy199z8qt/image/upload/v1663887398/songplay_tb28tn.png" />
                            </div>
                            <NavLink key={song.id} to={`/songs/${song.id}`}>
                                {song.title}
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default SongsIndex;
