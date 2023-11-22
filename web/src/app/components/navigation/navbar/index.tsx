import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

const Navbar = () => {
    return (
        <div className="w-full bg-teal-400 top-0">
            <div className="container mx-auto h-full">
                <div className="flex justify-between items-center h-full">
                    <Link className="text-white text-xl font-bold p-3" href="/">[ iroun.photos ]</Link>
                    <ul className="hidden md:flex text-white">
                        <li>
                            <Link href="/about" className="bg-teal-400 hover:bg-teal-500 text-white p-4">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/photography" className="bg-teal-400 hover:bg-teal-500 text-white p-4">
                                    Photography
                            </Link>
                        </li>
                        <li>
                            <Link href="/gallery" className="bg-teal-400 hover:bg-teal-500 text-white p-4">
                                    Gallery
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="bg-teal-400 hover:bg-teal-500 text-white p-4">
                                    Contact
                            </Link>
                        </li>
                    </ul>
                    <Link className="text-white text-lg hover:bg-teal-500 p-4 text-white" href="https://instagram.com/iroun.photos" target="_blank">
                        <FontAwesomeIcon icon={faInstagram} size="sm" />
                        <span className="hidden lg:inline lg:ml-1">Instagram</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;