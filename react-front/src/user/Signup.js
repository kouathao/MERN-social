import React, { Component } from "react";
import { signup } from "../auth";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false,
    };
  }

  // take the name,email,password and chain event function
  handleChange = (name) => (event) => {
    // clear error
    this.setState({ error: "" });
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
    signup(user).then((data) => {
      if (data.error) {
        // check for errors if errors update error state to display error
        this.setState({ error: data.error });
      } else {
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          open: true,
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
          Submit
        </button>
      </form>
    );
  };

  render() {
    const { name, email, password, error, open } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>
        {/* error messsage box  */}
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {/* success message box  */}
        <div
          className="alert alert-primary"
          style={{ display: open ? "" : "none" }}
        >
          New Account is successfully created! Please sign in
        </div>
        {this.signupForm(name, email, password)}
      </div>
    );
  }
}

export default Signup;
