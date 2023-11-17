import Image from "next/image";
import Link from "next/link";
import { Album } from "../../types/global.d";


export default async function Page() {
    const res = await fetch(`http://api:8001/gallery/`, { next: { tags: ['collection'] } })
    const data = await res.json()
    const albums = await data.map((album: Album) =>
        <Link key={album.uuid} href={`/gallery/${album.slug}`} className="relative block group mb-4">
            <Image className="group-hover:opacity-50"
            src={"http://api-nginx" + album.cover} alt={album.name} width={512} height={512} style={{ height: "auto", width: "100%" }} />
            <div className="absolute inset-0 transition-all transform opacity-0 group-hover:opacity-100">
                <div className="flex flex-col h-full p-3">
                    <p className="grow font-semibold text-xl text-center justify-self-center">{album.name}</p>
                    <p className="font-italic">{new Date(album.created_at).toLocaleDateString()}</p>
                </div>
            </div>
        </Link>
    );

    return (
    <section className="py-4">
        <h1 className="font-bold text-lg text-center mb-3">Gallery</h1>
        <div className="container mx-auto">
            <div className="gap-4 columns-2 lg:columns-3 xl:columns-4 2xl:container mx-auto">
                { albums }
            </div>
        </div>
    </section>
    );
}
