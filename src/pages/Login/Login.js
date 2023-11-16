import "./Login.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthField from "../../components/AuthField/AuthField";

export default function Login() {
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

      sessionStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.response ? error.response.data : "An error occurred");
    }
  };

  return (
    <main className="login-page">
      <form className="login" onSubmit={handleSubmit}>
        <h1 className="login__title">Hello!</h1>
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
