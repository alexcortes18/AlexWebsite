import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { aboutMeActions } from "../store/aboutme-slice";

import { sections } from "../store/aboutme-slice";
import classes from "./AboutAlex.module.css";

export default function AboutAlex({ title, text, picturesArray }) {
    const sectionNumber = useSelector(state => state.aboutme.activeSection);
    const dispatch = useDispatch();

    const [pictureArrayNumber, setPictureArrayNumber] = useState(0);
    const currentPictures = picturesArray[pictureArrayNumber];

    function onNextPictures() {
        if (pictureArrayNumber < picturesArray.length - 1) {
            setPictureArrayNumber((prevNumber) => prevNumber + 1);
        }
    }
    function onLastPictures() {
        if (pictureArrayNumber > 0) {
            setPictureArrayNumber((prevNumber) => prevNumber - 1);
        }
    }

    function onLastSection() {
        dispatch(aboutMeActions.lastSection());
    }

    function onNextSection() {
        dispatch(aboutMeActions.nextSection());
    }

    return (
        <>
            <div className={classes.aboutMeContainer}>
                {/* TITLE */}
                <h2>{title}</h2>

                {/* PICTURES */}
                <div className={classes.imageSection}>
                    <button
                        onClick={onLastSection}
                        disabled={sectionNumber <= 0}
                    >
                        Previous Section</button>

                    {currentPictures.map((picture, index) =>
                        <li key={index} className={classes.nobullets}>
                            <img src={picture} className={classes.imageContainer} />
                        </li>
                    )}

                    <button
                        onClick={onNextSection}
                        disabled={sectionNumber >= sections.length - 1}
                    >
                        Next Section</button>
                </div>


                <div className={classes.buttons}>
                    {/* BUTTON -> Previous */}
                    <button onClick={onLastPictures} disabled={pictureArrayNumber <= 0}>
                        Previous
                    </button>
                    {/* BUTTON -> Next */}
                    <button onClick={onNextPictures} disabled={pictureArrayNumber >= picturesArray.length - 1}>
                        Next
                    </button>
                </div>

                {/* TEXT */}
                <div className={classes.text}>
                    {text}
                </div>
            </div>
        </>
    );
}