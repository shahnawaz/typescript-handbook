Functions
====

- Named functions
- Anonymous functions

```
/* basic.ts */

// Named function
function add(x, y) {
    return x + y;
}

// Anonymous function
let myAdd = function(x, y) { return x + y; };
```

Function Types
----

**Typing the function**

```
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y; };
```

**Writing the function type**

```
let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };
```

OR 

```
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
```

Note: Change in parameter name

_**Of note**, only the parameters and the return type make up the function type. Captured variables are not reflected in the type. In effect, captured variables are part of the “hidden state” of any function and do not make up its API._

**Inferring the types**

```
// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return  x + y; };

// The parameters 'x' and 'y' have the type number
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```

This is called **“contextual typing”**, a form of type inference. This helps cut down on the amount of effort to keep your program typed.


Optional and Default Parameters
----

```
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
```

```
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}
```

- Both will create the same type check.
- Optional parameter cannot come first
- Default parameter can come first, but user has to pass undefined intentionally to get the default value.

Rest Parameters
----

```
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

- Rest parameters are treated as a boundless number of optional parameters.

this
----

- Arrow functions capture the this where the function is created rather than where it is invoked.

**this parameters**

**this parameters in callbacks**

Overloads
----

-  Supply multiple function types for the same function as a list of overloads. 

```
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

