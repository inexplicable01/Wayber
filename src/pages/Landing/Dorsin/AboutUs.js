import React, {Component} from "react";
import {
    Container,
    Row,
    Col,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from "reactstrap";

import {Link} from "react-router-dom";
import image1 from  "./../../../assets/images/giftbox.png";
import image2 from  "./../../../assets/images/estate flow-04.jpg";
import image3 from  "./../../../assets/images/estate flow-01.jpg";


const items = [
    {
        src: image2,
        altText: "Slide 1",
        caption: "Caption for Slide 1"
    },
    {
        src: image2,
        altText: "Slide 2",
        caption: "Caption for Slide 2"
    },
    {
        src: image3,
        altText: "Slide 3",
        caption: "Caption for Slide 3"
    }
];

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {activeIndex: 0};
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({activeIndex: nextIndex});
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({activeIndex: nextIndex});
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({activeIndex: newIndex});
    }

    render() {
        const {activeIndex} = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img src={item.src} alt={item.altText} className="img-fluid"/>
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption}/>
                </CarouselItem>
            );
        });
        return (
            <React.Fragment>
                        <style>
          {`
            .carousel-image {
              height: 300px;
              object-fit: cover;
              width: 100%;
            }
            .carousel-control-prev-icon,
            .carousel-control-next-icon {
              background-color: black;
            }
            .carousel-caption {
              top: 100%;
              transform: translateY(-100%);
              background-color: rgba(0, 0, 0, 0.6);
            }
            .carousel-caption {
              top: auto;
              bottom: -30px;
              transform: none;
            }
          `}
        </style>
                <section className="section section-lg" id="features">
                    <div className="bg-overlay"></div>
                    <Container>
                        <Row className="vertical-content">
                            <Col lg={5}>
                                <div className="features-box text-center">
                                    <h3>
                                        Real Estate Transactions with No BS
                                    </h3>
                                    <p className="text-muted web-desc">
                                        No Hardsell. Solid, Safe, Smooth Transaction Process
                                    </p>
                                    <ul className="text-muted list-unstyled mt-4 features-item-list">
                                        <li className="">All Tools and Knowledge in one place</li>
                                        <li className="">
                                            Saving Up $30000 (3%) of any transactions
                                        </li>
                                        <li className="">
                                            Sed ut perspiciatis unde omnis iste natus error sit.
                                        </li>
                                        <li className="">Submit Your Organization.</li>
                                    </ul>
                                    <Link
                                        to="#"
                                        className="btn btn-primary mt-4 waves-effect waves-light"
                                    >
                                        Learn More <i className="mdi mdi-arrow-right"></i>
                                    </Link>
                                </div>
                            </Col>
                            <Col lg={7}>
                                <Carousel
                                    activeIndex={activeIndex}
                                    next={this.next}
                                    previous={this.previous}
                                >
                                    <CarouselIndicators items={items} activeIndex={activeIndex}
                                                        onClickHandler={this.goToIndex}/>
                                    {slides}
                                    <CarouselControl direction="prev" directionText="Previous"
                                                     onClickHandler={this.previous}/>
                                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next}/>
                                </Carousel>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

export default AboutUs;
