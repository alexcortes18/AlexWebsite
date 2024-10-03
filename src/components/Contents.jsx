import MainContent from "./MainContent";
import NavContext from "../store/NavContext";
import { useContext } from "react";

export default function Contents() {
    const navCtx = useContext(NavContext);

    let content;

    if (navCtx.navigator === 0) {
        content = (
            <>
                {/* <PDFViewer
                    pdfLocation={AlexCortesCV}
                    initialScale={1.5}
                    cssClass={"pdf"}
                >
                </PDFViewer> */}
                <MainContent></MainContent>
            </>
        );
    } else if (navCtx.navigator === 1) {
        content = (
            <>
                <h2>Curriculum</h2>
            </>
        );
    } else if (navCtx.navigator === 2) {
        content = <h2>Cover Letter</h2>
    } else if (navCtx.navigator === 3) {
        content = (
            <>
                <h2>Portfolio</h2>
            </>
        );
    } else if (navCtx.navigator === 4) {
        content = <h2>Contact Me :)</h2>;
    }

    return content;
}