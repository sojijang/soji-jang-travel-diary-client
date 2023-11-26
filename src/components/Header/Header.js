import "./Header.scss";
import { Link } from "react-router-dom";
import LoginIcon from "../../assets/icons/pin-code_2186105.svg";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const hideHeaderForPaths = ["/"];

  if (hideHeaderForPaths.includes(location.pathname)) {
    return <></>;
  }
  return (
    <header className="header">
      <Link className="header__link" to="/login">
        <img className="header__login-icon" src={LoginIcon} alt="Login" />
      </Link>
      <div className="header__border"></div>
    </header>
  );
}
