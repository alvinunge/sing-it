import { SpotifyTrack } from "./spotifytrack";

export interface Game {
    id: string; //number later
    name: string;
    createdAt: string;
    slot: string;
    rounds: Round[];
};

export interface Round {
    id: string;
    gameId?: string;
    line: string;
    createdAt: string;
    boxes: Box[];
    nr: number;
    song?: SpotifyTrack | undefined;
};

export interface Box {
    id: string;
    createdAt: string;
    word: string;
    color: string;
    roundnr?: number;
    hidden: boolean;
};