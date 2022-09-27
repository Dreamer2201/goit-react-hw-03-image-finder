import { Component } from 'react';
import '../Search/Search.css';
import ImageList from '../ImageList/ImageList';
import fetchRequest from 'Fetch/FetchApi';
import { Dna } from  'react-loader-spinner'
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
    async fetchImages(currentName, currentPage) {
        this.setState({
            loading: true,
        })
        try {
            const result = await fetchRequest(currentName, currentPage);
            const items = result.hits;
            if (currentPage === 1) {
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
                error,
            })
        } finally {
            this.setState({
                loading: false,
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.page > prevState.page) {
            this.fetchImages(this.props.searchName, this.state.page);
            return;
        }
        if ((prevProps.searchName !== this.props.searchName) && this.state.page === prevState.page) {
            this.fetchImages(this.props.searchName, 1);
            this.setState({
                page: 1,
            })
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
    }
    render() {
        const isImages = Boolean(this.state.images.length);
        return (
            <div>
                {!isImages && <div>Any images not found</div>}
                {this.state.loading && <Dna
                                        visible={true}
                                        height="80"
                                        width="80"
                                        ariaLabel="dna-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="dna-wrapper"
                                        />}
                {!this.props.searchName && <p>Please enter your request</p>}
                {this.state.images && <ImageList items={this.state.images} onClick={this.openModal} />}
                {isImages && <button type="button" className="button" onClick={this.loadMore}>Load more...</button>}
                {this.state.showModal && <Modal onClose={this.closeModal} content={this.state.contentModal} />}
            </div>
        )
    }

}
