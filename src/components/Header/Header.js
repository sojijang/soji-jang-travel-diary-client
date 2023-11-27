import "./Header.scss";
import { Link } from "react-router-dom";
import LogoIcon from "../../assets/icons/pen_12958.svg";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const hideHeaderForPaths = ["/"];

  if (hideHeaderForPaths.includes(location.pathname)) {
    return <></>;
  }
  return (
    <header className="header">
      <div className="header__wrapper">
        <Link className="header__link" to="/dashboard">
          <img className="header__image" src={LogoIcon} alt="Logo icon" />
        </Link>
        <Link className="header__link" to="/login">
          <button className="header__button">Login</button>
        </Link>
      </div>
    </header>
  );
}
