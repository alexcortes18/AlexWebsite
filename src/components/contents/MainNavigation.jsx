import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
    return (
        <>
            <div className={classes.header}>
                <h1>{"</>Python + React"}</h1>

                <header className={classes.navigation}>
                    <nav>
                        <ul className={classes.list}>
                            <li>
                                <NavLink
                                    to={"/"}
                                    className={({ isActive }) => isActive ? classes.isActive : undefined}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/"}
                                    className={({ isActive }) => isActive ? classes.isActive: undefined}>
                                    CV
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/coverletter"}
                                    className={({ isActive }) => isActive ? classes.isActive : undefined}>
                                    Cover Letter
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/"}
                                    className={({ isActive }) => isActive ? classes.isActive: undefined}>
                                    Contact Me
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>

        </>
    );
}