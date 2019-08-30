import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      rotationValue: 0,
      hoverClass: '',
      imageUrl: ''
    };
  }

  lazyLoadImages = () => {
    let element = document.getElementById(`${this.props.dto.id}`);
    if (element) {
      const rect = element.getBoundingClientRect();
      const elemTop = rect.top;
      const isVisible = elemTop < window.innerHeight;
      if (isVisible) {
        this.setState({ imageUrl: this.urlFromDto(this.props.dto) })
      }
    }
  }
  componentDidMount() {
    this.lazyLoadImages();
    document.addEventListener('scroll', this.lazyLoadImages)
  }
  componentWillUnmount(){
    document.removeEventListener('scroll', this.lazyLoadImages)
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }
  rotateImage = () => {
    this.setState({ rotationValue: this.state.rotationValue + 90 })
  }

  dragStart = (e) => {
    e.dataTransfer.setData('imageId', this.props.dto.id);
  }

  allowDrop = (e) => {
    e.preventDefault();
  }
  drop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('imageId');
    this.props.rearange([this.props.dto.id, id])
    this.setState({ hoverClass: '' })
  }
  dragLeave = () => {
    this.setState({ hoverClass: '' })
  }
  dragEnter = () => {
    this.setState({ hoverClass: 'hover' })
  }

  render() {
    return (
      <div
        id={this.props.dto.id}
        className={`image-root ${this.state.hoverClass}`}
        draggable="true"
        onDragStart={this.dragStart}
        onDragOver={this.allowDrop}
        onDrop={this.drop}
        onDragEnter={this.dragEnter}
        onDragLeave={this.dragLeave}
        style={{
          backgroundImage: `url(${this.state.imageUrl})`,
          transform: `rotate(${this.state.rotationValue}deg)`
        }}
      >
        <div style={{ transform: `rotate(-${this.state.rotationValue}deg)` }}>
          <FontAwesome onClick={this.rotateImage} className="image-icon" name="sync-alt" title="rotate" />
          <FontAwesome onClick={() => this.props.deleteImage(this.props.dto.id)} className="image-icon" name="trash-alt" title="delete" />
          <FontAwesome onClick={() => this.props.expandImage(this.props.dto.id)} className="image-icon" name="expand" title="expand" />
        </div>
      </div>
    );
  }
}

export default Image;
