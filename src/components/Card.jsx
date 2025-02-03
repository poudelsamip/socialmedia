import { useEffect, useState } from "react";
import { db } from "../Config/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useAuthentication } from "../store/authProvider";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const Card = ({ title, body, likes, email, id, likedBy }) => {
  const { user } = useAuthentication();
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(false);

  const currentPost = doc(db, "posts", id);
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
        <h6 className="card-subtitle text-muted">{email}</h6>
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
