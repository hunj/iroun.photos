import Image from "next/image";
import Link from "next/link";
import { Album } from "../../types/global.d";
import { url } from "inspector";


export default async function Page() {
    const res = await fetch(`http://${process.env.API_URL}:${process.env.API_PORT}` + `/gallery/`, { cache: 'no-store' })
    const data = await res.json()
    const albums = await data.map((album: Album) =>
        <div key={album.uuid} className="border border-gray-200 rounded-lg shadow flex flex-row md:flex-col w-full md:w-auto">
            <Link href={`/gallery/${album.slug}`} className="contents">
                <Image className="
                    object-cover
                    rounded-l-lg md:rounded-t-lg md:rounded-b-none
                    w-full h-48
                    md:max-h-none
                    md:h-64 md:w-64
                    lg:h-80 lg:w-80
                    xl:h-96 xl:w-96
                "
                src={
                    `http://${process.env.NGINX_URL}:${process.env.NGINX_PORT}` + album.cover
                } alt={album.name} width={512} height={512} />
            </Link>
            <div className="flex flex-grow md:flex-auto max-h-48 w-full md:max-h-none">
                <div className="flex grow-0 flex-col md:w-0 md:flex-grow md:max-h-none m-3 md:max-w-none">
                    <h5 className="sm:text-lg md:text-xl md:font-medium tracking-tight">
                        <Link href={`/gallery/${album.slug}`}>
                            {album.name}
                        </Link>
                    </h5>
                    <div className="mb-3 text-sm text-baseline overflow-hidden">
                        {album.description}
                    </div>
                    <p className="mt-auto text-xs sm:text-sm text-gray-400">{new Date(album.date).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );

    return (
    <section className="py-3 -mx-3">
        <h1 className="lg:hidden font-bold text-lg text-center mb-3">Gallery</h1>
        <div className="mx-auto xl:container">
            <div className="gap-1 md:gap-3 lg:gap-4 flex flex-row flex-wrap justify-center">
                { albums }
            </div>
        </div>
    </section>
    );
}

export const dynamic = 'force-dynamic'
