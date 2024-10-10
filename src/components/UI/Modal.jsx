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
            <button onClick={onClose}>Close</button>
        </dialog>
    );
}