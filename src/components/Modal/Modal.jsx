import './Modal.css';
import { Component } from "react";
import { createPortal } from "react-dom";
// import * as basicLightbox from 'basiclightbox';

const modalRoot = document.getElementById("modal-root");


// export const instance = basicLightbox.create(`
//     <img src="https://pixabay.com/get/g6ec1f025ff86713adf06cdac1b6b10950a9cbebc8fd5ef57cf0120c04f624032fb6cef311f62944607d0d85e3292c4ea086ffa6600e078d4d08176212435851b_1280.jpg" width="200" height=200">
// `)

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = (event) => {
    if (event.code === "Escape" || event.target === event.currentTarget) {
      this.props.onClose();
    }
  }

    render() {
      const { imageUrlLarge, imageTitle } = this.props.content;
      console.log(imageTitle);
      return createPortal(
      <div className="overlay" onClick={this.closeModal}>
                <div className="modal">
            <img src={imageUrlLarge} alt={imageTitle} width='400' height='400' />
                </div>
            </div>,
      modalRoot
    )
  }
}
