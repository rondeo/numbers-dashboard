import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import { fetchUser } from "../modules/user/actions";

class User extends Component {

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <div className="nav-item">
        <span className={"nav-link " + (!this.props.userInfo.annonymous ? "active" : "")} data-toggle="collapse" data-target="#toggleUserInfoHeader" style={{padding:"0px"}}>
          <FontAwesomeIcon icon="user-circle" size="2x" style={{cursor:"pointer"}}/>
        </span>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(fetchUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
