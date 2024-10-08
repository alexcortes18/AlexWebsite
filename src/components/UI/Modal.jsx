import { useRef, useEffect } from "react";

export default function Modal({ open, onClose }) {
    const dialog = useRef();

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);


    return (
        <dialog ref={dialog} onClose={onClose} className="modal">
            <h2>Contact me at:</h2>
            <div className="modal-content">
                <p>
                    <strong><label>Email:</label></strong>
                    <br></br>
                    <text>alex.cortes.i10@gmail.com</text>
                </p>
                <p>
                    <strong><label>Phone Number:</label></strong>
                    <br></br>
                    <text>+886 0958309287</text>
                </p>
                <p>
                    <strong><label>Line ID:</label></strong>
                    <br></br>
                    <text>alexjcortes</text>
                </p>
                <p>
                    <strong><label>LinkedIn:</label></strong>
                    <br></br>
                    <a href="https://www.linkedin.com/in/alejandro-izaguirre-225b42157/">Alex's Linkedin</a>
                </p>
            </div>
            <div className="modal-controls">
                <button onClick={onClose}>Close</button>
            </div>
        </dialog>
    );
}