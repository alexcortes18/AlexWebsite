import { coverLetter } from "../data/coverletter"

export default function CoverLetter(){
    return (
        <>
            <div className="cover-letter">
                <p><strong>Dear HR Managers,</strong></p>
                <p>{coverLetter}</p>
                <p><strong>Alejandro Cortés</strong></p>
            </div>
        </>
    )
}