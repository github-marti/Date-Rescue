import React from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const NavTop = function () {
    return (
        <div>
            <Navbar color="light" light expand="md">
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="./components/Home">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="./components/location">Location</NavLink>
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