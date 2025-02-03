import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../store/authProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuthentication();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      setLoading(false);
      navigate("/");
    } catch {
      alert("login details invalid");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="mainContainer">
        <div className="form-signin w-100 m-auto secondContainer">
          <form>
            <p className="text-center mb-0 ">Login to</p>
            <h1 className="h1 mb-3 fw-normal text-center newFont">
              FaceGram App
            </h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control LogInInput"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control LogInInput"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="signup">
              <p>
                Don't have an account ?{"  "}
                <Link to="/signup">Create an Account</Link>
              </p>
            </div>

            {!loading ? (
              <button
                className="btn btn-primary w-100 py-2"
                type="submit"
                onClick={handleLogin}
              >
                Sign In
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
            <hr />
            <button
              className="btn btn-danger w-100 py-2 cursor-disabled"
              type="button"
              disabled
            >
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
