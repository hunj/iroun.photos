import Image from "next/image";
import Link from "next/link";
import { Photo } from "../../../../types/global.d";


async function getPhoto(gallerySlug: string, photoUuid: string) {
    const res = await fetch(`http://api:8001/gallery/${gallerySlug}/${photoUuid}`)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Page({ params }: { params: { slug: string, uuid: string } }) {
    const photo: Photo = await getPhoto(params.slug, params.uuid);

    console.log(photo)

    if (!photo) {
        throw new Error('Failed to fetch data')
    }

    return (
        <section className="pb-8">
            <div className="bg-gray-100 mb-3">
                <div className="container py-12 mx-auto text-center">
                    <h1 className="font-bold text-lg">
                        <Link href={`/gallery/${params.slug}`} className="text-blue-400">{ photo.album.name }</Link> / {photo.uuid}
                    </h1>
                </div>
            </div>
            <div className="container mx-auto h-full">
                <Link href={ `http://localhost:8000` + photo.url } target="_blank">
                    <Image alt={photo.uuid} src={`http://nginx` + photo.url } width={2560} height={2560} style={{ height: "100%", width: "auto" }} />
                </Link>
            </div>
        </section>
    );
}
