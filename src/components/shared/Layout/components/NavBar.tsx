import { useEffect, useMemo } from "react";
import { Link } from 'react-router-dom';
// @ts-ignore
import M from "materialize-css"

import { useZoeziMainTrackedState } from "../../../../context"

const NavBarComp = () => {
    const {
        isManagedContext, isParentContext, authToken,
        isZoeziMobileApp
    } = useZoeziMainTrackedState();

    const isLoggedIn = useMemo(() => {
        return !!authToken;
    }, [authToken]);

    useEffect(() => {
        M.Sidenav.init(document.querySelectorAll('.sidenav'));
    }, [])

    return (
        <>
            {
                isLoggedIn ? 
                <>
                    <ul id="dropdown1" className="dropdown-content lighten-2 hide-on-med-and-down">
                        <li><a href="<%=isNotParentMode ? '/student-edit-profile' : '/editprofile'%>" className="black-text">Settings</a></li>
                        {
                            !isParentContext && !isManagedContext ? 
                            <>
                                <li><a href="/student-edit-profile#subscriptions" className="black-text">Subscriptions</a></li>
                                <li className="divider"></li>
                                <li><a href="/exit-to-parent" className="black-text">Switch To Parent</a></li>
                            </>
                            : null
                        }
                        <li className="divider"></li>
                        <li><a href="/users/logout" className="black-text">Sign Out</a></li>
                    </ul>
                </>
                : null
            }
            

            <div className="navbar-fixed">

                <nav className="white sub-names" role="navigation">
                    <div className="nav-wrapper" style={{
                        margin: "0 auto",maxWidth:1280,width: "90%",
                    }}>
                        <a id="logo-container" href="/" className="brand-logo materialize-red-text sub-headings"><span className="teal-text">ZO</span>EZ<span className="teal-text">I</span></a>
                            
                        {
                            isZoeziMobileApp ? 
                            <ul className="right hide-on-large-only">
                                <li><a /*onclick="window.Android.shareApp();"*/ style={{
                                    backgroundColor: "transparent",
                                }} className="teal-text"><i className="large material-icons">share</i></a></li>
                            </ul>
                            : null
                        }

                        {
                            isLoggedIn ?
                            <ul className="right hide-on-med-and-down">
                                    <li><a href="/dashboard">Dashboard</a></li>
                                    <li><a href="/library">Library</a></li>
                                    <li className="disabled"><a href="/reports">Reports</a></li>
                                    <li><Link to="/blog">Media</Link></li>
                                    <li><Link to="/faq">Faq</Link></li>
                                    <li><a className="dropdown-trigger" id="desktopprofile2" href="#!" data-target="dropdown1">My Account<i className="material-icons right">arrow_drop_down</i></a></li>
                                    {/* <!-- <li><a className="dropdown-trigger" id="desktopprofile2" href="#!" data-target="dropdown2">Default<i className="material-icons right">arrow_drop_down</i></a></li> -->
                                    
                                    <% if(isMarketer){%>
                                    <!-- <li><a href="/marketing" className="waves-effect waves-light z-depth-1 btn-small" style="text-transform:none;">My Tools</a></li> -->
                                    <% } %> */}
                            </ul>
                                :
                            <ul className="right hide-on-med-and-down">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/pricing">Pricing</Link></li>
                                <li><a href="#aboutussection">About Us</a></li>
                                <li><Link to="/blog">Media</Link></li>
                                <li><Link to="/faq">Faq</Link></li>
                                <li><a href="https://darasani.zoezi-education.com" target="_blank" className="waves-effect waves-light z-depth-1 btn-flat" style={{
                                    textTransform: "none",border: "1px solid teal"
                                }}>Darasani</a></li>
                                <li><Link to="/signin">Login</Link></li>
                                <li><Link to="signup" className="waves-effect waves-light z-depth-1 btn-small" style={{
                                    textTransform: "none",
                                }}>Register</Link></li>
                                {/* <!-- check whether its on a desktop app if so render something different --> */}
                                <li><a href="<%=isDesktopApp ? '/app/contactus' : '#contactusparent'%>">Contact Us</a></li>
                            </ul>
                        }
                        <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    </div>
                </nav>
                
                { isLoggedIn ? <div className="pace"></div> : null }

            </div>

            <ul id="nav-mobile" className="sidenav sub-names" style={{
                background: "linear-gradient(to top, rgba(0,150,136,1) 40%, rgba(224,242,241,1) 100%)",
            }}>
                {
                    isLoggedIn ?
                    <>
                        {
                            isZoeziMobileApp ?
                                <>
                                    <li><a href="/faq"><i className="material-icons prefix">question_answer</i>Faq</a></li>
                                    <li><a href="/app/contactus"><i className="material-icons prefix">phone</i>Contact Us</a></li>
                                    <li><a href="/media"><i className="material-icons prefix">web</i>Media</a></li>
                                    <li hidden={!isParentContext && !isManagedContext}><a href="/exit-to-parent"><i className="material-icons prefix">call_missed</i>Switch To Parent</a></li>
                                    <li><a href="/users/logout"><i className="material-icons prefix">exit_to_app</i>Sign Out</a></li>
                                </>
                            :
                                <>
                                    <li><a href="/dashboard"><i className="material-icons prefix">home</i>Dashboard</a></li>
                                    <li><a href="/library"><i className="material-icons prefix">business_center</i>Library</a></li>
                                    <li><a href="/reports"><i className="material-icons prefix">insert_chart</i>Reports</a></li>
                                    <li><a href="/media"><i className="material-icons prefix">web</i>Media</a></li>

                                    {
                                        !isManagedContext ?
                                        <>
                                            {
                                                !isParentContext ?
                                                    <li><a href="/student-edit-profile#subscriptions"><i className="material-icons prefix">credit_card</i>Subscriptions</a></li>
                                                : null
                                            }
                                        </>
                                        :
                                        <li><a href="<%=isNotParentMode ? '/student-edit-profile' : '/editprofile'%>"><i className="material-icons prefix">settings</i>Settings</a></li>
                                    }

                                    <li><a href="/faq"><i className="material-icons prefix">question_answer</i>Faq</a></li>
                                    <li hidden={!isParentContext && !isManagedContext}><a href="/exit-to-parent"><i className="material-icons prefix">call_missed</i>Switch To Parent</a></li>
                                    <li><a href="/users/logout"><i className="material-icons prefix">exit_to_app</i>Sign Out</a></li>       
                                </>
                        }
                    </>
                    : null
                }

                {
                    !isLoggedIn ?
                    <>
                        <li hidden={isZoeziMobileApp}><a href="/"><i className="material-icons prefix">home</i>Home</a></li>
                        <li><a href="/pricing"><i className="material-icons prefix">attach_money</i>Pricing</a></li>
                        <li><a href="/media"><i className="material-icons prefix">web</i>Media</a></li>
                        <li><a href="/users/login"><i className="material-icons prefix">exit_to_app</i>Login</a></li>
                        <li><a href="/users/register"><i className="material-icons prefix">person_add</i>Register</a></li>
                        <li><a className="sidenav-close" href="<%=isZoeziApp ? '/app/contactus' : '#contactusparent'%>"><i className="material-icons prefix">phone</i>Contact Us</a></li>
                        <li><a href="/faq"><i className="material-icons prefix">question_answer</i>Faq</a></li>
                        <li><a className="sidenav-close" href="#aboutussection"><i className="material-icons prefix">info</i>About Us</a></li>
                        <li hidden={isZoeziMobileApp}><a className="sidenav-close" href="#aboutussection"><i className="material-icons prefix">info</i>About Us</a></li>
                    </> : null
                }
            </ul>


    {
        isLoggedIn && isZoeziMobileApp ?
        <div className="navbar-fixed hide-on-large-only sub-modal-texts" style={{
            position: "absolute",
        }}>
            <nav className="white" style={{
                bottom:0,height:56,
            }}>
                <div className="nav-wrapper center" style={{
                    display: "flex", justifyContent: "space-evenly",marginTop:-8,
                }}>
                    <ul>
                        <li>
                        <a href="/"  className="zoezi-link-clickable">
                            <div>
                                <span className="zoezi-bottom-nav-icon">
                                    <i className={`material-icons <%= currentPage.includes("/dashboard") ? "teal-text accent-4" : : ""%></i>" style="height: 20px;"`}>home</i>
                                </span>
                                <span className="zoezi-bottom-nav-title">Home</span>
                            </div>
                        </a></li>
        
                        <li>
                        <a href="/library" className="zoezi-link-clickable">
                            <div>
                                <span className="zoezi-bottom-nav-icon">
                                    <i className={`"material-icons <%= currentPage.includes("/library") ? "teal-text accent-4" : ""%></i>" style="height: 20px;"`}>business_center</i>
                                </span>
                                <span className="zoezi-bottom-nav-title">Library</span>
                            </div>
                        </a></li>
        
                        <li className="grey-text">
                        <a href="/reports" className="zoezi-link-clickable">
                            <div>
                                <span className="zoezi-bottom-nav-icon">
                                    <i className={`"material-icons <%= currentPage.includes("/reports") ? "teal-text accent-4" : ""%>" style="height: 20px;"`}>insert_chart</i>
                                </span>
                                <span className="zoezi-bottom-nav-title">Reports</span>
                            </div>
        
                            
                        </a></li>
        
                        <li>
                        <a href="<%=isNotParentMode ? '/student-edit-profile' : '/editprofile'%>" className="zoezi-link-clickable">
                            <div>
                                <span className="zoezi-bottom-nav-icon">
                                    <i className={`"material-icons <%= currentPage.includes(isNotParentMode ? '/student-edit-profile' : '/editprofile') ? "teal-text accent-4" : ""%></i>" style="height: 20px;"`}>settings</i>
                                </span>
                                <span className="zoezi-bottom-nav-title">Settings</span>
                            </div>
                        </a></li>
                    </ul>
                </div>
            </nav>
        </div>
        : null
    }

        </>
    )
} 

export default NavBarComp;