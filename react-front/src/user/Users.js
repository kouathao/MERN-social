import React, { Component } from "react";
import { list } from "./apiUser";
import DefaultProfile from "../images/avatar.jpeg";
import { Link } from "react-router-dom";

class Users extends Component {
  constructor() {
    super();

    this.state = {
      // store user state in empty array
      users: [],
    };
  }

  componentDidMount() {
    // method to list all user
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  renderUsers = (users) => (
    <div className="row">
      {users.map((user, index) => (
        <div className="col-md-4 mt-2 mb-2" key={index}>
          <div className="card">
            <img
              className="card-img-top"
              src={DefaultProfile}
              alt={user.name}
              style={{ width: "100%", height: "15vw", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">{user.email}</p>
              <Link
                to={`user/${user._id}`}
                className="btn btn-raised btn-primary btn-sm"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">User</h2>
        {this.renderUsers(users)}
      </div>
    );
  }
}

export default Users;
