import React, { Component } from 'react';
import { connect } from "react-redux";
import { markAsRead } from "../../modules/messages/actions";
import { fetchHomePage } from "../../modules/home/actions";
import { TransitionGroup, CSSTransition } from "react-transition-group";
// Components
import LatestDrawing from '../LatestDrawing';
import NextDrawing from '../NextDrawing';
import Refresh from '../Refresh';

class HomeTab extends Component {

  componentDidMount() {
    if(this.props.drawing === null) {
      this.props.fetchData();
    }
  }

  hideMessage(messageId) {
    this.props.markAsRead(messageId);
  }

  refreshContent() {
    this.props.fetchData();
  }

  getMessages() {
    return this.props.messages.filter((message) => {
      return !message.viewed;
    }).map((message, index) => {
      return (
        <CSSTransition key={`hometab-message-${message.messageId}`} timeout={500} classNames="message">
          <div className="alert alert-success alert-dismissible" role="alert">
            {message.message}
            <button type="button" className="close" aria-label="Close" onClick={() => this.hideMessage(message.messageId)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </CSSTransition>
      )
    });
  }

  getHomePageBody() {
    if (this.props.hasErrored) {
      return (
        <CSSTransition key={"hometab-error"} timeout={50} classNames="loader">
          <p>Ooops, sorry! There was an error loading the drawings</p>
        </CSSTransition>
      );
    }

    if (this.props.isLoading) {
      return (
        <CSSTransition key={"hometab-loader"} timeout={50} classNames="loader">
          <div className="container-fluid text-center">
            <div className="loader"></div>
            Loading...
          </div>
        </CSSTransition>
      );
    }

    if(this.props.drawing !== null && this.props.jackpot !== null) {
      return (
        <CSSTransition key={"hometab-content"} timeout={500} classNames="message">
          <div className="container-fluid" style={{paddingRight: "0px", paddingLeft: "0px"}}>
            <div className="card-deck">
              <LatestDrawing drawing={this.props.drawing}/>
              <NextDrawing next={this.props.next} jackpot={this.props.jackpot}/>
            </div>
          </div>
        </CSSTransition>
      );
    }

    return "";
  }

  render() {
    return (
      <div className="tab-pane" id="home">
        <h3>
          Home
          <Refresh onClick={() => this.refreshContent()} />
        </h3>
        <hr/>
        <TransitionGroup>
          {this.getMessages()}
        </TransitionGroup>
        <TransitionGroup>
          {this.getHomePageBody()}
        </TransitionGroup>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    drawing: state.homePage.drawing,
    jackpot: state.homePage.jackpot,
    next: state.homePage.next,
    hasErrored: state.homePage.hasErrored,
    isLoading: state.homePage.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    markAsRead: messageId => dispatch(markAsRead(messageId)),
    fetchData: () => dispatch(fetchHomePage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab);
