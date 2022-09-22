import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchComments } from '../../store/comments'

const CommentsFromSong = () => {
    const dispatch = useDispatch();

    const { id } = useParams();
    const comments = useSelector(state => state.comments);

    console.log('id', id)

    useEffect(() => {
        console.log('use effecting')
        dispatch(fetchComments(id));
    }, [dispatch, id])

    console.log(comments)
    const gaming = Object.values(comments)
    console.log('gaming', gaming)

    return (
        <>
            <div>
                <h2>Comments:</h2>
                <ul>
                    {gaming?.map(comment => {
                        return <li key={comment.id}> {comment.body} </li>
                    })}
                </ul>
            </div>
        </>
    )
}

export default CommentsFromSong;
