import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from "react-router-dom";

const NavItem = (props) => {
  return (
    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
      <NavLink exact className={"nav-link"} activeClassName="active" to={props.href}>
        <FontAwesomeIcon className="d-lg-none" icon={props.icon} size="lg" style={{paddingRight: "10px"}} />
        {props.displayName}
      </NavLink>
    </li>
  )
};

export default NavItem;
