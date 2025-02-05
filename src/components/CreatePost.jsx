import { useEffect, useState } from "react";
import { auth, db } from "../Config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { useAuthentication } from "../store/authProvider";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const postCollectionRef = collection(db, "posts");
  const { user } = useAuthentication();

  const [loading, setLoading] = useState(false);

  const handleBackButton = () => {
    navigate("/profile");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(postCollectionRef, {
        title,
        body,
        likes: 0,
        likedBy: [],
        comments: [],
        time: serverTimestamp(),
        author: { email: auth.currentUser.email, id: auth.currentUser.uid },
      });
      setLoading(false);
      navigate("/");
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="d-flex justify-content-center">
      <div className="contentsColumn createPost shadow p-3 bg-white rounded my-5 border">
        <div className="d-flex align-items-center px-1">
          <button
            className="btn btn-outline-none p-0"
            onClick={handleBackButton}
          >
            <IoArrowBackCircle size={30} />
          </button>
          <h2 className="h2 ms-3 mb-1">Create New Post</h2>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Post Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Body
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            placeholder="Post body"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div>
          {!loading ? (
            <button
              className="btn btn-primary w-100"
              type="submit"
              onClick={handleSubmit}
            >
              Post
            </button>
          ) : (
            <button className="btn btn-primary w-100" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
