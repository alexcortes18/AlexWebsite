import { createContext, useState } from "react";

const NavContext = createContext({
    navigator: 0,
    changeNavState: (id) => { },
});

export function NavContextProvider({children}) {
    const [navState, setNavState] = useState(0);

    function changeNavState(id) {
        setNavState(id);
    }

    const navCtx = {
        navigator : navState,
        changeNavState: changeNavState
    }

    return <NavContext.Provider value={navCtx}>{children}</NavContext.Provider>
}


export default NavContext;