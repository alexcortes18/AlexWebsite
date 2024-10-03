export default function Header() {
    return (
        <>
            <div className="header">
                <h1>{"</>Python + React"}</h1>
                <div>
                    <ul className="nav-links">
                        <a href="/">Home</a>
                        <a href="/">CV</a>
                        <a href="/">Portfolio</a>
                        {/* <div>
                            <div className="small-lines"></div>
                            <div className="small-lines"></div>
                            <div className="small-lines"></div>
                        </div> */}
                    </ul>

                    <hr className="nav-divider" />
                </div>

            </div >
        </>
    );
}