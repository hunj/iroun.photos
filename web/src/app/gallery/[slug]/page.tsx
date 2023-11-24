import Link from "next/link";
import Image from "next/image";

import PhotoModal from "../../components/gallery/modal";


type Photo = {
    uuid: string;
    url: string;
    thumbnail: string;
    visible: boolean;
}

async function getPhotos(gallerySlug: string) {
    const res = await fetch(`http://${process.env.API_URL}:${process.env.API_PORT}` + `/gallery/${gallerySlug}`, { cache: 'no-store' })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Page({ params }: { params: { slug: string } }) {
    const album = await getPhotos(params.slug);

    if (!album.photos) {
        throw new Error('Failed to fetch data')
    }

    const galleryItems = await album.photos.map((photo: Photo) =>
        <div key={photo.uuid} className="mb-4">
        <PhotoModal
            gallerySlug={params.slug}
            thumb={`http://${process.env.NGINX_URL}:${process.env.NGINX_PORT}` + photo.thumbnail}
            thumbWidth={512}
            thumbHeight={512}
            thumbAlt={photo.uuid}
            imageUuid={photo.uuid}
            imageUrl={`http://${process.env.NGINX_URL}:${process.env.NGINX_PORT}` + photo.url}
            imageWidth={2560}
            imageHeight={2560}
        />
        </div>
        // <div key={photo.uuid} className="mb-4">
        //     <Link href={`/gallery/${params.slug}/${photo.uuid}`}>
        //         <div className="h-100 w-100">
        //             <Image className="hover:opacity-80" src={`http://${process.env.NGINX_URL}:${process.env.NGINX_PORT}` + photo.thumbnail } alt={photo.uuid} width={512} height={512} style={{ height: "auto", width: "100%" }} />
        //         </div>
        //     </Link>
        // </div>
    );

    return (
        <section className="pb-8">
            <div className="bg-gray-100 py-8 mb-3">
                <div className="py-12 mx-auto text-center">
                    <h1 className="font-bold text-2xl">{album.name}</h1>
                </div>
            </div>
            <div className="gap-4 columns-2 lg:columns-3 xl:columns-4 2xl:columns-6 max-w-screen-2xl mx-auto">
                {galleryItems}
            </div>
        </section>
    );
}
