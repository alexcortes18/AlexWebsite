import { useState } from "react"
import AlexHigh from ".././assets/AlexHigh.png"
import Ingea from ".././assets/Ingea.png"
import meters from ".././assets/meters.png"
import speedVariators from ".././assets/speedVariators.png"

import classes from "./AboutMe.module.css"

export default function AboutMe() {
    const pictures = [AlexHigh, Ingea, meters, speedVariators]
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
                    <h2>Honduras</h2>
                    <p>
                        In Honduras, I worked as a Project Engineer for an automation engineering company.
                        This is a family business called INGEA. INGEA focuses on providing engineering services to other
                        companies, mainly in 2 aspects.First, an important focus was automating industrial processes through
                        PLC (Programmable Logic Controllers), and helping diagnosing issues or providing other solutions.
                        <br></br>
                        <br></br>
                        Second, and equally important, was the electrical metering and other electrical services and
                        installations. This helps industries realize their electrical consumption and areas of improvement.
                    </p>
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