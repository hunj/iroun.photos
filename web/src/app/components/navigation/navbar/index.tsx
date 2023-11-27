import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({ toggle }: { toggle: () => void }) => {
    return (
        <div className="w-full bg-teal-400 top-0">
            <div className="max-w-screen mx-auto w-100 h-full">
                <div className="flex justify-between items-center">
                    <Link className="text-white text-xl font-bold p-4" href="/">[ iroun.photos ]</Link>

                    <Link href="#" className="p-4 items-center justify-between md:hidden hover:bg-teal-500 text-sm" onClick={toggle}>
                        <FontAwesomeIcon icon={faBars} className="text-white" />
                    </Link>

                    <ul className="hidden md:flex text-white">
                        <li>
                            <Link href="/about" className="bg-teal-400 hover:bg-teal-500 text-white p-4">
                                About
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
                    <Link className="hidden md:inline-block text-white text-lg hover:bg-teal-500 p-4 text-white" href="https://instagram.com/iroun.photos" target="_blank">
                        <FontAwesomeIcon icon={faInstagram} size="sm" className="max-h-4" />
                        <span className="hidden md:inline lg:ml-1">Instagram</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;