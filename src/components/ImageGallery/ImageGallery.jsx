import { Component } from 'react';
import ImageList from '../ImageList/ImageList';
import fetchRequest from 'Fetch/FetchApi';
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

    async fetchImages() {
            this.setState({
                loading: true,
            })
            try {
                const result = await fetchRequest(this.props.searchName, this.state.page);
                const items = result.hits;
                if (this.state.page === 1) {
                    this.setState(() => {
                    return {
                        images: [...items]
                    }
                });
                } else {
                    this.setState(({ images }) => {
                    return {
                        images: [...images, ...items]
                    }
                });
                }
                
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
        console.log(prevProps.searchName);
        console.log(this.props.searchName);
        console.log(prevState.page);
        console.log(this.state.page);

        if(this.state.page > prevState.page ) {
           this.fetchImages(this.props.searchName, this.state.page);
            console.log(prevState.page);
            console.log(this.state.page);
            return;
        } 
        if (this.props.searchName && prevProps.searchName !== this.props.searchName) {
            this.setState({
                page: 1,
                images: [],
            });
            console.log(this.state.page);
            this.fetchImages(this.props.searchName, this.state.page);
            return;
        }

    }  
    openModal = (contentModal) => {
        this.setState({
            showModal: true,
            contentModal,
        });
    }
    closeModal = () => {
        this.setState({
            showModal: false,
            contentModal: {
                urlLarge: '',
                title: '',
            }
        });
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
                {this.state.images && <ImageList items={ this.state.images } onClick={this.openModal} />}
                {isImages && <button type="button" onClick={this.loadMore}>Load more...</button>}
                {this.state.showModal && <Modal onClose={this.closeModal} content={this.state.contentModal} />}
        </div>
    ) 
    }
    
}
