import Image from "next/image";
import Link from "next/link";
import { Album } from "../../types/global.d";


export default async function Page() {
    const res = await fetch(`http://${process.env.API_URL}:${process.env.API_PORT}` + `/gallery/`, { cache: 'no-store' })
    const data = await res.json()
    const albums = await data.map((album: Album) =>
        <div key={album.uuid} className="bg-white border border-gray-200 rounded-lg shadow flex flex-row md:flex-col w-full md:w-auto">
            <Link href={`/gallery/${album.slug}`}>
                <Image 
                className="
                    object-cover rounded-l-lg md:rounded-t-lg
                    h-32 w-32
                    sm:h-48 sm:w-48
                    md:h-80 md:w-80
                "
                src={
                    `http://${process.env.NGINX_URL}:${process.env.NGINX_PORT}` + album.cover
                } alt={album.name} width={512} height={512} />
            </Link>
            <div className="flex flex-grow md:flex-auto p-3">
                <div className="flex flex-col justify-self-stretch md:w-0 md:flex-grow">
                    <Link href={`/gallery/${album.slug}`}>
                        <h5 className="sm:text-lg md:text-xl md:font-medium tracking-tight">{album.name}</h5>
                    </Link>
                    {/* <p className="mb-3 text-sm md:text-baseline">
                        Lorem Ipsum dolor sit amet
                    </p> */}
                    <p className="mt-auto text-xs sm:text-sm text-gray-400 ">{new Date(album.created_at).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );

    return (
    <section className="py-4 mx-3">
        <h1 className="font-bold text-lg text-center mb-3">Gallery</h1>
        <div className="mx-auto xl:container">
            <div className="gap-6 flex flex-row flex-wrap justify-center">
                { albums }
            </div>
        </div>
    </section>
    );
}

export const dynamic = 'force-dynamic'
