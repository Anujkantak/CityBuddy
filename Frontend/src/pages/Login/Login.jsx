
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ fixed
import { useDispatch, useSelector } from 'react-redux';
import { login, resetError } from '../../store/slices/userSlice';
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ fixed
  const { error, isAuthenticated } = useSelector((state) => state.user);

  const loginHandle = (e) => {
    e.preventDefault();
    const loginData = { email, password }; // ✅ use object, not FormData
    dispatch(login(loginData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetError());
    }
    if (isAuthenticated) {
      navigate("/"); // ✅ redirect after login
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <div className="register-container">
      <p className="title">Login to your Account</p>
      <form onSubmit={loginHandle} className="register-form">
        <div className="email-password">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="submit-button" type="submit">Login</button> {/* ✅ clean */}
        <p>
          New User? <Link className="link" to="/register">Create account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
