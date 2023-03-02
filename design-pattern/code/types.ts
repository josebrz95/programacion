export interface Flight {
    price: number;
    timeOfFlight: number //medido en minutos
}

export interface SearchStrategy {
    search(): Flight[];
}
