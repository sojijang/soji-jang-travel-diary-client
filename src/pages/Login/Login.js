import "./Login.scss";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthField from "../../components/AuthField/AuthField";
import KeyIcon from "../../assets/icons/key_2001957.svg";

export default function Login({ setCurrentUser }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/auth/login",
        {
          email: event.target.email.value,
          password: event.target.password.value,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);

      setCurrentUser(decodedToken.id);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError(error.response ? error.response.data : "An error occurred");
    }
  };

  return (
    <main className="login-page">
      <form className="login" onSubmit={handleSubmit}>
        <div className="login__wrapper">
          <img className="login__icon" src={KeyIcon} alt="Key" />
          <h2 className="login__title">Log in</h2>
        </div>
        <AuthField type="text" name="email" label="Email" />
        <AuthField type="password" name="password" label="Password" />
        <button className="login__button">Log in</button>
        {error && <div className="login__message">{error}</div>}
      </form>
      <p className="login-page__text">
        Don't you have an account?{" "}
        <Link to="/signup" className="login-page__button">
          Sign up
        </Link>
      </p>
    </main>
  );
}
