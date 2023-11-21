export default function Page() {
    return (
        <section className="container mx-auto py-8 text-lg">
            <h1 className="font-semibold text-3xl mb-3">
                About me
            </h1>
            <p className="mb-3">
                I am an event/portrait/cosplay photographer based in the Western Pennsylvania / Northeast Ohio area,<br />
                capturing dynamic moments and recreating scenes from the original media.
            </p>
            <p className="mb-3">
                My photo highlights this well and shows a bit of my personality.<br />
                Using available/natural light, I aim to get "clean and vibrant" photos.
            </p>
            <p className="mb-1">
                My gears consist of a variety of lenses, from versatile everyday zoom lens to old-school manual focus prime lens:
            </p>
            <ul className="list-inside list-disc mb-3">
                <li><a className="text-blue-400" href="https://amzn.to/3M4BThJ" target="_blank">Nikon D750</a> with <a className="text-blue-400" href="https://amzn.to/3PWf0yZ" target="_blank">MB-D16 vertical grip</a></li>
                <li><a className="text-blue-400" href="https://amzn.to/48M86Ef" target="_blank">Nikon AF-S 24-120mm f/4g ED VR</a></li>
                <li><a className="text-blue-400" href="https://amzn.to/48zvC77" target="_blank">Nikon AF DC 135mm f/2d</a></li>
                <li><a className="text-blue-400" href="https://amzn.to/3PGo2Ph" target="_blank">Nikon AF 50mm f/1.8d</a></li>
                <li><a className="text-blue-400" href="https://amzn.to/46eHJor" target="_blank">Neewer Collapsible Reflector</a></li>
            </ul>
            <p className="text-xs">* These are affiliate links and if you buy them through the link, it benefits me.</p>
        </section>
    );
}