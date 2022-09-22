import { Component } from 'react';
import ImageGaleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
    state = {
        images: null,
        loading: false,
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchName !== this.props.searchName) {
            const { searchName } = this.props;
            fetch(`https://pixabay.com/api/?q=${searchName}&page=1&key=29146874-e25e04f0bbd5e8c4fffc4a4f6&image_type=photo&orientation=horizontal&per_page=12`)
            .then(res => res.json())
            .then(data => {
                const images = data.hits;
                console.log(data);
                console.log(images);
                this.setState({ images });
                return images;
            })
            .catch(error => this.setState({error}))
    }
}

    render() {
        return (
            <div>
                <p>{this.props.searchName}</p>
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
