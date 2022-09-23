import { Component } from 'react';
import './ImageGallery.css'
import ImageGaleryItem from '../ImageGalleryItem/ImageGalleryItem';
import api from 'Fetch/FetchApi';
    
export default class ImageGallery extends Component {
    state = {
        images: null,
        loading: false,
        error: "", 
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchName !== this.props.searchName) {
            const { searchName } = this.props;
            this.setState({ loading: true });

            api.FetchRequest(searchName)
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

    render() {
        return (
            <div>
                {this.state.images === [] && <div>Any images not found</div>}
                {this.state.loading && <div>Loading...</div>}
                {!this.props.searchName && <p>Please enter your request</p>}
                {this.state.images && <ul className="gallery">
            {this.state.images.map(item => (
                <ImageGaleryItem key={item.id}
                    imageURL={item.webformatURL}
                    imageTitle={item.tags} />
            ))}
        </ul> }
        </div>
    ) 
    }
    
}
