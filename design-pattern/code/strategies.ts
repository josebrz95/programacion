import {Flight, SearchStrategy} from "./types";
import {getFlights} from "./services";


export class PriceSearchStrategy implements SearchStrategy {
    search(): Flight[] {
        console.log('Buscando vuelos por precio');
        const flights: Flight[] = getFlights().sort((a,b) => a.price - b.price);
        return flights;
    }
}

export class TimeSearchStrategy implements SearchStrategy {
    search(): Flight[] {
        console.log('Buscando vuelos por tiempo de vuelo');
        const flights: Flight[] = getFlights().sort((a,b) => a.timeOfFlight - b.timeOfFlight);
        return flights;
    }
}
