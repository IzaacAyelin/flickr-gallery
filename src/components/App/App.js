import React from 'react';
import './App.scss';
import Gallery from '../Gallery';
import FontAwesome from 'react-fontawesome';

class App extends React.Component {
  static propTypes = {
  };

  constructor() {
    super();
    this.state = {
      tag: 'art'
    };
  }

  handleKeyDown=(e)=>{
    if (e.keyCode === 13) {
      this.setState({tag:e.target.value});
      
      
    }
  }

  render() {
    return (
      <div className="app-root">
        <div className="bg">
          <div className="app-header">
            <h2>Flickr Gallery</h2>
            <div className="input-group">
              <input onKeyDown={this.handleKeyDown} className="app-input" />
              <FontAwesome name="search" title="search" />
            </div>
          </div>
        </div>
        <Gallery tag={this.state.tag} />
      </div>
    );
  }
}

export default App;
