import { useState } from "react"
import classes from "./AboutMe.module.css"


export default function AboutMe({ title, text, pictures }) {
    const [pictureNumber, setPictureNumber] = useState(0);

    function onNextPicture() {
        if (pictureNumber < pictures.length - 1) {
            setPictureNumber((prevNumber) => prevNumber + 1);
        }
    }
    function onLastPicture() {
        if (pictureNumber > 0) {
            setPictureNumber((prevNumber) => prevNumber - 1);
        }
    }

    return (
        <>
            <div className={classes.textImageSection}>

                <div className={classes.textSection}>
                    <h2>{title}</h2>
                    {text}
                </div>

                <div className={classes.imageSection}>
                    <div className={classes.imageContainer}>
                        <img src={pictures[pictureNumber]} className={classes.responsiveImage} />
                    </div>

                    <div className={classes.buttons}>
                        <button
                            onClick={onLastPicture}
                            disabled={pictureNumber <= 0}
                        >
                            Previous
                        </button>
                        <button
                            onClick={onNextPicture}
                            disabled={pictureNumber >= pictures.length - 1}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>


        </>
    );
}