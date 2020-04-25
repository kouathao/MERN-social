import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import DefaultProfile from "../images/avatar.jpeg";
import DeleteUser from "./Deleteuser";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSignin: false,
    };
  }

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data.error) {
        // redirect if error
        this.setState({
          redirectToSignin: true,
        });
      } else {
        // console.log(data);
        this.setState({ user: data });
      }
    });
  };

  // component mount send reqest to backend to get user info
  componentDidMount() {
    // get user id from url
    // console.log(this.props.match.params.userId);

    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  // change nav profile for user
  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, user } = this.state;
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container">
        <div className="card mt-5">
          <div className="card-header">Hello, {user.name}</div>
          <div className="card-body">
            <h5 className="card-title">Profile Info</h5>
            <div className="row">
              <div className="col-md-6">
                <img
                  className="card-img-top"
                  src={DefaultProfile}
                  alt={user.name}
                  style={{ width: "100%", height: "15vw", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-6">
                <div className="lead mt-2">
                  {" "}
                  <p className="card-text">Email: {user.email}</p>
                  <p>{`Joined: ${new Date(user.created).toDateString()}`}</p>
                </div>
                {isAuthenticated().user &&
                  isAuthenticated().user._id === user._id && (
                    <div className="d-inline-block mt5">
                      <Link
                        className="btn btn-raised btn-success mr-5"
                        to={`/user/edit/${user._id}`}
                      >
                        Edit Profile
                      </Link>
                      <DeleteUser userId={user._id} />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
