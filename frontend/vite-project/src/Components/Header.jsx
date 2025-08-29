import '../CSS/Header.css'

import { NavLink, useLocation } from "react-router-dom";

export const Header = () => {

    const location = useLocation();

    return <div className={`header-container ${location.pathname === '/' && "no-margin"}`}>
        <div>
            LOGO
        </div>
        <div className='util'>
            <NavLink to="/" className='anchor-mod'>Home</NavLink>
            <NavLink to="/" className='anchor-mod'>Log in</NavLink>
            <NavLink to="/" className='anchor-mod'>Sign up</NavLink>
            <NavLink to="/query" className='anchor-mod'>Query</NavLink>
            {/* <NavLink to="/predict?p=2" className='anchor-mod'></NavLink> */}
        </div>
    </div>
}