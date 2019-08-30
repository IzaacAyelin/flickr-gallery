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

  render() {
    return (
      <div className="app-root">
        <div className="bg">
          <div className="app-header">
            <h2>Flickr Gallery</h2>
            <div className="input-group">
              <input className="app-input" onChange={event => this.setState({ tag: event.target.value })} value={this.state.tag} />
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
