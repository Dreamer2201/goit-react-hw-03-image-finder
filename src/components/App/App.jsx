import { Component } from 'react';

import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';

class App extends Component {
  state = {
    image: null
  }
  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101'
        }}
      >
        <ImageGallery/>
        <Modal/>
      </div>
  );
  }
  
};

export default App;