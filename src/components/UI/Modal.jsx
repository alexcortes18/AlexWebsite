import { useRef, useEffect } from "react";
import classes from "./Modal.module.css";

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
        <dialog ref={dialog} onClose={onClose} className={classes.modal}>
            <h2>Contact me at:</h2>
            <div className={classes.modalContent}>
                <p>
                    <strong><label>Email:</label></strong>
                    <br></br>
                    <span>alex.cortes.i10@gmail.com</span>
                </p>
                <p>
                    <strong><label>Phone Number:</label></strong>
                    <br></br>
                    <span>+886 0958309287</span>
                </p>
                <p>
                    <strong><label>Line ID:</label></strong>
                    <br></br>
                    <span>alexjcortes</span>
                </p>
                <p>
                    <strong><label>LinkedIn:</label></strong>
                    <br></br>
                    <a href="https://www.linkedin.com/in/alejandro-izaguirre-225b42157/">Alex's Linkedin</a>
                </p>
            </div>
            <div className={classes.modalControls}>
                <button onClick={onClose}>Close</button>
            </div>
        </dialog>
    );
}