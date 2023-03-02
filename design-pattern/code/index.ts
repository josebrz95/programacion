import {SearchStrategy} from "./types";
import {PriceSearchStrategy, TimeSearchStrategy} from "./strategies";
import {FlightSearch} from "./context";
import {getSearchOption} from "./services";

let strategy: SearchStrategy;

const searchOption: string = getSearchOption();

if (searchOption === "price") {
    strategy = new PriceSearchStrategy();
} else {
    strategy = new TimeSearchStrategy();
}

const search = new FlightSearch(strategy);
const results = search.searchFlights();
console.log(results)
