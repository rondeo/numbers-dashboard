import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../modules/user/actions";
import { setActiveRoute } from "../modules/route/actions";

class UserNav extends Component {

  handleLogout() {
    this.props.logoutUser();
  }

  handleLoginClick() {
    this.props.setCurrentRoute(this.props.location.pathname);
  }

  getButtons() {
    if(this.props.userInfo.annonymous) {
      return (
        <Fragment>
          <span data-toggle="collapse" data-target="#toggleUserInfoHeader">
            <Link className="btn btn-outline-secondary mr-2 my-sm-0 btn-sm" to="/createaccount">Create Profile</Link>
          </span>
          <span data-toggle="collapse" data-target="#toggleUserInfoHeader">
            <Link className="btn btn-secondary my-sm-0 btn-sm" to="/login" onClick={() => this.handleLoginClick()}>Login</Link>
          </span>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <span data-toggle="collapse" data-target="#toggleUserInfoHeader">
            <Link className="btn btn-outline-secondary mr-2 my-sm-0 btn-sm" to="/editprofile">Edit Profile</Link>
          </span>
          <span data-toggle="collapse" data-target="#toggleUserInfoHeader">
            <button className="btn btn-secondary my-sm-0 btn-sm" onClick={() => this.handleLogout()}>Logout</button>
          </span>
        </Fragment>
      )
    }
  }

  render() {
    return (
      <div className="collapse" id="toggleUserInfoHeader">
        <div className="d-flex bg-light p-1">
          <div className="p-2">
            <span className="font-weight-bold">{this.props.userInfo.displayName}</span>
          </div>
          <div className="ml-auto p-1">
            {this.getButtons()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logout()),
    setCurrentRoute: (route) => dispatch(setActiveRoute(route))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserNav));
