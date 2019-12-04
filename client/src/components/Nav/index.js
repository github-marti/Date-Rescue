import React from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./style.css";

const NavTop = function () {
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
                        <NavLink href="./components/HomePage">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="./components/LocationForm">Location</NavLink>
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