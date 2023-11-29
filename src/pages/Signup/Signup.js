import "./Signup.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthField from "../../components/AuthField/AuthField";
import UserIcon from "../../assets/icons/user_1836204.svg";

function Signup() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(process.env.REACT_APP_BASE_URL + "/auth/register", {
        first_name: event.target.first_name.value,
        last_name: event.target.last_name.value,
        email: event.target.email.value,
        password: event.target.password.value,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
      setError(error.response.data);
    }
  };

  return (
    <main className="signup-page">
      <form className="signup" onSubmit={handleSubmit}>
        <div className="signup__wrapper">
          <img className="signup__icon" src={UserIcon} alt="User" />
          <h1 className="signup__title">Sign up</h1>
        </div>
        <AuthField type="text" name="first_name" label="First name" />
        <AuthField type="text" name="last_name" label="Last name" />
        <AuthField type="text" name="email" label="Email" />
        <AuthField type="password" name="password" label="Password" />
        <button className="signup__button">Sign up</button>
        {error && <div className="signup__message">{error}</div>}
      </form>
      <p className="signup-page__text">
        Have an account?{" "}
        <button className="signup-page__button">
          <Link className="signup-page__link" to="/login">
            Log in
          </Link>
        </button>
      </p>
    </main>
  );
}

export default Signup;
