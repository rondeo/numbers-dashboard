import React, { Component } from 'react';
import NavItem from './NavItem';
import { connect } from "react-redux";
import { setActiveTab } from "../js/actions/index";

const mapStateToProps = state => {
  return { activeTab: state.activeTab };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveTab: activeTab => dispatch(setActiveTab(activeTab))
  };
};

class SubNavbar extends Component {

  handleClick(tab, href) {
    this.props.setActiveTab({displayName: tab, href: href});
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav nav">
            <NavItem displayName={"Home"} name={"home"} icon={"home"} location={"#home"} active={this.props.activeTab.href === "#home"} onClick={() => this.handleClick("Home", "#home")} />
            <NavItem displayName={"My Picks"} name={"myPicks"} icon={"list-alt"} location={"#myPicks"} active={this.props.activeTab.href === "#myPicks"} onClick={() => this.handleClick("My Picks", "#myPicks")} />
            <NavItem displayName={"Favorites"} name={"favorites"} icon={"star"} location={"#favorites"} active={this.props.activeTab.href === "#favorites"} onClick={() => this.handleClick("Favorites", "#favorites")} />
            <NavItem displayName={"Drawings"} name={"drawings"} icon={"th"} location={"#drawings"} active={this.props.activeTab.href === "#drawings"} onClick={() => this.handleClick("Drawings", "#drawings")} />
            <NavItem displayName={"Whiteball Numbers"} name={"whiteballNumbers"} icon={"chart-bar"} location={"#whiteballNumbers"} active={this.props.activeTab.href === "#whiteballNumbers"} onClick={() => this.handleClick("Whiteball Numbers", "#whiteballNumbers")} />
            <NavItem displayName={"Powerball Numbers"} name={"powerballNumbers"} icon={"chart-bar"} location={"#powerballNumbers"} active={this.props.activeTab.href === "#powerballNumbers"} onClick={() => this.handleClick("Powerball Numbers", "#powerballNumbers")} />
            <NavItem displayName={"Jackpots"} name={"jackpots"} icon={"money-bill-wave"} location={"#jackpots"} active={this.props.activeTab.href === "#jackpots"} onClick={() => this.handleClick("Jackpots", "#jackpots")} />
          </ul>
        </div>
      </nav>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SubNavbar);
