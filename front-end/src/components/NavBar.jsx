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

  const closeNavBar = () => {
    if (isOpen) {
      setIsOpen(false)
    }
  };

  return (
    <div>
      <Navbar className="navbar-expand-sm navbar-light bg-secondary fixed-top" style={{maxWidth: "100%"}}>
        <NavbarBrand><navbar-brand style={{ color: '#98CE00' }}><Link tag={Link} to="/" style={{ color: '#98CE00' }}>PlantFitPro</Link></navbar-brand></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {token ? (
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink className="navLink" tag={Link} to="/" onClick={closeNavBar}>Home</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="dropdownToggle" nav caret>
                  Workouts
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem><NavLink className="navLink" tag={Link} to="/workouts" onClick={closeNavBar}>Workout Generator</NavLink></DropdownItem>
                  <DropdownItem><NavLink className="navLink" tag={Link} to="/myworkouts" onClick={closeNavBar}>My Workouts</NavLink></DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="dropdownToggle" nav caret>
                  Recipes
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem><NavLink className="navLink" tag={Link} to="/recipes" onClick={closeNavBar}>Recipe Generator</NavLink></DropdownItem>
                  <DropdownItem><NavLink className="navLink" tag={Link} to="/favorites" onClick={closeNavBar}>Favorites</NavLink></DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink style={{marginRight: "10px"}} className="navLink" tag={Link} to="/login" onClick={handleLogout}>Logout</NavLink>
              </NavItem>
            </Nav>
          ) : null}
          {/* <NavbarText style={{ marginRight: "10px" }}>
      <span style={{color: '#97ce00'}}>{displayName} </span>
    </NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;