import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import {Link} from "react-router-dom";
class BlogCarousel extends Component {
    state = {
        activeIndex: 0,
        animating: false
    };

onExiting = () => {
    this.animating = true;
}

onExited = () => {
    this.animating = false;
}

next = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.blogs.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
}

previous = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.blogs.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
}

goToIndex = (newIndex) => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
}


    render() {
        const { activeIndex } = this.state;
        const { blogs, onReadMore } = this.props;

        const slides = blogs.map((blog, idx) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={idx}
                >
                    <img src={blog.image} alt={blog.title} />
                    <CarouselCaption captionText={blog.desc} captionHeader={blog.title} />
                    <div className="mt-3">
                        <Link
                            to="#"
                            className="read-btn"
                            onClick={() => onReadMore(blog.desc)}
                        >
                            Read More
                        </Link>
                    </div>
                </CarouselItem>
            );
        });

        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={blogs} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        );
    }
}

export default BlogCarousel;
