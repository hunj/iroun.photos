import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({
    isOpen,
    toggle,
}: {
    isOpen: boolean;
    toggle: () => void;
}): JSX.Element => {
    return (
        <div
            className="fixed w-56 max-w-full py-3 overflow-hidden justify-center bg-white grid right-2 z-10 rounded-xl shadow-lg"
            style={{
                opacity: `${isOpen ? "1" : "0"}`,
                top:     `${isOpen ? "0.5rem" : "-100%"}`,
            }}
        >
            <button className="absolute right-0 p-3" onClick={toggle}>
                <FontAwesomeIcon icon={faTimes} />
            </button>

            <ul className="text-center leading-relaxed w-full tracking-wide space-y-2">
                <li>
                    <Link href="/about" onClick={toggle}>
                        About
                    </Link>
                </li>
                <li>
                    <Link href="/gallery" onClick={toggle}>
                        Gallery
                    </Link>
                </li>
                <li>
                    <Link href="/contact" onClick={toggle}>
                        Contact
                    </Link>
                </li>
                <li>
                    <Link href="https://instagram.com/iroun.photos" target="_blank" onClick={toggle}>
                        Instagram
                    </Link>
                </li>
            </ul>
        </div>

    );
};

export default Sidebar;
