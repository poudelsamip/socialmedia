import { MdLogout } from "react-icons/md";
import { useAuthentication } from "../store/authProvider";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import { Link } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import { useEffect } from "react";

const Profile = () => {
  const { user, logout, postList, userLoading } = useAuthentication();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  const filteredPostList = user
    ? postList.filter((post) => post.author.email === user.email)
    : [];

  useEffect(() => {
    if (userLoading) return;
    if (!user) {
      navigate("/");
    }
  }, [user, userLoading]);

  return (
    <div className="d-flex justify-content-center">
      <div className="contentsColumn">
        <div className=" border border-secondary d-flex justify-content-between align-items-center px-3 mt-2 shadow p-3 bg-white rounded">
          {user && <span>email : {user.email}</span>}
          <button
            type="button"
            className="btn btn-outline-secondary me-2 d-flex align-items-center "
            onClick={handleLogout}
          >
            <span className="me-2">Logout</span>
            <MdLogout size={20} />
          </button>
        </div>
        <hr />
        <div className="border border-secondary shadow p-3 bg-white rounded">
          <Link to="/createpost" className="nav-link mx-3 px-2 ">
            <IoIosCreate size={20} /> Create Post
          </Link>
        </div>
        <hr />
        <div className="userPosts">
          <h3>Your posts</h3>
          {filteredPostList.map((post) => (
            <Card
              title={post.title}
              body={post.body}
              likes={post.likes}
              email={post.author.email}
              id={post.id}
              likedBy={post.likedBy}
              postList={postList}
              key={post.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
