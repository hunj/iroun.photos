
export type Album = {
    uuid: string;
    name: string;
    slug: string;
    cover: string;
    date: string;
    description: string;
}

export type Photo = {
    uuid: string;
    album: any;
    url: string;
    thumbnail: string;
    visible: boolean;
}