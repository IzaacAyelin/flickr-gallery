import React from 'react';
import FontAwesome from 'react-fontawesome';
import './ImageLightbox.scss'

class ImageLightBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentIndex: this.props.startIndex
        }
    }

    urlFromDto(dto) {
        return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
    }
  
    next =()=>{
        if (this.props.images[this.state.currentIndex+1]) {
           this.setState({currentIndex:this.state.currentIndex+1})
        }
    }
    prev = () =>{
        if (this.props.images[this.state.currentIndex-1]) {
            this.setState({currentIndex:this.state.currentIndex-1})
        }
    }

    render() {
        
        return (
            <div className="lightbox-container">
                <img src={this.urlFromDto(this.props.images[this.state.currentIndex])} />
                <div className="navigation-container">
                    <FontAwesome onClick={this.prev} className="next" name="chevron-circle-left" title="chevron-circle-left" />
                    <FontAwesome onClick={this.next} className="prev" name="chevron-circle-right" title="chevron-circle-right" />
                </div>
                <FontAwesome onClick={this.props.closeLightBox} className="close" name="times-circle" title="times-circle" />
            </div>
        );
    }
}

export default ImageLightBox;

