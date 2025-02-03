import { useEffect, useState } from "react";
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

const Card = ({ title, body, likes, email, id, likedBy }) => {
  const { user } = useAuthentication();
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(false);
  const location = useLocation();

  const currentPost = doc(db, "posts", id);

  const handlePostDelete = async () => {
    await deleteDoc(currentPost);
    console.log("post deleted");
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
        <div className="d-flex justify-content-between align-items-center">
          <span className="card-subtitle text-muted">{email}</span>
          {location.pathname === "/profile" && (
            <button className="btn outline-none p-0" onClick={handlePostDelete}>
              <TiDelete size={30} />
            </button>
          )}
        </div>
        <hr className="my-1" />
        <div className="mainPost my-2">
          <h5 className="card-title">{title}</h5>
          <p className="mb-0">{body}</p>
        </div>
        <hr className="my-1" />
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
      </div>
    </div>
  );
};

export default Card;
