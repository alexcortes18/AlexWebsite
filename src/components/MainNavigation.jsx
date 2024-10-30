import { NavLink } from "react-router-dom";
import { useState } from "react";
import classes from "./MainNavigation.module.css";
import Modal from "./UI/Modal";

export default function MainNavigation() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModal() {
        setModalIsOpen(true);
    }
    function onCloseModal(){
        setModalIsOpen(false);
    }

    return (
        <>
            <div className={classes.header}>
                <h1>{"</>Python + React"}</h1>

                <header className={classes.navigation}>
                    <nav>
                        <ul className={classes.list}>
                            <li>
                                <NavLink
                                    to={"/"}
                                    className={({ isActive }) => isActive ? classes.isActive : undefined}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/curriculum"}
                                    className={({ isActive }) => isActive ? classes.isActive: undefined}>
                                    CV
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/coverletter"}
                                    className={({ isActive }) => isActive ? classes.isActive : undefined}>
                                    Cover Letter
                                </NavLink>
                            </li>
                            <li>
                                <button onClick={openModal} className={classes.contactButton}>
                                    Contact Me
                                </button>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            {/* Render the modal always: */}
            {modalIsOpen && <Modal open={modalIsOpen} onClose={onCloseModal} />}
        </>
    );
}