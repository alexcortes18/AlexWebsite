import MainNavigation from "../components/contents/MainNavigation";
import { Outlet } from "react-router-dom";

export default function ErrorPage(){
    return (
        <>
            <MainNavigation/>
            <Outlet/>
        </>
    );
}