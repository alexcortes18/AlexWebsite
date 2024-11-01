import { useState } from "react";
import { useSelector } from "react-redux";
import MainContent from "../components/MainContent";

//Honduras:
import Ingea from ".././assets/Ingea.png"
import green_jacket from ".././assets/green_jacket.png"
import AlexHigh from ".././assets/AlexHigh.png"
import controlPanel from ".././assets/controlPanel.png"
import choluteca_panel from ".././assets/choluteca_panel.png"
import gildan_panel from ".././assets/gildan_panel.png"
import meters from ".././assets/meters.png"
import speedVariators from ".././assets/speedVariators.png"
import recloser from ".././assets/recloser.png";
import green_meters from ".././assets/green_meters.png";


//Taiwan:
import alex_suit from ".././assets/alex_suit.png"
import brain_class from ".././assets/brain_class.png"
import dorm_view from ".././assets/dorm_view.png"
import NTHU_memories from ".././assets/NTHU_memories.png"
import Oral_defense from ".././assets/Oral_defense.png"
import AboutAlex from "../components/AboutAlex";



export default function Home() {
    const activeSection = useSelector(state => state.aboutme.section);
    console.log(activeSection);

    const hondurasPicturesArray = [[AlexHigh, controlPanel, choluteca_panel], [meters,recloser,green_meters],
    [green_jacket, speedVariators],
    ]
    const NTHUpicturesArray = [[alex_suit, brain_class, dorm_view], [NTHU_memories, Oral_defense]]

    const hondurasText = <p>
        In Honduras, I worked as a Project Engineer for an automation engineering company.
        This is a family business called INGEA. INGEA focuses on providing engineering services to other
        companies, mainly in 2 aspects.First, an important focus was automating industrial processes through
        PLC (Programmable Logic Controllers), and helping diagnosing issues or providing other solutions.
        <br></br>
        <br></br>
        Secondly, and equally important, was the electrical metering and other electrical services and
        installations. This helps industries realize their electrical consumption and areas of improvement.
    </p>

    const taiwanNTHUText = <p>
        Taiwan has become a second home to me. And this journey started with me entering 清華大學 in September
        2021. During this time I learned countless things, both academically and personal. I laughed, cried, got
        stressed, demotivated, motivated, and so much more. It has helped me shaped me into a better version of myself.
        <br></br><br></br>
        In school, I learned about data management and big data with classes like Advanced Database Systems, and
        Data Mining. I learned about NLP and its practices with NLP class. Seminars taught me a lot about new and
        exciting machine learning uses in industry. I'm glad I learned all these new concepts, and I'm excited to be
        able to use them in the near future in real life applications.
        <br></br><br></br>
        Master's life was the first time being so away from my family back home. Taiwan received me with arms opened
        and all the friends I have made here have made this journey much more pleasant.
    </p>

    return <>
        <MainContent></MainContent>
        {/* <AboutMe title={"Honduras"} text={hondurasText} pictures={hondurasPictures}></AboutMe> */}
        {/* <AboutMe title={"Taiwan"} text={taiwanNTHUText} pictures={taiwanPictures}></AboutMe> */}

        {activeSection === "Honduras" && (
            <AboutAlex title={"Honduras Engineering Work"} text={hondurasText} picturesArray={hondurasPicturesArray} />
        )
        }
        {activeSection === "NTHU" && (
            <AboutAlex title={"NTHU Life"} text={taiwanNTHUText} picturesArray={NTHUpicturesArray} />
        )
        }
    </>
}