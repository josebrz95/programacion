import {Flight} from "./types";

export const getSearchOption = (): string => ['price', 'timeOfFlight'][Math.floor(Math.random() * 2)]

export const getFlights = (): Flight[] => [{ price: 10, timeOfFlight: 200 }, { price: 20, timeOfFlight: 100 }]



