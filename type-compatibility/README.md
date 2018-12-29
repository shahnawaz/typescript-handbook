Type Compatibility
====

Introduction
----

Type compatibility in TypeScript is based on **structural subtyping**. **Structural typing is a way of relating types based solely on their members.** This is in contrast with nominal typing.

```
interface Named {
    name: string;
}

class Person {
    name: string;
}

let p: Named;
// OK, because of structural typing
p = new Person();
```

In nominally-typed languages like C# or Java, the equivalent code would be an error because the Person class does not explicitly describe itself as being an implementer of the Named interface.

Starting Out
----

```
interface Named {
    name: string;
}

let x: Named;
// y's inferred type is { name: string; location: string; }
let y = { name: "Alice", location: "Seattle" };

x = y;  // OK

y = x;  // -> Error, location is missing in type Named (x)
```

The same rule for assignment is used when checking function call arguments:

```
function greet(n: Named) {
    console.log("Hello, " + n.name);
}
greet(y); // OK
```

Comparing two functions
----

**Function Arguments**

```
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error
```

You may be wondering why we allow **‘discarding’** parameters like in the example y = x. The reason for this assignment to be allowed is that ignoring extra function parameters is actually quite common in JavaScript. For example, Array#forEach provides three parameters to the callback function: the array element, its index, and the containing array.

**Function Return Type**

Two functions that differ only by their return type

```
let x = () => ({name: "Alice"});
let y = () => ({name: "Alice", location: "Seattle"});

x = y; // OK
y = x; // Error, because x() lacks a location property
```

The type system enforces that the source function’s return type be a subtype of the target type’s return type.

Enums
----

Enums are compatible with numbers, and numbers are compatible with enums. Enum values from different enum types are considered incompatible. For example,

```
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let status = Status.Ready;
status = Color.Green;  // Error
```


Classes
----

When comparing two objects of a class type, only members of the instance are compared. Static members and constructors do not affect compatibility.

```
class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { }
}

class Size {
    feet: number;
    constructor(numFeet: number) { }
}

let a: Animal;
let s: Size;

a = s;  // OK
s = a;  // OK
```

**Private and protected members in classes**

Private and protected members in a class affect their compatibility. When an instance of a class is checked for compatibility, if the target type contains a private member, then the source type must also contain a private member that originated from the same class. Likewise, the same applies for an instance with a protected member.


Generics
----

```
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // OK, because y matches structure of x
```

In the above, x and y are **compatible because their structures do not use the type argument in a differentiating way**. Changing this example by adding a member to Empty<T> shows how this works:

```
interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y;  // Error, because x and y are not compatible
```

**Function**

```
let identity = function<T>(x: T): T {
    // ...
}

let reverse = function<U>(y: U): U {
    // ...
}

identity = reverse;  // OK, because (x: any) => any matches (y: any) => any
```

Advanced Topics
----

**Subtype vs Assignment**

WBAS
