import Button from "../UI/Button";
import { useContext } from "react"
import NavContext from "../../store/NavContext";

const buttonData = [
    { id: 0, label: "Home" },
    { id: 1, label: "Curriculum Vitae" },
    { id: 2, label: "Cover Letter" },
    // { id: 3, label: "Portfolio" },
    { id: 4, label: "Contact Me" }
];

export default function Header() {
    const navCtx = useContext(NavContext);

    function changeNavigatorState(id) {
        navCtx.changeNavState(id);
        console.log(id)
    }

    return (
        <>
            <div className="header">
                <h1>{"</>Python + React"}</h1>
                <div>
                    <div className="nav-buttons">
                        {buttonData.map((button) => (
                            <Button
                                key={button.id}
                                className={"nav-button"}
                                onClick={() => changeNavigatorState(button.id)}>
                                {button.label}
                            </Button>
                        ))}
                    </div>
                    <hr className="nav-divider" />
                </div>
            </div >
        </>
    );
}