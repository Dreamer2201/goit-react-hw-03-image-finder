import { Component } from 'react';
import './ImageGallery.css'

import ImageList from '../ImageList/ImageList';
import FetchRequest from 'Fetch/FetchApi';
import Modal from '../Modal/Modal';
    
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
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchName !== this.props.searchName || this.state.page > prevState.page) {
            const { searchName } = this.props;
            this.setState({ loading: true });

            FetchRequest(searchName, this.state.page)
                .then(data => {
                    const images = data.hits;
                    console.log(data);
                    console.log(images);
                    this.setState({ images });
                    return images;
                })
                .catch(error => this.setState({ error }))
                .finally(() =>  this.setState({ loading: false }))
        }
    }
    
    openModal = (contentModal) => {
        this.setState({
            showModal: true,
            contentModal,
        });
        console.log(contentModal);
  
    }

    closeModal = () => {
        this.setState({
            showModal: false,
            contentModal: {
                urlLarge: '',
                title: '',
            }
        })
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
                {this.state.showModal && <Modal onClose={this.closeModal} content={this.state.contentModal}>
                <img src={this.state.contentModal.urlLarge} alt={this.state.contentModal.title} />
                </Modal>}
                
        </div>
    ) 
    }
    
}
