import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import { read } from "./apiUser";

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

  render() {
    const redirectToSignin = this.state.redirectToSignin;
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container">
        <div className="card mt-5">
          <div className="card-header">
            Hello, {isAuthenticated().user.name}
          </div>
          <div className="card-body">
            <h5 className="card-title">Profile Info</h5>
            <p className="card-text">Email: {isAuthenticated().user.email}</p>
            <p>{`Joined: ${new Date(
              this.state.user.created
            ).toDateString()}`}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
