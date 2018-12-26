Interfaces
====

One of TypeScript’s core principles is that type-checking focuses on the shape that values have. This is sometimes called “**duck typing**” or “**structural subtyping**”.

```
interface Person {
    firstName: string;
    lastName: string;
}
```

- In TypeScript, two types are compatible if their internal structure is compatible.

Optional properties
----

```
interface SquareConfig {
    color?: string;
    width?: number;
}
```

Readonly properties
----

Some properties should only be modifiable when an object is first created.

```
interface Point {
    readonly x: number;
    readonly y: number;
}
```


- TypeScript comes with a ReadonlyArray<T> type that is the same as Array<T> with all mutating methods removed, so you can make sure you don’t change your arrays after creation:

```
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

- On the last line of the snippet you can see that even assigning the entire ReadonlyArray back to a normal array is illegal. You can still override it with a type assertion, though:

```
a = ro as number[];
```

readonly vs const
----
		
The easiest way to remember whether to use readonly or const is to ask whether you’re using it on a variable or a property. Variables use const whereas properties use readonly

Excess Property Checks
----

```
interface SquareConfig {
    color?: string;
    width?: number;
}

// error: 'colour' not expected in type 'SquareConfig'
let mySquare = createSquare({ colour: "red", width: 100 });
```

Two ways to get around:

1. Getting around these checks is actually really simple. The easiest method is to just use a type assertion:
```
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

2. A better approach might be to add a string index signature

```
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```

Function Types
----

```
interface SearchFunc {
    (source: string, subString: string): boolean;
}
```

Usage:

```
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
```

Indexable Types
----

```
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

Above, we have a StringArray interface that has an index signature. This index signature states that when a StringArray is indexed with a number, it will return a string.

**Types of index signatures:**

There are two types of supported index signatures: **string** and **number**. It is possible to support both types of indexers, but the type returned from a numeric indexer must be a subtype of the type returned from the string indexer. This is because when indexing with a number, JavaScript will actually convert that to a string before indexing into an object. That means that indexing with 100 (a number) is the same thing as indexing with "100" (a string), so the two need to be consistent.

**Readonly index signatures:**

```
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
```

Class Types
----

```
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

- Difference between the static and instance sides of classes 

    f***ed up logic! WBAS

Extending Interfaces
----

```
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}
```


- Multiple extend

    An interface can extend multiple interfaces, creating a combination of all of the interfaces.

```
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}
```

Hybrid Types
----

An object that acts as both a function and an object, with additional properties:

```
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

When interacting with 3rd-party JavaScript, you may need to use patterns like the above to fully describe the shape of the type.

Interfaces Extending Classes
----

When an interface type extends a class type it inherits the members of the class but not their implementations. It is as if the interface had declared all of the members of the class without providing an implementation. Interfaces inherit even the private and protected members of a base class. This means that when you create an interface that extends a class with private or protected members, that interface type can only be implemented by that class or a subclass of it.

```
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// Error: Property 'state' is missing in type 'Image'.
class Image implements SelectableControl {
    select() { }
}

// not a subtype/child of Control 
class Location {

}
```