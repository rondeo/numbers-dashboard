import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { Redirect, withRouter } from 'react-router-dom';
import { login } from "../../modules/user/actions";

class LoginTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if(event.target.id === "userNameInput") {
      this.setState({userName: event.target.value});
    } else if(event.target.id === "passwordInput") {
      this.setState({password: event.target.value});
    }
  }

  handleSubmit(event) {
    this.props.loginUser(this.state.userName, this.state.password);
    event.preventDefault();
  }

  showFailureMessage() {
    if(this.props.userInfo.loginFailed) {
      return (
        <CSSTransition key={"logintab-message"} timeout={500} classNames="message">
          <div className="alert alert-success alert-dismissible" role="alert">Ooops, Something wasn't quite right. Please try again.</div>
        </CSSTransition>
      );
    }
    return "";
  }

  render() {
    if(!this.props.userInfo.annonymous) {
      return <Redirect to={this.props.currentRoute} />;
    }

    return (
      <div className="tab-pane" id="login">
        <div className="container" style={{paddingRight: "0px", paddingLeft: "0px"}}>
          <div className="row justify-content-center align-items-center" >
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <TransitionGroup>
                {this.showFailureMessage()}
              </TransitionGroup>
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title text-center">Login</h4>
                  <hr/>
                  <div className="form-group row">
                    <label htmlFor="userNameInput" className="col-sm-3 col-form-label">User Name</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="userNameInput" placeholder="Enter Username" onChange={this.handleChange}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="passwordInput" className="col-sm-3 col-form-label">Password</label>
                    <div className="col-sm-9">
                      <input type="password" className="form-control" id="passwordInput" placeholder="Enter Password" onChange={this.handleChange}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-12 text-right">
                      <button type="button" className="btn btn-outline-primary btn-sm" style={{marginRight: "10px"}}>Create Account</button>
                      <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-sm">Login</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    currentRoute: state.activeRoute.name
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (username, password) => dispatch(login(username, password))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginTab));
