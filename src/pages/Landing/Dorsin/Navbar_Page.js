import React, {Component} from "react";
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
import {useNavigate , Link} from "react-router-dom";

import ScrollspyNav from "./scrollSpy";

// import styles from '../../../assets/css/bootstrap.min.css';

function NavbarPageWithRouter(props) {
  const navigate = useNavigate();

  return <NavbarPage {...props} navigate={navigate} />;
}
class NavbarPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenMenu: false,
            navClass: ""
        };
    }

    toggle = () => {
        this.setState({isOpenMenu: !this.state.isOpenMenu});
    };

    componentDidMount() {
        window.addEventListener("scroll", this.scrollNavigation, true);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollNavigation, true);
    }

    scrollNavigation = () => {
        var scrollup = document.documentElement.scrollTop;
        console.log("scrollup", scrollup)
        if (scrollup > 50) {
            this.setState({navClass: "is-sticky"});
        } else {
            this.setState({navClass: ""});
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
                        className="navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-dark"
                    >
                        <Container>
                            <NavbarBrand className="logo text-uppercase" href="/">
                                Wayber
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
                                    <button onClick={this.props.toggleInspectorMode}>Toggle Inspector Mode</button>
                                    <div className="nav-button ms-auto">
                                        <Nav navbar className="navbar-end">
                                            <li>
                                                <Button
                                                    color="none"
                                                    type="button"
                                                    className="btn btn-link fw-medium text-decoration-none text-dark"
                                                    onClick={() => this.props.navigate('/register')}
                                                >
                                                    Register
                                                </Button>


                                            </li>
                                            <Button
                                                color="none"
                                                type="button"
                                                className="btn btn-primary navbar-btn btn-rounded waves-effect waves-light"
                                                onClick={() => this.props.navigate('/login')}
                                            >
                                                Login
                                            </Button>

                                            {/*<Link to="/login"*/}
                                            {/*      className="btn btn-link fw-medium text-decoration-none text-dark">Sign*/}
                                            {/*    Up</Link>*/}
                                            {/*/!*<Link to="/register" >Log in</Link>*!/*/}

                                            {/*<Link to="/register" className="btn btn-primary">Log in</Link>*/}

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

export default NavbarPageWithRouter;
