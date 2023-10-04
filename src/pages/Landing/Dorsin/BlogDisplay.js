import React from 'react';
// import { generateLoremIpsum } from './loremUtils';  //
import './BlogDisplay.css';
const generateLoremIpsum = (numParagraphs) => {
    const baseLorem = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Vivamus lacinia odio vitae vestibulum.",
        "Donec in efficitur leo. Proin et urna ante.",
        "Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.",
        "Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est.",
        "Sed lectus. Praesent elementum hendrerit tortor.",
        "Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl.",
        "Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.",
        "Morbi interdum mollis sapien.",
        "Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet."
    ];

    let result = "";

    for (let i = 0; i < numParagraphs; i++) {
        result += `<p>${baseLorem[Math.floor(Math.random() * baseLorem.length)]}</p>`;
    }

    return result;
}
const BlogDisplay = ({ blog }) => {

    const loremContent = generateLoremIpsum(4);
    return (
        <div className="blog-display-container">
            <img src={blog.image} alt={blog.title} className="blog-display-image" />
            <h2 className="blog-display-title">{blog.title}</h2>
            <h4 className="blog-display-category">{blog.category}</h4>
            <p className="blog-display-desc">{blog.desc}</p>
            <div className="blog-display-content" dangerouslySetInnerHTML={{ __html: loremContent }} />
        </div>
    );
}

export default BlogDisplay;