import React from 'react';
import PropTypes from 'prop-types';
import { getImages } from '../api/flickr/actions';
import Image from '../Image';
import './Gallery.scss';
import ImageLightbox from '../Image-Lightbox/ImageLightbox';

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.pageNumber = 1;
    this.state = {
      images: [],
      lightbox: {
        isActive: false,
        startIndex: 0
      }
    };
  }


  getImages(query) {
    getImages(query)
      .then(res => res.data)
      .then(res => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
          const images = query.page === 1 ? res.photos.photo : [...this.state.images, ...res.photos.photo];
          this.setState({ images: images, isLoading: false });
        }
      })
  }

  infiniteScroll = () => {
    if ((Math.ceil(document.documentElement.scrollTop) + document.documentElement.clientHeight) === document.documentElement.scrollHeight) {
      this.pageNumber++;
       this.getImages({ tags: this.props.tag, page: this.pageNumber })
    }
  }


  componentDidMount() {
    window.addEventListener('scroll', this.infiniteScroll)
    this.getImages({ tags: this.props.tag, page: 1 });
  }

  componentWillReceiveProps(props) {
    this.pageNumber = 1;
    this.getImages({ tags: props.tag, page: 1 });
  }

  deleteImage = (id) => {
    const images = this.state.images;
    const index = images.findIndex(image => image.id === id);
    images.splice(index, 1);
    this.setState({ images: images });
  }
  expandImage = (id) => {
    const index = this.state.images.findIndex(image => image.id === id);
    this.setState({
      lightbox: {
        isActive: true,
        startIndex: index
      }
    })
  }

  closeLightBox = () => {
    this.setState({
      lightbox: {
        isActive: false,
        startIndex: 0
      }
    })
  }

  rearange=(ids)=>{
    const images = this.state.images;
    let indexes = [];
    ids.map((id)=>{
      const index = images.findIndex(image=>image.id===id);
      indexes.push(index)
    });
    const temp = images[indexes[0]];
    images[indexes[0]]=images[indexes[1]];
    images[indexes[1]]=temp;
    this.setState({images:images});
  }

  render() {
    return (
        <div className="gallery-root">
          {this.state.images.map(dto => {
            return <Image rearange={this.rearange} expandImage={this.expandImage} deleteImage={this.deleteImage} key={'image-' + dto.id} dto={dto} />;
          })}
          {this.state.lightbox.isActive && <ImageLightbox closeLightBox={this.closeLightBox} startIndex={this.state.lightbox.startIndex} images={this.state.images} />}
        </div>
        
    );
  }
}

export default Gallery;
