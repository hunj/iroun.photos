import Image from "next/image";
import Link from "next/link";
import { Album } from "../../types/global.d";


export default async function Page() {
    const res = await fetch(`http://api:8001/gallery/`, { next: { tags: ['collection'] } })
    const data = await res.json()
    const albums = await data.map((album: Album) =>
        <Link key={album.uuid} href={`/gallery/${album.slug}`} className="rounded-lg border border-solid border-slate-400">
            <Image className="rounded-t-lg" src={album.cover} alt={album.name} width={512} height={512} style={{ height: "auto", width: "100%" }} />
            <div className="flex m-3 flex-row flex-wrap">
                <p className="col font-semibold">{album.name}</p>
                <p className="col">{album.created_at}</p>
            </div>
        </Link>
    );

    return (
    <section className="py-4">
        <h1 className="font-bold text-lg text-center mb-3">Gallery</h1>
        <div className="container mx-auto">
            <div className="grid grid-cols-4 gap-4">
                { albums }
            </div>
        </div>
    </section>
    );
}
