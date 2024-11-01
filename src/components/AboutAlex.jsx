import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { aboutMeActions } from "../store/aboutme-slice";


import classes from "./AboutAlex.module.css";
import Button from "./UI/Button";
import buttonClasses from "./UI/Button.module.css"
import useIntersectionObserver from "./utility/useIntersectionObserver";

export default function AboutAlex({ title, text, picturesArray }) {
    // const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const dispatch = useDispatch();

    const [pictureArrayNumber, setPictureArrayNumber] = useState(0);
    const currentPictures = picturesArray[pictureArrayNumber];

    const refs = [useRef(null), useRef(null), useRef(null)]; // Add more refs as needed
    const [isVisible, hasAnimated] = useIntersectionObserver(refs);

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

    function onHonduras() {
        dispatch(aboutMeActions.onHondurasChange());
    }
    function onNTHULife() {
        dispatch(aboutMeActions.onNTHULifeChange());
    }

    return (
        <>
                <p ref={refs[0]} className={`${isVisible[0] ? classes["fade-in"] : ''}  about-me ${hasAnimated[0] ? '' : classes.hidden}`}>About me!</p>

                <div ref={refs[1]} className={`${isVisible[1] ? classes["fade-in"] : ''}  ${classes.aboutMeContainer} ${hasAnimated[1] ? '' : classes.hidden}`}>
                    {/* TITLE */}
                    <p>{title}</p>

                    <div className={buttonClasses.buttonsContainer}>
                        <Button className={buttonClasses.sectionButton} onClick={onHonduras}>Honduras</Button>
                        <Button className={buttonClasses.sectionButton} onClick={onNTHULife}>NTHU Life</Button>
                        <Button className={buttonClasses.sectionButton} >Taiwan</Button>
                    </div>

                    {/* PICTURES */}
                    <div className={classes.imageSection}>
                        {currentPictures.map((picture, index) =>
                            <li key={index} className={classes.nobullets}>
                                <img src={picture} className={classes.imageContainer} />
                            </li>
                        )}
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
                    <div ref={refs[2]} className= {`${isVisible[2] ? classes["fade-in"] : ''}  ${classes.text} ${hasAnimated[2] ? '' : classes.hidden}`}>
                        {text}
                    </div>
                </div>
        </>
    );
}