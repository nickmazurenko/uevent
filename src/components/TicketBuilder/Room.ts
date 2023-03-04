
export default class Room {

    name: string
    places: number

    constructor({ name, places }: { name: string, places: number }) {
        this.name = name;
        this.places = places;
    }

}