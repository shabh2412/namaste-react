import React from "react";
import ReactDOM from "react-dom/client";

// React Element
// What is a react element?
// - Just like we have DOM elements, we have react elements.
// to create a react element, we can use React.createElement( type, props, children )

const heading = React.createElement("h1", { id: "heading" }, "Namazte React 🚀");
// this heading element is not an HTML element right now. It is a JS Object.
// when you render this element, then it becomes an HTML element.
const root = ReactDOM.createRoot(document.getElementById("root"));

// JSX - is not HTML inside JS. It looks like HTML / XML like syntax.
// JSX (transpiled before it reaches the JS Engine) - Parcel - Babel
// JSX => React.createElement => ReactElement - JS Object => HTML Element (rendered)
// Who is converting this code? - Babel

const jsxHeading = <h1>Namaste React using JSX.</h1>;
root.render(jsxHeading);

// root.render(heading);
// when you call render, it will basically replace all the child elements in the root.

// However, the above method is not scalable.
// it is very clumsy.
// to solve this, we have JSX.
// MYTH: JSX is a part of react - NO!!!