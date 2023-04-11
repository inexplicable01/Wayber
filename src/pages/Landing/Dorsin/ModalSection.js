import React, { Component } from 'react';

//Importing Modal
import ModalVideo from 'react-modal-video';
// import '../../../../node_'
import '../../../../node_modules/react-modal-video/scss/modal-video.scss';

class ModalSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <React.Fragment>
                <ModalVideo channel={this.props.channel} isOpen={this.props.isOpen} videoId={this.props.videoId} onClose={this.props.closeModal} />
            </React.Fragment>
        );
    }
}

export default ModalSection;