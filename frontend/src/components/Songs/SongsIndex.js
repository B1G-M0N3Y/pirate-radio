import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { fetchSongs } from '../../store/songs';

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
            <ul>
                {Object.values(songs).map(song => {
                    return <NavLink key={song.id} to={`/songs/${song.id}`}>
                        {song.title}
                    </NavLink>
                })}
            </ul>
        </>
    )
}
export default SongsIndex;
