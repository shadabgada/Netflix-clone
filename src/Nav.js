import React, {useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import "./Nav.css";

function Nav() {
    const [show, handleShow] = useState(false);
    const history = useHistory();

    const transitionNavBar = () => {
        if(window.scrollY>100){
            handleShow(true);
        } else{
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll",transitionNavBar);
        return () => window.removeEventListener("scroll",transitionNavBar);
    }, [])
    return (
        <div className={`nav ${show && "nav__black"}`}>

            <div className="nav__contents">

                <img 
                onClick={()=>history.push("/")}
                className="nav__logo"
                src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                alt=""></img>

                <img 
                onClick={()=>history.push("/profile")}
                className="nav__avatar"
                src="https://i.pinimg.com/originals/96/20/08/962008bd0eb249e4d575363114cec835.jpg"
                alt=""></img>

            </div>

        </div>
    )
}

export default Nav
