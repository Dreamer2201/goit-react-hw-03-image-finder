
export default function ImageGaleryItem({ imageURL, imageTitle }) {
    return  <li className="gallery-item">
                <img src={imageURL} alt={imageTitle} />
            </li>
}
