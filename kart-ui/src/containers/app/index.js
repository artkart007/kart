import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Upload from '../upload'
import Gallery from '../gallery'
import Paintings from '../paintings'
import Photos from '../photos'
// eslint-disable-next-line
import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import './index.css';
import { LinkContainer } from 'react-router-bootstrap';
const App = () => (
  <div >
    <header>
      <Navbar inverse collapseOnSelect >
        <div className="container">
          <Navbar.Header>
        
            <Navbar.Brand>
              <Link to="/"><i className="fa fa-vk"></i></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer activeClassName='active' to="/paintings">
                <NavItem eventKey={1} >
                  Paintings
                  </NavItem>
              </LinkContainer>
              <LinkContainer activeClassName='active' to="/photos">
                <NavItem eventKey={2} >
                  Photos
                  </NavItem>
              </LinkContainer>
              <LinkContainer activeClassName='active' to="/gallery">
                <NavItem eventKey={3} >
                Gallery
                  </NavItem>
              </LinkContainer>
              <LinkContainer activeClassName='active' to="/upload">
                <NavItem eventKey={4} >
                Upload
                  </NavItem>
              </LinkContainer>
              
              {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown> */}
            </Nav>

          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>

    <main>
      <div className="container">

        <Route exact path="/" component={Home} />
        <Route exact path="/paintings" component={Paintings} />
        <Route exact path="/photos" component={Photos} />
        <Route exact path="/gallery" component={Gallery} />
        <Route exact path="/upload" component={Upload} />
      </div>
    </main>
  </div>
)

export default App

