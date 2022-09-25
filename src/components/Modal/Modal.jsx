import './Modal.css';
import { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root");

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.closeModal)
  }

  closeModal = (event) => {
    if (event.code === "Escape" || event.target === event.currentTarget) {
      this.props.onClose();
    }
  }

    render() {
   
      return createPortal(
      <div className="overlay" onClick={this.closeModal}>
                <div className="modal">
                    {this.props.children}
                </div>
            </div>,
      modalRoot
    )
  }
}