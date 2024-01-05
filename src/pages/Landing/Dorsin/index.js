import React, { Component } from 'react';

import NavbarPageWithRouter from "./Navbar_Page";
import Section from './section';
import Service from "./service";
import AboutUs from "./AboutUs";
import WebsiteDesc from "./WebsiteDesc";
import Pricing from "./pricing";
import Team from './Team';
import Process from "./Process";
import Testimonials from "./Testimonials"
import GetStart from "./GetStart"
import Blog from "./Blog"
import Contact from "./Contact";
import Social from "./Social";
import Footer from "./footer";
import '../../../../src/assets/css/style.css';
import '../../../../src/assets/css/pe-icon-7-stroke.css';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navItems : [
                { id: 1 , idnm : "home", navheading: "Home" },
                { id: 2 , idnm : "services", navheading: "Services" },
                // { id: 3 , idnm : "features", navheading: "Features" },
                { id: 4 , idnm : "pricing", navheading: "Pricing" },
                { id: 5 , idnm : "team", navheading: "Team" },
                { id: 6 , idnm : "blog", navheading: "Blog" },
                { id: 7 , idnm : "contact", navheading: "Contact" }

            ],
            navClass : ""
        };
    }

    render() {
        return (
            <React.Fragment>

                {/* Importing Navbar */}
                <NavbarPageWithRouter navItems={this.state.navItems} navClass={this.state.navClass} />

                {/* section */}
                <Section/>
7
                {/* services */}
                <Service  sectionClass="pt-5"/>

                {/*/!* about us *!/*/}
                {/*<AboutUs/>*/}


                {/* website description */}
                {/*<WebsiteDesc/>*/}

                {/* pricing */}
                <Pricing sectionClass="pt-5"/>



                {/* process*/}
                {/*<Process/>*/}

                 {/*testimonial*/}
                {/*<Testimonials/>*/}

                {/* get started */}
                {/*<GetStart/>*/}

                {/* blog */}
                <Blog/>

                {/*/!* contact *!/*/}
                 <Team/>
                <Contact/>

                {/* social */}
                {/*<Social />*/}

                {/*/!* footer *!/*/}
                {/*<Footer/>*/}
            </React.Fragment>
        );
    }
}

export default Index;