import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../store/authProvider";
import { MdAccountCircle } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthentication();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };

  const handleProfile = () => {
    navigate("/profile");
  };
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between px-3 py-2 border-bottom">
      <div className="col-md-3 mb-2 mb-md-0">
        <h3 className="h3 text-white mb-1">FaceGram</h3>
      </div>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 ">
        <Link to="/" className="nav-link px-2 mx-3 text-white">
          Home
        </Link>
        {/* {user && (
          <Link to="/createpost" className="nav-link mx-3 px-2 text-white">
            <IoIosCreate size={20} /> Create Post
          </Link>
        )} */}
      </ul>

      {!user ? (
        <div className="col-md-3 text-end">
          <button
            type="button"
            className="btn btn-outline-primary me-2"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSignup}
          >
            Sign-up
          </button>
        </div>
      ) : (
        <div className="col-md-3 text-end">
          <button
            type="button"
            className="btn btn-outline-secondary me-2"
            onClick={handleProfile}
          >
            <MdAccountCircle size={25} />
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
