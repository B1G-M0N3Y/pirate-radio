import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { deleteSingleComment, fetchComments } from "../../store/comments";
import "./CommentsFromSong.css";

const CommentsFromSong = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.session.user;
  });

  const { id } = useParams();
  const comments = useSelector((state) => state.comments);

  const deleteComment = async (commentId) => {
    await dispatch(deleteSingleComment(commentId));
  };

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  const gaming = Object.values(comments);

  if (!gaming.length) return null;

  return (
    <>
      {gaming?.map((comment) => {
        if (!comment.User) {
          return (
            <div className="single-comment">
              <div className="user-pic">{user?.username?.slice(0, 1)}</div>
              <div className="comment-text">
                <p className="comment-username"> {user?.username} </p>
                <p className="comment-body" key={comment?.id}>
                  {" "}
                  {comment?.body}{" "}
                </p>
                <br />
              </div>
              <button onClick={() => deleteComment(comment.id)}>
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          );
        } else {
          return (
            <div className="single-comment">
              <div className="user-pic">
                {comment.User.username.slice(0, 1)}
              </div>
              <div className="comment-text">
                <p className="comment-username"> {comment?.User?.username} </p>
                <p className="comment-body" key={comment?.id}>
                  {" "}
                  {comment?.body}{" "}
                </p>
                <br />
              </div>
              <Link to={`/comments/deleted`}>
                <button
                  hidden={!(user?.id === comment?.User?.id)}
                  onClick={() => deleteComment(comment.id)}
                >
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </Link>
            </div>
          );
        }
      })}
    </>
  );
};

export default CommentsFromSong;
