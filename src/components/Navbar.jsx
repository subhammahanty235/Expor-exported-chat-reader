import React from "react";
import {Link ,useLocation} from 'react-router-dom'
const Navbar = () => {
    const location = useLocation()

    return (
        <>
            <nav id="navbar" className={`navbar navbar-light bg-light text-center d-flex justify-content-between container ${location.pathname==='/convertedchat'?'d-none':''}`} style={{borderBottom:"2px solid rgb(117, 122, 121)"}}>
                
                    <h3><Link to='/' style={{color:"black" ,textDecoration:"none"}}>Expor</Link></h3>
                    <a href="https://github.com/subhammahanty235" className="btn btn-outline-success mx-3">Visit Creator</a>
                
            </nav>
            
        </>
    )
}

export default Navbar