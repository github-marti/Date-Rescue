import React from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./style.css";

const NavTop = function (props) {
    return (
        <div className="dates">

            <Navbar color="secondary alert" light expand="sm">
                <Nav className="mr-auto" navbar>
                <NavItem className="ml-auto">
                        <span className="logo">
                            <img src={require("./redblock2.png")} height="75" width=""/>
                        </span>
                    </NavItem>
                    <NavItem>
                        <NavLink name="events" onClick={props.handleClick}>Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink name="locations" onClick={props.handleClick}>Location</NavLink>
                    </NavItem>
                    <NavItem className="signOut">
                        <NavLink href="">Log Out</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavTop;