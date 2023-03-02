import {Flight, SearchStrategy} from "./types";

export class FlightSearch {
    private strategy: SearchStrategy;

    constructor(strategy: SearchStrategy) {
        this.strategy = strategy;
    }

    searchFlights(): Flight[] {
        return this.strategy.search();
    }
}
