import React from "react";
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { useZoeziMainTrackedState } from "../../../context";
import { useIsLoggedIn } from "../../../hooks";


import FooterComp from "./components/Footer";
import NavBarComp from "./components/NavBar";

// used to manage shared stuff by some components
const PagesGlobalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) =>  {
    const { isZoeziMobileApp } = useZoeziMainTrackedState();
    const isLoggedIn = useIsLoggedIn()

    return (
        <>
            <NavBarComp/>
                <main>
                    {children}
                </main>
            <FooterComp/>
            {
                isZoeziMobileApp || isLoggedIn ? null :
                <FloatingWhatsApp 
                    phoneNumber="254115815941" 
                    accountName="Zoezi Education"
                    avatar="img/adminfavi.jpg" 
                />
            }
        </>
    )
}

export default PagesGlobalLayout;