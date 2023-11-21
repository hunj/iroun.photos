import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Loading() {
    return (
    <section className="h-full">
        <div className="mx-auto">
            <FontAwesomeIcon icon="spinner" />
        </div>
    </section>
    );
}