interface Named {
    name: string;
}

let x: Named;
// y's inferred type is { name: string; location: string; }
let y = { name: "Alice", location: "Seattle" };

x = y;  // OK

y = x;  // -> Error, location is missing in type Named (x)



/* Enums */

enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let _status = Status.Ready;
_status = Color.Red;  // Error