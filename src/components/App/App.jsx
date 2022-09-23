import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Search from '../Search/Search';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';


class App extends Component {
  state = {
    searchName:'',
  }
  
  handleSubmitSearchForm = searchName => {
    console.log(searchName);
  this.setState({ searchName });
}
  render() {
    return (
      <div className="App">
        <Search onSubmit={this.handleSubmitSearchForm} />
        <ImageGallery searchName={this.state.searchName} />
        <Modal />
        <ToastContainer autoClose={4000} />
      </div>
  );
  }
  
};

export default App;