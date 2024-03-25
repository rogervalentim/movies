export interface SearchProps {
    id: number;
    name: string;
    title: string;
    profile_path: string | null;
    poster_path: string | null;
    media_type: string;
    known_for_department: string;
}

export interface GenresProps {
    id: number;
    name: string;
}

export interface ProductionCompaniesProps {
    id: number;
    name: string;
}

export interface CreatedByProps {
    id: number;
    name: string;
}

export interface NetworksProps {
    id: number;
    name: string;
    logo_path: string;
}
export interface CardProps {
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    vote_average: number;
}

export interface TmdbProps {
    id: number;
    title?: string;
    name?: string;
    backdrop_path?: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    realese_date: number;
    release_date: number;
    runtime: number;
    budget: number;
    genres: GenresProps[];
    production_companies: ProductionCompaniesProps[];
    number_of_seasons: number;
    created_by:  CreatedByProps;
    networks: NetworksProps[];
    number_of_episodes: number;
}

