import React, {Component} from "react";
import {Container, Row} from "reactstrap";

//Import Section Title
import SectionTitle from "./section-title";
import BlogBox from "./BlogBox";
import BlogCarousel from "./BlogCarousel";
import BlogDisplay from './BlogDisplay';

import image from '../../../assets/images/blog/img-1.jpg'
import image2 from '../../../assets/images/blog/img-2.jpg'
import image3 from '../../../assets/images/blog/img-3.jpg'
import image4 from '../../../assets/images/blog/img-1.jpg'
import image5 from '../../../assets/images/blog/img-2.jpg'
import image6 from '../../../assets/images/blog/img-3.jpg'


class Blog extends Component {


    constructor(props) {
        super(props);
        this.state = {
            chosenBlogId: null,
            blogs: [
                {
                    id:1,
                    image: image,
                    category: "UI & UX Design",
                    title: "Doing a cross country road trip",
                    desc:
                        "She packed her seven versalia, put her initial into the belt and made herself on the way..",
                },
                {id:2,
                    image: image2,
                    category: "Digital Marketing",
                    title: "New exhibition at our Museum",
                    desc:
                        "Pityful a rethoric question ran over her cheek, then she continued her way.",
                },
                {id:3,
                    image: image3,
                    category: "Travelling",
                    title: "Why are so many people..",
                    desc:
                        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
                },
                {id:4,
                    image: image4,
                    category: "UI & UX Design",
                    title: "Doing a cross country road trip",
                    desc:
                        "She packed her seven versalia, put her initial into the belt and made herself on the way..",
                },
                {id:5,
                    image: image5,
                    category: "Digital Marketing",
                    title: "New exhibition at our Museum",
                    desc:
                        "Pityful a rethoric question ran over her cheek, then she continued her way.",
                },
                {id:6,
                    image: image6,
                    category: "Travelling",
                    title: "Why are so many people..",
                    desc:
                        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
                },
            ],
        };
    }

handleReadMoreClick = (blogId) => {
    this.setState({ chosenBlogId: blogId });
}

    render() {
        return (
            <section className="section bg-light pt-5" id="blog">
                <Container>
                    {/* section title */}
                    <SectionTitle
                        title="BLOG - What makes us different."
                        desc="Wayber ushers in a new wave of real estate transactions.
            See how we remove the smokes and mirrors of real estate and give power back to the end customers - You."

                    />

                    <Row className="mt-4">
                        {/* blog box */}
                        <BlogBox blogs={this.state.blogs} onReadMore={this.handleReadMoreClick}/>
                    </Row>
{this.state.chosenBlogId && (
    <BlogDisplay blog={this.state.blogs.find(blog => blog.id === this.state.chosenBlogId)} />
)}
                </Container>
            </section>
        );
    }
}

export default Blog;
