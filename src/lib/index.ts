// place files you want to import through the `$lib` alias in this folder.

// types

export type Info = {
    id: number,
    icon: any,
    iconDark: any,
    title: string,
    description: string
};

export type Tool = {
    id: number,
    icon: any
}

export type Service = {
    id: number,
    icon: any,
    title: string,
    description: string,
    link: string
}

export type Work = {
    id: number,
    title: string,
    description: string,
    bgImage: any
}