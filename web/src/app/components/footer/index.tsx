import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";


const Footer = () => {
    return (
        <footer className="bottom-0 py-6 bg-gray-100 mt-6">
            <p className="text-center text-sm px-7">
                <FontAwesomeIcon icon={faCopyright} size="sm" className="inline max-h-3" /> 2023 <a href="/" className="font-bold text-blue-400">iroun.photos</a> / <a href="https://hunj.tech/" className="text-blue-400">Hun Jae Lee</a>. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;