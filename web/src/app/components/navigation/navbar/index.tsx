import React from "react";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="w-full bg-teal-400 sticky top-0">
            <div className="container mx-auto h-full">
                <div className="flex justify-between items-center h-full">
                    <Link className="text-white text-xl font-bold" href="/">[ iroun.photos ]</Link>
                    <ul className="hidden md:flex text-white">
                        <li>
                            <Link href="/about">
                            <button className="bg-teal-400 hover:bg-teal-500 text-white p-4">
                                About
                            </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/gallery">
                                <button className="bg-teal-400 hover:bg-teal-500 text-white p-4">
                                    Gallery
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact">
                                <button className="bg-teal-400 hover:bg-teal-500 text-white p-4">
                                    Contact
                                </button>
                            </Link>
                        </li>
                    </ul>
                    <Link className="text-white text-lg" href="https://instagram.com/iroun.photos" target="_blank">
                        Instagram
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;