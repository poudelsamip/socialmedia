import { useEffect, useRef, useState } from "react";
import { db } from "../Config/firebase";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuthentication } from "../store/authProvider";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { FaRegCommentDots } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import CommentCard from "./CommentCard";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Card = ({
  title,
  body,
  likes,
  email,
  id,
  likedBy,
  time,
  allcomments,
}) => {
  const { user } = useAuthentication();
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(false);
  const location = useLocation();
  const [newComment, setNewComment] = useState();
  const commentBox = useRef();
  const [commentShown, setCommentShown] = useState(false);

  const currentPost = doc(db, "posts", id);

  const handlePostDelete = async () => {
    await deleteDoc(currentPost);
  };

  const likePost = async () => {
    if (user) {
      if (!likedBy.includes(user.email)) {
        try {
          await updateDoc(currentPost, {
            likes: likes + 1,
            likedBy: arrayUnion(user.email),
          });
        } catch (err) {
          alert(err);
        }
      } else {
        try {
          await updateDoc(currentPost, {
            likes: likes - 1,
            likedBy: arrayRemove(user.email),
          });
        } catch (err) {
          alert(err);
        }
      }
    } else {
      alert("please login to like the post");
    }
  };

  const commentPost = async () => {
    if (user) {
      try {
        await updateDoc(currentPost, {
          comments: arrayUnion({
            commenter: user.email,
            commentBody: newComment,
          }),
        });
        commentBox.current.value = "";
      } catch (err) {
        alert(err);
      }
    } else {
      alert("Please login to comment.");
    }
  };

  useEffect(() => {
    if (user) {
      if (likedBy.includes(user.email)) {
        setLikedByCurrentUser(true);
      } else {
        setLikedByCurrentUser(false);
      }
    }
  }, [likedBy]);

  return (
    <div className=" cardContainer mt-3">
      <div className="border border-secondary shadow px-3 py-1 bg-white rounded">
        <div className="d-flex justify-content-between align-items-center emailAndDate">
          <span className="card-subtitle text-muted email">{email}</span>
          <div className="forMobile">
            <span className="card-subtitle text-muted">
              {time?.toDate().toLocaleDateString()}
            </span>
            {location.pathname === "/profile" && (
              <button
                className="btn outline-none p-0"
                onClick={handlePostDelete}
              >
                <TiDelete size={30} />
              </button>
            )}
            {user &&
              user.email === "admin@facegram.com" &&
              location.pathname === "/" && (
                <button
                  className="btn outline-none p-0"
                  onClick={handlePostDelete}
                >
                  <TiDelete size={30} />
                </button>
              )}
          </div>
        </div>
        <hr className="my-1" />
        <div className="mainPost my-2">
          <h5 className="card-title">{title}</h5>
          <p className="mb-0">{body}</p>
        </div>
        <hr className="my-1" />
        <div className="likeAndComment d-flex justify-content-between">
          <button
            className="btn btn-outline-primary p-1 d-flex justify-content-center align-items-center"
            onClick={likePost}
          >
            {likedByCurrentUser ? (
              <AiFillLike size={20} />
            ) : (
              <AiOutlineLike size={20} />
            )}
            <span>{likes}</span>
          </button>

          <button
            className="btn btn-outline-primary py-1 px-2"
            onClick={() => setCommentShown(!commentShown)}
          >
            {commentShown && <IoMdCloseCircleOutline size={24} />}
            {!commentShown && <FaRegCommentDots size={18} />}
            {!commentShown && allcomments && <span>{allcomments.length}</span>}
            {!commentShown && !allcomments && <span> 0</span>}
          </button>
        </div>
        {commentShown && (
          <div>
            <div className="d-flex mt-2">
              <input
                type="text"
                className="form-control border border-secondary shadow-none "
                placeholder="Write comment"
                ref={commentBox}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                className="btn btn-secondary d-flex align-items-center ms-3"
                type="button"
                onClick={commentPost}
              >
                <IoMdSend />
              </button>
            </div>
            <hr />
            {allcomments && allcomments.length !== 0 && (
              <h3 className="h4">Comments</h3>
            )}
            {allcomments?.map((comment, index) => (
              <CommentCard key={index} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
