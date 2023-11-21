import Image from 'next/image';

export default async function Page() {
    const testimonials: any = [
        {
            igHandle: 'hunjelly',
            text: 'yeah boi',
        }
    ]

    return (
        <section className="container mx-auto py-8 text-lg">
            <h1 className="font-semibold text-3xl mb-3">
                Photography
            </h1>
            
            <div className="flex flex-col">
                <div className="flex flex-row">
                    <div className="w-128 h-128">
                        <img src={1} width={128} height={128} />
                    </div>
                </div>
            </div>

        </section>

    );
}
