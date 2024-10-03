import { Document, Page, pdfjs } from "react-pdf";
import { useState } from 'react';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export default function PDFViewer({ pdfLocation, initialScale, cssClass }) {
    const [numPages, setNumPages] = useState(null);
    // const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(initialScale);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    return (
        <div className={cssClass}>
            <Document file={pdfLocation} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={1} scale={scale} />
            </Document>
            <div className="secondPage">
                <Document file={pdfLocation} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={2} scale={scale} />
                </Document>
            </div>
        </div>
    );
}
