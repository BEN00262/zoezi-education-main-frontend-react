import React from "react";
import FooterComp from "./components/Footer";
import NavBarComp from "./components/NavBar";

// used to manage shared stuff by some components
const PagesGlobalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) =>  {
    return (
        <>
            <NavBarComp/>
                <main>
                    {children}
                </main>
            <FooterComp/>
        </>
    )
}

export default PagesGlobalLayout;