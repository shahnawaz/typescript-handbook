class Animal {

    name: string;

    constructor(theName: string) {
        this.name = theName;
    }

    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }

}

class Snake extends Animal {

    constructor(name: string) {
        super(name);
    }

    move(distanceInMeters: number = 5) {
        console.log('Slithering...');
        super.move(distanceInMeters);
    }

}

class Horse extends Animal {

    constructor(name: string) {
        super(name);
    }

    move(distanceInMeters: number = 45) {
        console.log('Galloping...');
        super.move(distanceInMeters);
    }

}

let sam = new Snake('Sam! the conqueror');
let tom: Animal = new Horse('Tom! the basher');

sam.move();
tom.move(20);