import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Loading() {
    return (
        <section className="h-full">
            <div className="mx-auto">
                <FontAwesomeIcon icon={faSpinner} />
            </div>
        </section>
    );
}