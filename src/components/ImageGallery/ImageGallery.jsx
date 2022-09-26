import { Component } from 'react';
import './ImageGallery.css';
// import { instance } from '../Modal/Modal';
// import * as basicLightbox from 'basiclightbox';

import ImageList from '../ImageList/ImageList';
import fetchRequest from 'Fetch/FetchApi';
import Modal from '../Modal/Modal';
 
// console.log(instance);
// const instance = basicLightbox.create(`
//     <img src="https://pixabay.com/get/g6ec1f025ff86713adf06cdac1b6b10950a9cbebc8fd5ef57cf0120c04f624032fb6cef311f62944607d0d85e3292c4ea086ffa6600e078d4d08176212435851b_1280.jpg" width="200" height=200">
// `)

export default class ImageGallery extends Component {
    state = {
        images: [],
        loading: false,
        error: '',
        page: 1,
        showModal: false,
        contentModal: {
            urlLarge: '',
            title: '',
        }
    }

    async fetchImages() {
            this.setState({
                loading: true,
            })
            try {
                const result = await fetchRequest(this.props.searchName, this.state.page);
                const items = result.hits;
                this.setState(({ images }) => {
                    return {
                        images: [...images, ...items]
                    }
                })
            } catch (error) {
                this.setState({
                    error
                })
            } finally {
                this.setState({
                    loading: false,
                })
            }
}
        
    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.searchName);
        if ((this.props.searchName && prevProps.searchName !== this.props.searchName) || this.state.page > prevState.page) {
            this.fetchImages(this.props.searchName, this.state.page);
        }

    }  

    openModal = (contentModal) => {
        this.setState({
            showModal: true,
            contentModal,
        });
        // instance.show();
        console.log(contentModal);
  
    }

    closeModal = () => {
        this.setState({
            showModal: false,
            contentModal: {
                urlLarge: '',
                title: '',
            }
        });
        // instance.close();
    }

    loadMore = () => {
        this.setState(({ page }) => {
            return {
                page: page + 1
            }
        });
        console.log(this.state.page);
    }
    
    render() {
        const isImages = Boolean(this.state.images.length);
        return (
            <div>
                {this.state.images === [] && <div>Any images not found</div>}
                {this.state.loading && <div>Loading...</div>}
                {!this.props.searchName && <p>Please enter your request</p>}
                {this.state.images && <ImageList items={ this.state.images } onClick={this.openModal}></ImageList>}
                {isImages && <button type="button" onClick={this.loadMore}>Load more...</button>}
               
                {this.state.showModal && <Modal onClose={this.closeModal} content={this.state.contentModal} />}
        </div>
    ) 
    }
    
}
