Iterators and Generators
====

Iterables
----

- An object is deemed iterable if it has an implementation for the Symbol.iterator property.
- Some built-in types like Array, Map, Set, String, Int32Array, Uint32Array, etc. have their Symbol.iterator property already implemented. 
- Symbol.iterator function on an object is responsible for returning the **list of values** to iterate on.

**for..of statements**

```
let someArray = [1, "string", false];

for (let entry of someArray) {
    console.log(entry); // 1, "string", false
}
```

**for..of vs. for..in statements**

_for..in returns a list of keys on the object being iterated, whereas for..of returns a list of values of the numeric properties of the object being iterated._

```
let list = [4, 5, 6];

for (let i in list) {
   console.log(i); // "0", "1", "2",
}

for (let i of list) {
   console.log(i); // "4", "5", "6"
}
```

_Another distinction is that for..in operates on any object; it serves as a way to inspect properties on this object. for..of on the other hand, is mainly interested in values of iterable objects. Built-in objects like Map and Set implement Symbol.iterator property allowing access to stored values._

```
let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";

for (let pet in pets) {
   console.log(pet); // "species"
}

for (let pet of pets) {
    console.log(pet); // "Cat", "Dog", "Hamster"
}
```

**Code generation**

- _**Targeting ES5 and ES3**_

    - When targeting an ES5 or ES3, iterators are only allowed on values of Array type.
    - The compiler will generate a simple for loop for a for..of loop, for instance:

    ```
    let numbers = [1, 2, 3];
    for (let num of numbers) {
        console.log(num);
    }
    ```

    will be generated as:

    ```
    var numbers = [1, 2, 3];
    for (var _i = 0; _i < numbers.length; _i++) {
        var num = numbers[_i];
        console.log(num);
    }
    ```

- _**Targeting ECMAScript 2015 and higher**_

    - When targeting an ECMAScipt 2015-compliant engine, the compiler will generate for..of loops to target the built-in iterator implementation in the engine.


