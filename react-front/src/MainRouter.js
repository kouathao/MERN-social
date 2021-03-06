import React from "react";
import { Route, Switch } from "react-router-dom";

// components
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Menu from "./core/Menu";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/signin" component={Signin}></Route>
        <Route exact path="/user/:userId" component={Profile}></Route>
        <Route exact path="/user/edit/:userId" component={EditProfile}></Route>
        <Route exact path="/users/" component={Users}></Route>
      </Switch>
    </div>
  );
};

export default MainRouter;
