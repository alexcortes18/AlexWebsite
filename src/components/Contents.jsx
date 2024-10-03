import { useContext } from "react";
import NavContext from "../store/NavContext";


import MainContent from "./contents/MainContent";
import AlexCortesCV from "../assets/AlexCortesCV.pdf";
import CoverLetter from "./contents/CoverLetter";
import PDFViewer from "./contents/PDFViewer";

export default function Contents() {
    const navCtx = useContext(NavContext);

    let content;

    if (navCtx.navigator === 0) {
        content = (
            <MainContent></MainContent>
        );
    } else if (navCtx.navigator === 1) {
        content = (
            <div>
                <PDFViewer
                    pdfLocation={AlexCortesCV}
                    initialScale={1.5}
                    cssClass={"pdf"}>
                </PDFViewer>
            </div>
        );
    } else if (navCtx.navigator === 2) {
        content = (
            <div className="cover-letter-container">
                <CoverLetter></CoverLetter>
            </div>
        )
    } else if (navCtx.navigator === 3) {
        content = (
            <h2>Portfolio</h2>
        );
    } else if (navCtx.navigator === 4) {
        content = <h2>Contact Me :)</h2>;
    }

    return content;
}