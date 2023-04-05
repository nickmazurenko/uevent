import Room from "./Room";

export default class TicketData {

    rooms: Room[]
    places: number
    cost: number
    event: any

    constructor({ rooms, places, cost }: { rooms: Room[], places: number, cost: number }) {

        this.rooms = rooms;
        this.places = places;
        this.cost = cost;
        this.event = null;

    }

}