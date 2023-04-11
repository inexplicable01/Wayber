import React, { Component } from "react";
import {
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Container,
  Collapse,
  Button,
} from "reactstrap";

import ScrollspyNav from "./scrollSpy";
import styles from '../../../assets/css/bootstrap.min.css';

class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMenu: false,
      navClass : ""
    };
  }

  toggle = () => {
    this.setState({ isOpenMenu: !this.state.isOpenMenu });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.scrollNavigation, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollNavigation, true);
  }

  scrollNavigation = () => {
    var scrollup = document.documentElement.scrollTop;
    console.log("scrollup",scrollup)
    if (scrollup > 50) {
      this.setState({ navClass : "is-sticky"});
    } else {
      this.setState({ navClass : ""});
    }
  }

  render() {
    //Store all Navigationbar Id into TargetID variable(Used for Scrollspy)
    let targetId = this.props.navItems.map((item) => {
      return item.idnm;
    });
    return (
      <React.Fragment>
          <div id="navbar" className={this.state.navClass}>
            <nav
              className={`styles.navbar  navbar-expand-lg fixed-top`}
 >
              <Container>
                <NavbarBrand className="logo text-uppercase" href="/">
                  Dorsin
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle}>
                  <i className="mdi mdi-menu"></i>
                </NavbarToggler>

                <Collapse
                  id="navbarCollapse"
                  isOpen={this.state.isOpenMenu}
                  navbar
                >
                  <ScrollspyNav
                    scrollTargetIds={targetId}
                    scrollDuration="800"
                    headerBackground="true"
                    activeNavClass="active"
                    className="navbar-collapse"
                  >
                    <Nav navbar className="navbar-center" id="mySidenav">
                      {this.props.navItems.map((item, key) => (
                        <NavItem
                          key={key}
                          className={item.navheading === "Home" ? "active" : ""}
                        >
                          <NavLink href={"#" + item.idnm}>
                            {" "}
                            {item.navheading}
                          </NavLink>
                        </NavItem>
                      ))}
                    </Nav>
                    <div className="nav-button ms-auto">
                      <Nav navbar className="navbar-end">
                        <li>
                          <Button
                            color="none"
                            type="button"
                            className="btn btn-primary navbar-btn btn-rounded waves-effect waves-light"
                          >
                            Try it Free
                          </Button>
                        </li>
                      </Nav>
                    </div>
                  </ScrollspyNav>
                </Collapse>
              </Container>
            </nav>
            </div>
      </React.Fragment>
    );
  }
}

export default NavbarPage;
