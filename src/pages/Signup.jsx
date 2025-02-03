import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../store/authProvider";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { signup } = useAuthentication();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password === confirmPass) {
      try {
        await signup(email, password);
        setLoading(false);
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("passwords are different");
    }
  };
  return (
    <>
      <div className="mainContainer">
        <div className="form-signin w-100 m-auto secondContainer">
          <form>
            <p className="text-center mb-0 ">Create an Account</p>
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
            <div className="form-floating">
              <input
                type="password"
                className="form-control LogInInput"
                id="floatingConfirmPassword"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <label htmlFor="floatingConfirmPassword">Confirm Password</label>
            </div>

            <div className="signup">
              <p>
                Already have an account ?{"  "}
                <Link to="/login">Sign In</Link>
              </p>
            </div>

            {!loading ? (
              <button
                className="btn btn-primary w-100 py-2"
                type="submit"
                onClick={handleSignup}
              >
                Sign Up
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
              className="btn btn-danger w-100 py-2"
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

export default SignUp;
