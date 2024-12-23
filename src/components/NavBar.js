// NavBar.js
import React from "react";
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className="navbar">
            <a href="/">&lt;Kartik/&gt;</a>
            <ul>
                <li><a href="#favorites">Favorites</a></li>
                <li><a href="https://github.com/sehgal29" target="_blank">Contact</a></li>
            </ul>
        </nav>
    );
};

export default NavBar;