Symbols
====

Starting with ECMAScript 2015, symbol is a **primitive data type, just like number and string**.

**Primitive**
A primitive (primitive value, primitive data type) is **data that is not an object and has no methods**. In JavaScript, there are 6 primitive data types: **string, number, boolean, null, undefined, symbol (new in ECMAScript 2015)**.


- symbol values are created by calling the Symbol constructor.

```
let sym1 = Symbol();

let sym2 = Symbol("key"); // optional string key
```

- Symbols are immutable, and unique.

```
let sym2 = Symbol("key");
let sym3 = Symbol("key");

sym2 === sym3; // false, symbols are unique
```

- Just like strings, symbols can be used as keys for object properties.
  
```
let sym = Symbol();

let obj = {
    [sym]: "value"
};

console.log(obj[sym]); // "value"
```

- Symbols can also be combined with computed property declarations to declare object properties and class members.
  
```
const getClassNameSymbol = Symbol();

class C {
    [getClassNameSymbol](){
       return "C";
    }
}

let c = new C();
let className = c[getClassNameSymbol](); // "C"
```

Well-known Symbols
----

WBAS

