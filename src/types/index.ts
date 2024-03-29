export type LoadingStatus = 'loading' | 'idle' | 'error';

export interface INews {
    by: string;
    descendants: number;
    id: number;
    kids: number[] | undefined;
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
}

export interface IComment {
    by: string;
    id: number;
    kids: number[];
    parent: number;
    text: string;
    time: number;
    type: string;
}
