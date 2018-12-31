Modules
====

- Modules are executed within their own scope, not in the global scope.
- Variables, functions, classes, etc. declared in a module are not visible outside the module unless they are explicitly exported using one of the export forms.
- Conversely, to consume a variable, function, class, interface, etc. exported from a different module, it has to be imported using one of the import forms.

Export
----

```
export interface StringValidator {
    isAcceptable(s: string): boolean;
}
```

```
export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
```

**Export statements**

- Export statements are handy when exports need to be renamed for consumers, so the above example can be written as:
  
    ```
    class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
    export { ZipCodeValidator };
    export { ZipCodeValidator as mainValidator };
    ```

**Re-exports**

- Often modules extend other modules, and partially expose some of their features. A re-export does not import it locally, or introduce a local variable.

    ```
    export class ParseIntBasedZipCodeValidator {
        isAcceptable(s: string) {
            return s.length === 5 && parseInt(s).toString() === s;
        }
    }
    
    // Export original validator but rename it
    export {ZipCodeValidator as RegExpBasedZipCodeValidator} from "./ZipCodeValidator";
    ```
    
    Optionally, a module can wrap one or more modules and combine all their exports using export * from "module" syntax.

    ```
    export * from "./StringValidator"; // exports interface 'StringValidator'
    export * from "./LettersOnlyValidator"; // exports class 'LettersOnlyValidator'
    export * from "./ZipCodeValidator";  // exports class 'ZipCodeValidator'
    ```

Import
----

```
import { ZipCodeValidator } from "./ZipCodeValidator";

let myValidator = new ZipCodeValidator();
```

- imports can also be renamed
  
    ```
    import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
    let myValidator = new ZCV();
    ```
  
- Import the entire module into a single variable, and use it to access the module exports

    ```
    import * as validator from "./ZipCodeValidator";
    let myValidator = new validator.ZipCodeValidator();
    ```
   
- Import a module for side-effects only

    ```
    import "./my-module.js";
    ```

Default exports
----

_JQuery.d.ts_
```
declare let $: JQuery;
export default $;
```

_App.ts_
```
import $ from "JQuery";

$("button.continue").html( "Next Step..." );
```

- Default export class and function declaration names are optional.

- default exports can also be just values:

```
export default "123";
```

export = and import = require()
----

WBAS

Code Generation for Modules
----

WBAS ...


    



