Namespaces
====

- Adds organization scheme in our code.
- Keep code safe from naming conflicts.
- Instead of putting lots of different names into the global namespace, wrap up our objects into a namespace.

Check `/namespaces/validators.ts`

Splitting Across Files
----

**Multi-file namespaces**

- We’ll add **reference tags** to tell the compiler about the relationships between the files.

_Validation.ts_
```
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
}
```

_LettersOnlyValidator.ts_
```
/// <reference path="Validation.ts" />
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
}
```

_ZipCodeValidator.ts_
```
/// <reference path="Validation.ts" />
namespace Validation {
    const numberRegexp = /^[0-9]+$/;
    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}
```

_Test.ts_
```
/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
}
```

Once there are multiple files involved, we’ll need to make sure all of the compiled code gets loaded. There are two ways of doing this.

**Single JS file from multiple files**

First, we can use concatenated output using the --outFile flag to compile all of the input files into a single JavaScript output file:

`tsc --outFile sample.js Test.ts`

The compiler will automatically order the output file based on the reference tags present in the files. You can also specify each file individually:

`tsc --outFile sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts`

**Individual JS fie for each file**

Alternatively, we can use per-file compilation (the default) to emit one JavaScript file for each input file. If multiple JS files get produced, we’ll need to use `<script>` tags on our webpage to load each emitted file in the appropriate order, for example:

_MyTestPage.html (excerpt)_
```
<script src="Validation.js" type="text/javascript" />
<script src="LettersOnlyValidator.js" type="text/javascript" />
<script src="ZipCodeValidator.js" type="text/javascript" />
<script src="Test.js" type="text/javascript" />
```

Aliases
----

Another way that you can simplify working with of namespaces is to use import q = x.y.z to create shorter names for commonly-used objects. Not to be confused with the import x = require("name") syntax used to load modules, this syntax simply creates an alias for the specified symbol. You can use these sorts of imports (commonly referred to as aliases) for any kind of identifier, including objects created from module imports.

```
namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}

import polygons = Shapes.Polygons;
let sq = new polygons.Square(); // Same as 'new Shapes.Polygons.Square()'
```

Ambient Namespaces
----

The popular library D3 defines its functionality in a global object called d3. Because this library is loaded through a `<script>` tag (instead of a module loader), **its declaration uses namespaces to define its shape**

_D3.d.ts (simplified excerpt)_
```
declare namespace D3 {
    export interface Selectors {
        select: {
            (selector: string): Selection;
            (element: EventTarget): Selection;
        };
    }

    export interface Event {
        x: number;
        y: number;
    }

    export interface Base extends Selectors {
        event: Event;
    }
}

declare var d3: D3.Base;
```


