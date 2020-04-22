import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

// get access to history object with WithRouter
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary justify-content-end">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        {isAuthenticated() && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, `/user/${isAuthenticated().user._id}`)}
              to={`/user/${isAuthenticated().user._id}`}
            >
              {`${isAuthenticated().user.name}'s Profile`}
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <React.Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Sign In
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
          </React.Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <a
              href="#"
              className="nav-link"
              style={
                (isActive(history, "/signout"),
                { cursor: "pointer", color: "#fff" })
              }
              onClick={() => signout(() => history.push("/"))}
            >
              Sign Out
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

// apply HOC withRouter to component
export default withRouter(Menu);
