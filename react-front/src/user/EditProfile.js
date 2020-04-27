import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { read, update } from "./apiUser";
import { Redirect } from "react-router-dom";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      redirectToProfile: false,
      error: "",
    };
  }

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data.error) {
        // redirect if error
        this.setState({
          redirectToProfile: true,
        });
      } else {
        // console.log(data);
        this.setState({ id: data._id, name: data.name, email: data.email });
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

  // take the name,email,password and chain event function
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // click button submit pass api to backend
  clickSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    // create user object to send to backend
    const user = {
      name,
      email,
      password,
    };
    // console.log(user);
    const userId = this.props.match.params.userId;
    const token = isAuthenticated().token;
    update(userId, token, user).then((data) => {
      if (data.error) {
        // check for errors if errors update error state to display error
        this.setState({ error: data.error });
      } else {
        this.setState({
          redirectToProfile: true,
        });
      }
    });
  };

  signupForm = (name, email, password) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={this.handleChange("name")}
            type="text"
            className="form-control"
            value={name}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={this.handleChange("email")}
            type="email"
            className="form-control"
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={this.handleChange("password")}
            type="password"
            className="form-control"
            value={password}
            required
          />
        </div>
        <button
          onClick={this.clickSubmit}
          className="btn btn-raised btn-primary"
        >
          Update
        </button>
      </form>
    );
  };

  render() {
    const { id, name, email, password, redirectToProfile } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>
        {this.signupForm(name, email, password)}
      </div>
    );
  }
}

export default EditProfile;
