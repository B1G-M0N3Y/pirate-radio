import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchComments } from '../../store/comments'
import './CommentsFromSong.css'

const CommentsFromSong = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => {
        return state.session.user
    });

    const { id } = useParams();
    const comments = useSelector(state => state.comments);


    useEffect(() => {
        dispatch(fetchComments(id));
    }, [dispatch, id]);


    const gaming = Object.values(comments);

    if (!gaming.length) return null


    return (
        <>
            <div>
                {gaming?.map(comment => {
                    console.log(user)
                    if (!comment.User) {
                        return (

                            <div className='single-comment'>
                                <div className='user-pic'>
                                    {user.username.slice(0, 1)}
                                </div>
                                <div className='comment-text'>
                                    <p className='comment-user'> {user.username} </p>
                                    <p className='comment-body' key={comment?.id}> {comment?.body} </p>
                                    <br />
                                </div>
                                <button>
                                    <i
                                        className="fa-solid fa-x"></i>
                                </button>
                            </div>
                        )
                    } else {
                        return (
                            <div className='single-comment'>
                                <div className='user-pic'>
                                    {comment.User.username.slice(0, 1)}
                                </div>
                                <div className='comment-text'>
                                    <p className='comment-user'> {comment.User.username} </p>
                                    <p className='comment-body' key={comment?.id}> {comment?.body} </p>
                                    <br />
                                </div>
                                <button hidden={!(user.id === comment?.User?.id)}>
                                    <i
                                        className="fa-solid fa-x"></i>
                                </button>
                            </div>
                        )
                    }

                })}

            </div>
        </>
    )
}

export default CommentsFromSong;
