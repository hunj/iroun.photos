import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Loading() {
    return (
        <section className="p-4">
            <div className="mx-auto text-center text-xl">
                <FontAwesomeIcon className="animate-spin" icon={faSpinner} size="2xl" />
            </div>
        </section>
    );
}