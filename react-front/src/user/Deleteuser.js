import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { isAuthenticated, signout } from "../auth";
import { remove } from "./apiUser";
import { Redirect } from "react-router-dom";

class Deleteuser extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      alert: null,
    };
  }
  deleteAccount = () => {
    const token = isAuthenticated().token;
    const userId = this.props.userId;
    remove(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        //signout user
        signout(() => {
          console.log("User is deleted");
        });
        // redirect
        this.setState({ redirect: true });
      }
    });

    this.setState({
      alert: null,
    });
  };

  deleteThisGoal() {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={this.deleteAccount}
        onCancel={this.hideAlert}
        focusCancelBtn
      >
        You will not be able to recover this account!
      </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
    });
  }

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <button
          onClick={() => this.deleteThisGoal()}
          data-toggle="modal"
          data-target="#exampleModal"
          className="btn btn-raised btn-danger"
        >
          Delete Profile
        </button>
        {this.state.alert}
      </React.Fragment>
    );
  }
}

export default Deleteuser;
