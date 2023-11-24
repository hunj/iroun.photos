import Image from "next/image";
import Link from "next/link";
import { Album } from "../../types/global.d";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default async function Page() {
    const res = await fetch(`http://${process.env.API_URL}:${process.env.API_PORT}` + `/gallery/`, { cache: 'no-store' })
    const data = await res.json()
    const albums = await data.map((album: Album) =>
        <div key={album.uuid} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <Link href={`/gallery/${album.slug}`}>
                <Image className="rounded-t-lg" src={`http://${process.env.NGINX_URL}:${process.env.NGINX_PORT}` + album.cover} alt={album.name} width={512} height={512} />
            </Link>
            <div className="p-5">
                <Link href={`/gallery/${album.slug}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight">{album.name}</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{new Date(album.created_at).toLocaleDateString()}</p>
            </div>
        </div>
    );

    return (
    <section className="py-4">
        <h1 className="font-bold text-lg text-center mb-3">Gallery</h1>
        <div className="container mx-auto">
	    <div className="gap-4 flex flex-row flex-wrap">
            { albums }
	    </div>
        </div>
    </section>
    );
}

export const dynamic = 'force-dynamic'
