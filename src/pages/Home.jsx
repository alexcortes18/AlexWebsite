import { useState } from "react";
import { useSelector } from "react-redux";
import MainContent from "../components/MainContent";
import AboutAlex from "../components/AboutAlex";

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


//Taiwan NTHU:
import alex_suit from ".././assets/alex_suit.png"
import brain_class from ".././assets/brain_class.png"
import dorm_view from ".././assets/dorm_view.png"
import NTHU_memories from ".././assets/NTHU_memories.png"
import Oral_defense from ".././assets/Oral_defense.png"
import diploma from ".././assets/diploma.png";
import lab from ".././assets/lab.png";
import nthu_picnic from ".././assets/nthu_picnic.png";
import alex_tainan from ".././assets/alex_tainan.png";
import nthu_library from ".././assets/nthu_library.png";

//Exploring Taiwan:
import taipei1 from ".././assets/taipei1.png";
import taipei2 from ".././assets/taipei2.png";
import taipei3 from ".././assets/taipei3.png";
import heping from ".././assets/heping.png";
import jiufen from ".././assets/jiufen.png";
import kaohsiung from ".././assets/kaohsiung.png";
import kenting from ".././assets/kenting.png";
import taichung from ".././assets/taichung.png";
import taroko from ".././assets/taroko.png";
import xiaoliuqiu from ".././assets/xiaoliuqiu.png";
import yehliu from ".././assets/yehliu.png";

export default function Home() {
    const activeSection = useSelector(state => state.aboutme.section);
    console.log(activeSection);

    const hondurasPicturesArray = [[AlexHigh, controlPanel, choluteca_panel], [meters, recloser, green_meters],
    [green_jacket, speedVariators]]
    const NTHUpicturesArray = [[alex_suit, brain_class, dorm_view], [NTHU_memories, Oral_defense, diploma],
    [lab, nthu_picnic, alex_tainan]]
    const taiwanExploring = [[taipei1, taipei2, taipei3], [heping, jiufen, kaohsiung], [kenting, taichung, taroko],
    [xiaoliuqiu, yehliu]]

    const hondurasText = <p>
        In Honduras, I worked as a Project Engineer for INGEA, a family-owned automation engineering company.
        INGEA focuses on providing engineering services to other companies in two main areas.
        <br></br><br></br>
        First, we concentrated on automating industrial processes through Programmable Logic Controllers (PLCs), offering
        diagnostics and other customized solutions.
        <br></br><br></br>
        Secondly, and equally important, was the electrical metering and other electrical services and
        installations. This helps industries realize their electrical consumption and areas of improvement.
    </p>

    const taiwanNTHUText = <p>
        Taiwan has become a second home to me, a journey that began when I entered 清華大學 (National Tsing Hua University)
        in September 2021. During this time, I learned countless things, both academically and personally. I laughed, cried,
        felt stressed, demotivated, motivated, and so much more. This experience has shaped me into a better version of myself.
        <br></br><br></br>
        At school, I gained knowledge in data management and big data through courses like Advanced Database Systems and Data
        Mining. I also learned about NLP and its applications through my NLP course. Seminars introduced me to exciting new
        uses of machine learning in industry. I’m grateful to have learned these concepts and am excited to apply them soon
        in real-world applications.
        <br></br><br></br>
        My time in the Master’s program was my first experience living far from my family back home. Taiwan welcomed me with
        open arms, and the friends I’ve made here have made this journey truly enjoyable.
    </p>

    const exploringTaiwan = <p>
        Exploring this island has been one of the best experiences of my life. I’ve visited many places across Taiwan, 
        including Taipei, Hualien, Keelung, Jiufen, Taichung, Tainan, Kenting (Pingtung), Kaohsiung, and more. Some of 
        these places are captured in the photos above. Most of my travels have been with friends, though I’ve also ventured
        out solo. Both have offered amazing experiences.
        <br></br><br></br>
        Yet, there are still so many beautiful places I haven’t explored in this wonderful slice of paradise. I’m looking 
        forward to hiking in new areas and visiting Alishan, as well as the breathtaking Green Island and Orchid Island,
        among many others.
        <br></br><br></br>
        The beauty of Taiwan, its warm-hearted people, countless activities, and unique—often incredible—food keep 
        captivating me, and I hope to continue exploring for years to come.

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
        {activeSection === "ExploringTaiwan" && (
            <AboutAlex title={"Exploring Taiwan"} text={exploringTaiwan} picturesArray={taiwanExploring} />
        )
        }
    </>
}