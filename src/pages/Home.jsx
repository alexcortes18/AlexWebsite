import AboutMe from "../components/AboutMe";
import MainContent from "../components/MainContent";

//Honduras:
import AlexHigh from ".././assets/AlexHigh.png"
import controlPanel from ".././assets/controlPanel.png"
import Ingea from ".././assets/Ingea.png"
import meters from ".././assets/meters.png"
import speedVariators from ".././assets/speedVariators.png"

//Taiwan:
import alex_suit from ".././assets/alex_suit.png"
import brain_class from ".././assets/brain_class.png"
import dorm_view from ".././assets/dorm_view.png"
import NTHU_memories from ".././assets/NTHU_memories.png"
import Oral_defense from ".././assets/Oral_defense.png"



export default function Home() {
    const hondurasPictures = [AlexHigh, Ingea, controlPanel, meters, speedVariators]
    const taiwanPictures = [alex_suit, brain_class, dorm_view, NTHU_memories, Oral_defense]

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

    const taiwanText = <p>
        Some Taiwan text about my university.
    </p>

    return <>
        <MainContent></MainContent>
        <AboutMe title={"Honduras"} text={hondurasText} pictures={hondurasPictures}></AboutMe>
        <AboutMe title={"Taiwan"} text={taiwanText} pictures={taiwanPictures}></AboutMe>
    </>
}