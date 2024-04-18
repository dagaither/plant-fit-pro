import { useState } from 'react';
import galaxyLogo from '../assets/galaxy-svgrepo-com.svg';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const displayName = localStorage.getItem('display_name');
  const toggle = () => setIsOpen(!isOpen);
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('display_name');
  };

  return (
    <div>
      <Navbar className="navbar-expand-sm navbar-light bg-secondary fixed-top">
  <NavbarBrand><navbar-brand style={{ color: '#98CE00' }}>PlantFitPro</navbar-brand></NavbarBrand>
  <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {token ? (
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink className="navLink" tag={Link} to="/">Home</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className="dropdownToggle" nav caret>
                Workouts
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem><NavLink className="navLink" tag={Link} to="/workouts">Workout Generator</NavLink></DropdownItem>
                <DropdownItem><NavLink className="navLink" tag={Link} to="/myworkouts">My Workouts</NavLink></DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle className="dropdownToggle" nav caret>
                Recipes
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem><NavLink className="navLink" tag={Link} to="/recipes">Recipe Generator</NavLink></DropdownItem>
                <DropdownItem><NavLink className="navLink" tag={Link} to="/favorites">Favorites</NavLink></DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
              {/* <NavItem>
                <NavLink className="navLink" tag={Link} to="/login" onClick={handleLogout}>Logout</NavLink>
              </NavItem> */}
            </Nav>
          ) : null}
                <NavLink className="navLink" tag={Link} to="/login" onClick={handleLogout}>Logout</NavLink>
    {/* <NavbarText style={{ marginRight: "10px" }}>
      <span style={{color: '#97ce00'}}>{displayName} </span>
    </NavbarText> */}
      </Collapse>
    </Navbar>
    </div>
  );
}

export default NavBar;