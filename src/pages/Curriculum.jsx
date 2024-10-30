import PDFViewer from "../components/PDFViewer";
import AlexCortesCV from "../assets/AlexCortesCV.pdf";

export default function CoverLetter() {
    return (
        <>
            <PDFViewer
                pdfLocation={AlexCortesCV}
                initialScale={1.5}
                cssClass={"pdf"}>
            </PDFViewer>
        </>
    );
}