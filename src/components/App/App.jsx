import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Search from '../Search/Search';

import ImageGallery from '../ImageGallery/ImageGallery';



class App extends Component {
  state = {
    searchName: '',
    images: [],
    loading: false,
    page: 1,
    error: null,
    showModal: false,

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
        
        <ToastContainer autoClose={4000} />
      </div>
  );
  }
  
};

export default App;