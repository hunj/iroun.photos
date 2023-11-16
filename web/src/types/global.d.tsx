
export type Album = {
    uuid: string;
    name: string;
    slug: string;
    cover: string;
    created_at: string;
}

export type Photo = {
    uuid: string;
    album: any;
    url: string;
    thumbnail: string;
    visible: boolean;
}