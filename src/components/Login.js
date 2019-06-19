import React, { Component } from 'react';
import { connect } from "react-redux";
import { setActiveTab } from "../js/actions/index";

const mapDispatchToProps = dispatch => {
  return {
    setActiveTab: activeTab => dispatch(setActiveTab(activeTab))
  };
};

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cssClass: 'dropdown-item'
    };
  }

  handleClick(tab, href) {
    this.props.setActiveTab({displayName: tab, href: href});
    this.setState({
      cssClass: 'dropdown-item ' + new Date().getTime()
    });
  }

  render() {
    return (
      <li className="nav-item dropdown navbar-dark">
        <a className="nav-link dropdown-toggle" href="#loginDropdown" id="navbarLogin" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Login
        </a>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarLogin">
          <a className={this.state.cssClass} href="#createAccount" data-toggle="tab" onClick={() => this.handleClick("Create Account", "#createAccount")}>Create Account</a>
          <div className="dropdown-divider"></div>
          <a className={this.state.cssClass} href="#login" data-toggle="tab" onClick={() => this.handleClick("Login", "#login")}>Login</a>
        </div>
      </li>
    );
  }

}

export default connect(null, mapDispatchToProps)(Login);
