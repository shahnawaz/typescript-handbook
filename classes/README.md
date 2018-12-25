Classes
=====

TypeScript with ES6 offers some amazing class creation features, very similar to C# and Java.

Check 
`Greeter.ts`
for a basic class example.

Inheritance
----

Common inheritance is possible in TS as well. Lets look at a complex example directly.

Check
`Inheritance.ts`

Public, private, and protected modifiers
----

**Public by default**

- In TypeScript, each member is public by default
- You may still mark a member public explicitly.

**Understanding _private_**

```
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // Error: 'name' is private;
```

- TypeScript is a structural type system. When we compare two different types, regardless of where they came from, if the types of all members are compatible, then we say the types themselves are compatible.

- However, when comparing types that have private and protected members, we treat these types differently. For two types to be considered compatible, if one of them has a private member, then the other must have a private member that originated in the same declaration. The same applies to protected members.

```
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // Error: 'Animal' and 'Employee' are not compatible
```

In this example, we have an Animal and a Rhino, with Rhino being a subclass of Animal. We also have a new class Employee that looks identical to Animal in terms of shape. We create some instances of these classes and then try to assign them to each other to see what will happen. Because Animal and Rhino share the private side of their shape from the same declaration of private name: string in Animal, they are compatible. However, this is not the case for Employee. When we try to assign from an Employee to Animal we get an error that these types are not compatible. Even though Employee also has a private member called name, it’s not the one we declared in Animal.

**Understanding _protected_**

- The _protected_ modifier acts much like the _private_ modifier with the exception that members declared protected can also be accessed within deriving classes
- A constructor may also be marked protected. This means that the class cannot be instantiated outside of its containing class, but can be extended. 

```
class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee can extend Person
class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // Error: The 'Person' constructor is protected
```

Readonly modifier
----

- You can make properties readonly by using the readonly keyword. Readonly properties must be initialized at their declaration or in the constructor.

```
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // error! name is readonly.
```

**Parameter properties**

```
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {
    }
}
```

Notice how we dropped _theName_ altogether and just use the shortened readonly name: string parameter on the constructor to create and initialize the name member. **We’ve consolidated the declarations and assignment into one location**.

-  The same can be done for public, protected, private and readonly modifiers.

Accessors
----

- TypeScript supports **getters/setters** as a way of intercepting accesses to a member of an object.
- accessors with a **get** and no **set** are automatically inferred to be readonly.

Check
`Employee.ts`

Static Properties
----

- Accessed with class name

Abstract Classes
----

- Abstract classes are base classes from which other classes may be derived. They may not be instantiated directly.
- Unlike an interface, an abstract class may contain implementation details for its members.
- The abstract keyword is used to define abstract classes as well as abstract methods within an abstract class.
- Methods within an abstract class that are marked as abstract do not contain an implementation and must be implemented in derived classes.

Check
`Abstract.ts`

Advanced Techniques
----

**Constructor functions**

F***ud up logic! (WBAS)

**Using a class as an interface**

```
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```