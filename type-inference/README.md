Type Inference
====

Inference = a conclusion reached on the basis of evidence and reasoning.

Best common type
----

When a type inference is made from several expressions, the types of those expressions are used to calculate a “best common type”. For example,

```
let x = [0, 1, null];
```

**To infer the type of x in the example above, we must consider the type of each array element. Here we are given two choices for the type of the array: number and null. The best common type algorithm considers each candidate type, and picks the type that is compatible with all the other candidates.**

- There are some cases where types share a common structure, but no one type is the super type of all candidate types. For example:

```
let zoo = [new Rhino(), new Elephant(), new Snake()];
```

Ideally, we may want zoo to be inferred as an Animal[], but because there is no object that is strictly of type Animal in the array, we make no inference about the array element type. To correct this, instead explicitly provide the type when no one type is a super type of all other candidates:

```
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];
```

When no best common type is found, the resulting inference is the **union array type**, (Rhino | Elephant | Snake)[].

Contextual Type
----

Type inference also works in “the other direction” in some cases in TypeScript. This is known as “contextual typing”. Contextual typing occurs when the type of an expression is implied by its location. For example:

```
window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.clickTime);  //<- Error
};
```

If the contextually typed expression contains explicit type information, the contextual type is ignored. Had we written the above example:

```
window.onmousedown = function(mouseEvent: any) {
    console.log(mouseEvent.clickTime);  //<- Now, no error is given
};
```



