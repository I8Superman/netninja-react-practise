import './Modal.css'
import { createPortal } from 'react-dom';

export default function Modal({ children, handleClose }) {

    console.log('Modal rendered')
    return createPortal((
        <div className="modal-backdrop">
            <div className="modal">
                {children}
                <button onClick={handleClose}>Close this thing</button>
            </div>
        </div>),
        document.body)
}