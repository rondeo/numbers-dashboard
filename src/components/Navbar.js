import React from 'react';
import { connect } from "react-redux";
import User from './User';
import NavItem from './NavItem';
import { NavLink, withRouter } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg navbar-template">
      <button style={{marginRight:"10px"}}  className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown">
        <span className="navbar-toggler-icon"></span>
      </button>
      <NavLink className="navbar-brand" to="/">
        My Powerball Picks
      </NavLink>
      <div className="d-flex flex-row order-2 order-lg-3">
        <ul className="navbar-nav flex-row">
          <User/>
        </ul>
      </div>
      <div className="collapse navbar-collapse order-3 order-lg-2" id="navbarNavDropdown">
        <ul className="navbar-nav nav mr-auto">
          <NavItem displayName={"Home"} icon={"home"} href={"/"}/>
          <NavItem displayName={"My Picks"} icon={"list-alt"} href={"/mypicks"}/>
          <NavItem displayName={"Favorites"} icon={"star"} href={"/favorites"}/>
          <NavItem displayName={"Drawings"} icon={"th"} href={`/drawings/${props.pageSize}/${props.page}`}/>
          <NavItem displayName={"Whiteball Numbers"} icon={"chart-bar"} href={"/whiteballnumbers"}/>
          <NavItem displayName={"Powerball Numbers"} icon={"chart-bar"} href={"/powerballnumbers"}/>
          <NavItem displayName={"Jackpots"} icon={"money-bill-wave"} href={"/jackpots"}/>
        </ul>
      </div>
    </nav>
  )
};

const mapStateToProps = ({ drawings }) => {
  return {
    page: drawings.page,
    pageSize: drawings.pageSize
  };
};

export default withRouter(connect(mapStateToProps, null)(Navbar));
