import { useContext, useState, useEffect } from "react";
import NavContext from "../../store/NavContext";

import MainContent from "../MainContent";
import AlexCortesCV from "../../assets/AlexCortesCV.pdf";
// import CoverLetter from "../CoverLetter";
import PDFViewer from "../PDFViewer";
import Modal from "../UI/Modal";

export default function Contents() {
    const navCtx = useContext(NavContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    let content;

    useEffect(() => {
        if (navCtx.navigator === 4) {
            setModalIsOpen(true);
        } else {
            setModalIsOpen(false);
        }
    }, [navCtx.navigator]);

    function onCloseModal(){
        setModalIsOpen(false);
        navCtx.changeNavState(0); // To change to the Main content page
    }

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
        content = (
            <>
                <Modal
                    open={modalIsOpen}
                    onClose={onCloseModal}>
                </Modal>
                <MainContent></MainContent>
            </>

        );
    }

    return content;
}