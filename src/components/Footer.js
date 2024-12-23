// Footer.js
import React from "react";
import "./Footer.css";
import { TiSocialFacebook } from "react-icons/ti";
import { FaTwitter } from "react-icons/fa";
import { RiInstagramLine } from "react-icons/ri";
const Footer = () => {
    return (
        <footer className="footer">
            <ul className="social-links">
                <li><a href="#"><TiSocialFacebook /></a></li>
                <li><a href="#"><FaTwitter /></a></li>
                <li><a href="#"><RiInstagramLine /></a></li>
            </ul>
            <p>&copy; 2024 Movie Mania. All rights reserved.</p>
        </footer>
    );
};

export default Footer;